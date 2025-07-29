#!/usr/bin/env python3
"""
Focused Backend Test - Testing core functionality with rate limit awareness
"""

import requests
import time
import json

BACKEND_URL = "https://669a57c6-8586-4633-830f-a9da145c6cdb.preview.emergentagent.com/api"

def test_core_functionality():
    print("🔍 Testing Core Backend Functionality")
    print("=" * 50)
    
    # Test 1: Health Check
    print("1. Testing Health Check...")
    try:
        response = requests.get(f"{BACKEND_URL}/health", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Health check passed: {data['status']}")
        else:
            print(f"   ❌ Health check failed: {response.status_code}")
    except Exception as e:
        print(f"   ❌ Health check error: {e}")
    
    print()
    
    # Test 2: Valid Contact Form Submission
    print("2. Testing Valid Contact Form...")
    try:
        valid_data = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@example.com",
            "message": "I'm interested in your VIP web development services. Could you please provide more information about your premium packages?"
        }
        
        response = requests.post(f"{BACKEND_URL}/contact", json=valid_data, timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Contact form submission successful")
            print(f"   📧 Message ID: {data.get('id')}")
            print(f"   👤 Name: {data.get('name')}")
            print(f"   📨 Email: {data.get('email')}")
        elif response.status_code == 429:
            print(f"   ⚠️  Rate limited (429) - This indicates rate limiting is working")
        else:
            print(f"   ❌ Contact form failed: {response.status_code}")
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"   ❌ Contact form error: {e}")
    
    print()
    
    # Test 3: Email Validation
    print("3. Testing Email Validation...")
    try:
        invalid_data = {
            "name": "Test User",
            "email": "invalid-email-format",
            "message": "This should fail due to invalid email format."
        }
        
        response = requests.post(f"{BACKEND_URL}/contact", json=invalid_data, timeout=10)
        if response.status_code == 422:
            print(f"   ✅ Email validation working - correctly rejected invalid email")
        elif response.status_code == 429:
            print(f"   ⚠️  Rate limited (429) - Cannot test email validation due to rate limiting")
        else:
            print(f"   ❌ Email validation failed: Expected 422, got {response.status_code}")
    except Exception as e:
        print(f"   ❌ Email validation error: {e}")
    
    print()
    
    # Test 4: Spam Protection
    print("4. Testing Spam Protection...")
    try:
        spam_data = {
            "name": "Spam Bot",
            "email": "spam@test.com",
            "message": "Free money casino bitcoin gambling opportunity!"
        }
        
        response = requests.post(f"{BACKEND_URL}/contact", json=spam_data, timeout=10)
        if response.status_code == 400:
            data = response.json()
            if "spam" in data.get("detail", "").lower():
                print(f"   ✅ Spam protection working - correctly blocked spam content")
            else:
                print(f"   ⚠️  Got 400 but wrong message: {data}")
        elif response.status_code == 429:
            print(f"   ⚠️  Rate limited (429) - Cannot test spam protection due to rate limiting")
        else:
            print(f"   ❌ Spam protection failed: Expected 400, got {response.status_code}")
    except Exception as e:
        print(f"   ❌ Spam protection error: {e}")
    
    print()
    
    # Test 5: Database Retrieval (if accessible)
    print("5. Testing Database Integration...")
    try:
        response = requests.get(f"{BACKEND_URL}/contact", timeout=10)
        if response.status_code == 200:
            messages = response.json()
            print(f"   ✅ Database retrieval working - found {len(messages)} messages")
            if len(messages) > 0:
                latest = messages[0]
                print(f"   📝 Latest message from: {latest.get('name')} ({latest.get('email')})")
        else:
            print(f"   ❌ Database retrieval failed: {response.status_code}")
    except Exception as e:
        print(f"   ❌ Database retrieval error: {e}")
    
    print()
    print("🏁 Core functionality test completed!")

if __name__ == "__main__":
    test_core_functionality()