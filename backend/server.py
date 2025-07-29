from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import os
import logging
import smtplib
import asyncio
from datetime import datetime, timedelta
from collections import defaultdict
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import uuid
from pathlib import Path
import re

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Rate limiting storage (in production, use Redis)
rate_limit_storage = defaultdict(list)

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=1000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=1000)

# Spam Protection Functions
def is_spam_content(message: str, name: str) -> bool:
    """Basic spam detection"""
    spam_keywords = [
        'casino', 'gambling', 'bitcoin', 'crypto', 'investment', 'loan',
        'viagra', 'pharmacy', 'dating', 'adult', 'porn', 'xxx',
        'free money', 'click here', 'limited time', 'act now'
    ]
    
    content = f"{name} {message}".lower()
    
    # Check for spam keywords
    for keyword in spam_keywords:
        if keyword in content:
            return True
    
    # Check for excessive links
    url_pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
    urls = re.findall(url_pattern, message)
    if len(urls) > 2:
        return True
    
    # Check for excessive repetition
    words = message.lower().split()
    if len(set(words)) < len(words) * 0.5 and len(words) > 10:
        return True
    
    return False

def check_rate_limit(ip_address: str) -> bool:
    """Check if IP address is rate limited (max 3 messages per hour)"""
    now = datetime.utcnow()
    one_hour_ago = now - timedelta(hours=1)
    
    # Clean old entries
    rate_limit_storage[ip_address] = [
        timestamp for timestamp in rate_limit_storage[ip_address]
        if timestamp > one_hour_ago
    ]
    
    # Check current count
    if len(rate_limit_storage[ip_address]) >= 3:
        return False
    
    # Add current timestamp
    rate_limit_storage[ip_address].append(now)
    return True

async def send_email(contact_message: ContactMessage):
    """Send email notification"""
    try:
        # Email configuration (using environment variables)
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        sender_email = os.environ.get('SENDER_EMAIL', '42abcc@gmail.com')
        sender_password = os.environ.get('SENDER_PASSWORD', 'your-app-password')
        recipient_email = "42abcc@gmail.com"
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = f"New VIP Contact from DiamondAli Portfolio - {contact_message.name}"
        
        # Email body
        html_body = f"""
        <html>
        <head></head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #FFD700, #FFA500); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: #000; margin: 0;">💎 DiamondAli VIP Contact</h1>
                </div>
                
                <div style="background: #f9f9f9; padding: 20px; border: 1px solid #ddd;">
                    <h2 style="color: #FFD700; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">New Message Details</h2>
                    
                    <div style="margin: 15px 0;">
                        <strong style="color: #333;">👤 Name:</strong>
                        <p style="margin: 5px 0; padding: 10px; background: white; border-left: 4px solid #FFD700;">{contact_message.name}</p>
                    </div>
                    
                    <div style="margin: 15px 0;">
                        <strong style="color: #333;">📧 Email:</strong>
                        <p style="margin: 5px 0; padding: 10px; background: white; border-left: 4px solid #FFD700;">
                            <a href="mailto:{contact_message.email}" style="color: #FFD700; text-decoration: none;">{contact_message.email}</a>
                        </p>
                    </div>
                    
                    <div style="margin: 15px 0;">
                        <strong style="color: #333;">💬 Message:</strong>
                        <div style="margin: 5px 0; padding: 15px; background: white; border-left: 4px solid #FFD700; border-radius: 5px;">
                            {contact_message.message.replace('\n', '<br>')}
                        </div>
                    </div>
                    
                    <div style="margin: 15px 0;">
                        <strong style="color: #333;">🕒 Received:</strong>
                        <p style="margin: 5px 0; padding: 10px; background: white; border-left: 4px solid #FFD700;">{contact_message.timestamp.strftime('%B %d, %Y at %I:%M %p UTC')}</p>
                    </div>
                </div>
                
                <div style="background: #333; color: #FFD700; padding: 15px; text-align: center; border-radius: 0 0 10px 10px;">
                    <p style="margin: 0;">🌟 DiamondAli - VIP Websites & Apps 🌟</p>
                    <p style="margin: 5px 0 0 0; font-size: 12px;">This message was sent from your portfolio contact form</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        msg.attach(MIMEText(html_body, 'html'))
        
        # Send email
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        text = msg.as_string()
        server.sendmail(sender_email, recipient_email, text)
        server.quit()
        
        logger.info(f"Email sent successfully for contact from {contact_message.name}")
        
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        # Don't raise exception - we still want to save the message to DB

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "DiamondAli VIP Portfolio API - Ready to serve premium digital solutions!"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact_form(
    contact_data: ContactMessageCreate,
    background_tasks: BackgroundTasks,
    request = None
):
    """Submit contact form with spam protection and email notification"""
    
    # Get client IP (in production, use request.client.host)
    client_ip = "127.0.0.1"  # Default for development
    if request:
        client_ip = getattr(request.client, 'host', '127.0.0.1')
    
    # Rate limiting check
    if not check_rate_limit(client_ip):
        raise HTTPException(
            status_code=429,
            detail="Too many messages sent. Please wait before sending another message."
        )
    
    # Spam content check
    if is_spam_content(contact_data.message, contact_data.name):
        raise HTTPException(
            status_code=400,
            detail="Message flagged as potential spam. Please revise your message."
        )
    
    # Create contact message object
    contact_message = ContactMessage(
        **contact_data.dict(),
        ip_address=client_ip
    )
    
    try:
        # Save to database
        await db.contact_messages.insert_one(contact_message.dict())
        
        # Send email notification in background
        background_tasks.add_task(send_email, contact_message)
        
        logger.info(f"New contact message from {contact_message.name} ({contact_message.email})")
        
        return contact_message
        
    except Exception as e:
        logger.error(f"Error saving contact message: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to submit message. Please try again later."
        )

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages(limit: int = 50):
    """Get all contact messages (admin endpoint)"""
    try:
        messages = await db.contact_messages.find().sort("timestamp", -1).limit(limit).to_list(limit)
        return [ContactMessage(**message) for message in messages]
    except Exception as e:
        logger.error(f"Error retrieving contact messages: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to retrieve messages"
        )

@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow(),
        "service": "DiamondAli VIP Portfolio API"
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)