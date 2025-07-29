# DiamondAli Portfolio - API Integration Contracts

## Overview
This document defines the API contracts and integration protocols for the DiamondAli VIP portfolio website.

## Backend API Endpoints

### Base URL
- Development: `http://localhost:8001/api`
- Production: Uses `REACT_APP_BACKEND_URL` from environment variables

### Contact Form Endpoint

**POST /api/contact**

**Request Body:**
```json
{
  "name": "string (2-100 chars)",
  "email": "valid email address",
  "message": "string (10-1000 chars)"
}
```

**Response (Success - 200):**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string", 
  "message": "string",
  "timestamp": "ISO datetime",
  "ip_address": "string"
}
```

**Error Responses:**
- **400 Bad Request**: Invalid data or spam detected
- **429 Too Many Requests**: Rate limit exceeded (3 messages per hour per IP)
- **500 Internal Server Error**: Server error

### Health Check Endpoint

**GET /api/health**

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "ISO datetime",
  "service": "DiamondAli VIP Portfolio API"
}
```

## Frontend Integration

### Mock Data Migration
Mock data in `/frontend/src/mock.js` includes:
- `portfolioProjects`: Demo project showcases
- `services`: VIP service offerings
- `testimonials`: Client reviews  
- `whyChooseMe`: Key advantages
- `workProcess`: 4-step process
- `pricingPlans`: Bronze, Silver, Gold packages
- `faqs`: Common questions

### Contact Form Integration

**Frontend Implementation:**
1. Form validation using React state
2. Loading states during submission
3. Error handling with toast notifications
4. Success feedback to user
5. Form reset on successful submission

**Error Handling:**
- Network errors: Generic retry message
- 429 Rate Limit: Specific wait message  
- 400 Bad Request: Show server error message
- Validation errors: Client-side validation

## Backend Features Implemented

### Contact Message Processing
1. **Data Validation**: Name (2-100 chars), valid email, message (10-1000 chars)
2. **Spam Protection**: Keyword filtering, URL detection, repetition detection
3. **Rate Limiting**: Maximum 3 messages per hour per IP address
4. **Database Storage**: All messages saved to MongoDB
5. **Email Notifications**: HTML formatted emails sent to 42abcc@gmail.com

### Email Configuration
- **SMTP Server**: Gmail (smtp.gmail.com:587)
- **Recipient**: 42abcc@gmail.com
- **Format**: Professional HTML email with luxury styling
- **Content**: Contact details, message, timestamp

### Security Features
- CORS enabled for cross-origin requests
- Input sanitization and validation
- Rate limiting to prevent abuse
- Spam content detection
- Error logging for monitoring

## Environment Variables Required

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017/diamondali_portfolio
DB_NAME=diamondali_portfolio
SENDER_EMAIL=42abcc@gmail.com
SENDER_PASSWORD=your-gmail-app-password
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

## Database Schema

### contact_messages Collection
```json
{
  "_id": "ObjectId",
  "id": "uuid string",
  "name": "string",
  "email": "string",
  "message": "string", 
  "timestamp": "ISODate",
  "ip_address": "string"
}
```

## Testing Checklist

### Backend Testing
- [ ] Contact form submission success
- [ ] Email validation errors
- [ ] Spam content detection
- [ ] Rate limiting (3 messages/hour)
- [ ] Email sending functionality
- [ ] Database message storage
- [ ] Error handling responses

### Frontend Testing  
- [ ] Form validation (client-side)
- [ ] Loading states during submission
- [ ] Success/error toast notifications
- [ ] Form reset after submission
- [ ] Mobile responsiveness
- [ ] 3D animations and effects
- [ ] Parallax scrolling
- [ ] Floating particles
- [ ] Performance optimization

### Integration Testing
- [ ] End-to-end contact form flow
- [ ] Error handling integration
- [ ] Rate limiting user experience
- [ ] Email delivery verification
- [ ] Cross-browser compatibility
- [ ] Mobile device testing

## Performance Optimizations

### Frontend
- GPU acceleration for animations
- Mobile-specific animation disabling  
- Reduced motion support
- Optimized particle effects
- Lazy loading images
- CSS transforms for smooth animations

### Backend  
- Async/await for database operations
- Background task processing for emails
- Efficient rate limiting storage
- Error logging without blocking responses
- Database indexing for timestamps

## Deployment Notes

### Production Considerations
- Set up proper Gmail app password for email sending
- Configure production MongoDB connection
- Set up proper CORS origins
- Implement Redis for rate limiting storage
- Add monitoring and logging services
- Set up SSL certificates
- Configure CDN for static assets