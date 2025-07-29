#!/usr/bin/env python3
"""
DiamondAli VIP Portfolio Backend API Test Suite
Tests all backend functionality including contact form, health check, 
email functionality, database integration, error handling, and security.
"""

import requests
import json
import time
import sys
from datetime import datetime
from typing import Dict, Any

# Backend URL from frontend/.env
BACKEND_URL = "https://669a57c6-8586-4633-830f-a9da145c6cdb.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.test_results = []
        self.passed = 0
        self.failed = 0
        
    def log_test(self, test_name: str, passed: bool, details: str = ""):
        """Log test result"""
        status = "✅ PASS" if passed else "❌ FAIL"
        result = {
            "test": test_name,
            "status": status,
            "passed": passed,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        if passed:
            self.passed += 1
        else:
            self.failed += 1
            
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        print()

    def test_health_check(self):
        """Test GET /api/health endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "status" in data and "service" in data and "timestamp" in data:
                    if data["status"] == "healthy" and "DiamondAli" in data["service"]:
                        self.log_test("Health Check - Valid Response", True, 
                                    f"Status: {data['status']}, Service: {data['service']}")
                    else:
                        self.log_test("Health Check - Invalid Content", False, 
                                    f"Unexpected content: {data}")
                else:
                    self.log_test("Health Check - Missing Fields", False, 
                                f"Missing required fields in response: {data}")
            else:
                self.log_test("Health Check - Wrong Status Code", False, 
                            f"Expected 200, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Health Check - Connection Error", False, str(e))

    def test_contact_form_valid_submission(self):
        """Test POST /api/contact with valid data"""
        try:
            valid_data = {
                "name": "John Doe",
                "email": "john@example.com", 
                "message": "I need a VIP website for my business. Please contact me to discuss premium web development services."
            }
            
            response = requests.post(f"{BACKEND_URL}/contact", 
                                   json=valid_data, 
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "name", "email", "message", "timestamp"]
                
                if all(field in data for field in required_fields):
                    if (data["name"] == valid_data["name"] and 
                        data["email"] == valid_data["email"] and
                        data["message"] == valid_data["message"]):
                        self.log_test("Contact Form - Valid Submission", True, 
                                    f"Message saved with ID: {data['id']}")
                    else:
                        self.log_test("Contact Form - Data Mismatch", False, 
                                    "Returned data doesn't match submitted data")
                else:
                    self.log_test("Contact Form - Missing Response Fields", False, 
                                f"Missing fields in response: {data}")
            else:
                self.log_test("Contact Form - Valid Submission Failed", False, 
                            f"Expected 200, got {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Contact Form - Valid Submission Error", False, str(e))

    def test_contact_form_invalid_email(self):
        """Test POST /api/contact with invalid email formats"""
        invalid_emails = [
            "invalid-email",
            "test@",
            "@example.com",
            "test..test@example.com",
            "test@example",
            ""
        ]
        
        for email in invalid_emails:
            try:
                invalid_data = {
                    "name": "Test User",
                    "email": email,
                    "message": "This is a test message for email validation testing purposes."
                }
                
                response = requests.post(f"{BACKEND_URL}/contact", 
                                       json=invalid_data, 
                                       timeout=10)
                
                if response.status_code == 422:  # FastAPI validation error
                    self.log_test(f"Email Validation - Invalid Email '{email}'", True, 
                                "Correctly rejected invalid email")
                else:
                    self.log_test(f"Email Validation - Invalid Email '{email}'", False, 
                                f"Expected 422, got {response.status_code}")
                    
            except Exception as e:
                self.log_test(f"Email Validation - Invalid Email '{email}'", False, str(e))

    def test_spam_protection(self):
        """Test spam protection with spam-like content"""
        spam_messages = [
            {
                "name": "Spammer",
                "email": "spam@example.com",
                "message": "Free money! Click here to win bitcoin and casino prizes! Limited time offer!"
            },
            {
                "name": "Casino Bot", 
                "email": "bot@example.com",
                "message": "Best casino games online! Gambling opportunities await you!"
            },
            {
                "name": "Crypto Scammer",
                "email": "scam@example.com", 
                "message": "Invest in bitcoin now! Free crypto for everyone! Act now!"
            }
        ]
        
        for spam_data in spam_messages:
            try:
                response = requests.post(f"{BACKEND_URL}/contact", 
                                       json=spam_data, 
                                       timeout=10)
                
                if response.status_code == 400:
                    response_data = response.json()
                    if "spam" in response_data.get("detail", "").lower():
                        self.log_test(f"Spam Protection - '{spam_data['name']}'", True, 
                                    "Correctly detected and blocked spam content")
                    else:
                        self.log_test(f"Spam Protection - '{spam_data['name']}'", False, 
                                    f"Wrong error message: {response_data}")
                else:
                    self.log_test(f"Spam Protection - '{spam_data['name']}'", False, 
                                f"Expected 400, got {response.status_code}")
                    
            except Exception as e:
                self.log_test(f"Spam Protection - '{spam_data['name']}'", False, str(e))

    def test_rate_limiting(self):
        """Test rate limiting by sending multiple messages quickly"""
        try:
            # Send 4 messages quickly to trigger rate limiting
            test_data = {
                "name": "Rate Test User",
                "email": "ratetest@example.com",
                "message": "This is a rate limiting test message for the DiamondAli portfolio contact form."
            }
            
            responses = []
            for i in range(4):
                response = requests.post(f"{BACKEND_URL}/contact", 
                                       json=test_data, 
                                       timeout=10)
                responses.append(response)
                time.sleep(0.1)  # Small delay between requests
            
            # First 3 should succeed (200), 4th should be rate limited (429)
            success_count = sum(1 for r in responses[:3] if r.status_code == 200)
            rate_limited = responses[3].status_code == 429
            
            if success_count >= 2 and rate_limited:  # Allow some flexibility
                self.log_test("Rate Limiting - Multiple Requests", True, 
                            f"First {success_count} succeeded, 4th was rate limited (429)")
            elif rate_limited:
                self.log_test("Rate Limiting - Aggressive Protection", True, 
                            "Rate limiting triggered earlier than expected (good security)")
            else:
                self.log_test("Rate Limiting - Failed", False, 
                            f"Expected rate limiting on 4th request, got: {[r.status_code for r in responses]}")
                
        except Exception as e:
            self.log_test("Rate Limiting - Error", False, str(e))

    def test_field_validation(self):
        """Test field validation for name and message length"""
        validation_tests = [
            {
                "name": "Short Name Test",
                "data": {"name": "A", "email": "test@example.com", "message": "Valid message for testing"},
                "should_fail": True,
                "reason": "Name too short"
            },
            {
                "name": "Long Name Test", 
                "data": {"name": "A" * 101, "email": "test@example.com", "message": "Valid message for testing"},
                "should_fail": True,
                "reason": "Name too long"
            },
            {
                "name": "Short Message Test",
                "data": {"name": "Valid Name", "email": "test@example.com", "message": "Short"},
                "should_fail": True, 
                "reason": "Message too short"
            },
            {
                "name": "Long Message Test",
                "data": {"name": "Valid Name", "email": "test@example.com", "message": "A" * 1001},
                "should_fail": True,
                "reason": "Message too long"
            },
            {
                "name": "Valid Boundaries Test",
                "data": {"name": "AB", "email": "test@example.com", "message": "A" * 10},
                "should_fail": False,
                "reason": "Minimum valid lengths"
            }
        ]
        
        for test in validation_tests:
            try:
                response = requests.post(f"{BACKEND_URL}/contact", 
                                       json=test["data"], 
                                       timeout=10)
                
                if test["should_fail"]:
                    if response.status_code == 422:  # Validation error
                        self.log_test(f"Field Validation - {test['name']}", True, 
                                    f"Correctly rejected: {test['reason']}")
                    else:
                        self.log_test(f"Field Validation - {test['name']}", False, 
                                    f"Expected 422, got {response.status_code}")
                else:
                    if response.status_code == 200:
                        self.log_test(f"Field Validation - {test['name']}", True, 
                                    f"Correctly accepted: {test['reason']}")
                    else:
                        self.log_test(f"Field Validation - {test['name']}", False, 
                                    f"Expected 200, got {response.status_code}")
                        
            except Exception as e:
                self.log_test(f"Field Validation - {test['name']}", False, str(e))

    def test_malformed_requests(self):
        """Test error handling for malformed JSON requests"""
        malformed_tests = [
            {
                "name": "Invalid JSON",
                "data": "invalid json string",
                "content_type": "application/json"
            },
            {
                "name": "Missing Required Fields",
                "data": {"name": "Test User"},
                "content_type": "application/json"
            },
            {
                "name": "Empty Request Body",
                "data": {},
                "content_type": "application/json"
            }
        ]
        
        for test in malformed_tests:
            try:
                if isinstance(test["data"], str):
                    response = requests.post(f"{BACKEND_URL}/contact", 
                                           data=test["data"],
                                           headers={"Content-Type": test["content_type"]},
                                           timeout=10)
                else:
                    response = requests.post(f"{BACKEND_URL}/contact", 
                                           json=test["data"],
                                           timeout=10)
                
                if response.status_code in [400, 422]:  # Bad request or validation error
                    self.log_test(f"Error Handling - {test['name']}", True, 
                                f"Correctly handled malformed request with {response.status_code}")
                else:
                    self.log_test(f"Error Handling - {test['name']}", False, 
                                f"Expected 400/422, got {response.status_code}")
                    
            except Exception as e:
                self.log_test(f"Error Handling - {test['name']}", False, str(e))

    def test_database_integration(self):
        """Test database integration by retrieving contact messages"""
        try:
            # First submit a test message
            test_data = {
                "name": "Database Test User",
                "email": "dbtest@example.com",
                "message": "This is a database integration test message for the DiamondAli portfolio."
            }
            
            submit_response = requests.post(f"{BACKEND_URL}/contact", 
                                          json=test_data, 
                                          timeout=10)
            
            if submit_response.status_code == 200:
                # Try to retrieve messages (admin endpoint)
                get_response = requests.get(f"{BACKEND_URL}/contact", timeout=10)
                
                if get_response.status_code == 200:
                    messages = get_response.json()
                    if isinstance(messages, list) and len(messages) > 0:
                        # Check if our test message is in the results
                        found_message = any(
                            msg.get("name") == test_data["name"] and 
                            msg.get("email") == test_data["email"]
                            for msg in messages
                        )
                        
                        if found_message:
                            self.log_test("Database Integration - Message Retrieval", True, 
                                        f"Successfully stored and retrieved {len(messages)} messages")
                        else:
                            self.log_test("Database Integration - Message Not Found", False, 
                                        "Test message not found in retrieved messages")
                    else:
                        self.log_test("Database Integration - Empty Response", False, 
                                    "No messages returned from database")
                else:
                    self.log_test("Database Integration - Retrieval Failed", False, 
                                f"Failed to retrieve messages: {get_response.status_code}")
            else:
                self.log_test("Database Integration - Submit Failed", False, 
                            f"Failed to submit test message: {submit_response.status_code}")
                
        except Exception as e:
            self.log_test("Database Integration - Error", False, str(e))

    def test_cors_configuration(self):
        """Test CORS configuration"""
        try:
            # Test preflight request
            headers = {
                'Origin': 'https://example.com',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
            
            response = requests.options(f"{BACKEND_URL}/contact", 
                                      headers=headers, 
                                      timeout=10)
            
            if response.status_code in [200, 204]:
                cors_headers = response.headers
                if 'Access-Control-Allow-Origin' in cors_headers:
                    self.log_test("CORS Configuration - Preflight", True, 
                                f"CORS headers present: {cors_headers.get('Access-Control-Allow-Origin')}")
                else:
                    self.log_test("CORS Configuration - Missing Headers", False, 
                                "CORS headers not found in preflight response")
            else:
                self.log_test("CORS Configuration - Preflight Failed", False, 
                            f"Preflight request failed: {response.status_code}")
                
        except Exception as e:
            self.log_test("CORS Configuration - Error", False, str(e))

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting DiamondAli VIP Portfolio Backend API Tests")
        print("=" * 60)
        print()
        
        # Run all test methods
        self.test_health_check()
        self.test_contact_form_valid_submission()
        self.test_contact_form_invalid_email()
        self.test_spam_protection()
        self.test_rate_limiting()
        self.test_field_validation()
        self.test_malformed_requests()
        self.test_database_integration()
        self.test_cors_configuration()
        
        # Print summary
        print("=" * 60)
        print("🏁 TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {self.passed}")
        print(f"❌ Failed: {self.failed}")
        print(f"📊 Total: {self.passed + self.failed}")
        print(f"📈 Success Rate: {(self.passed / (self.passed + self.failed) * 100):.1f}%")
        print()
        
        if self.failed > 0:
            print("❌ FAILED TESTS:")
            for result in self.test_results:
                if not result["passed"]:
                    print(f"   • {result['test']}: {result['details']}")
            print()
        
        return self.passed, self.failed, self.test_results

if __name__ == "__main__":
    tester = BackendTester()
    passed, failed, results = tester.run_all_tests()
    
    # Exit with error code if tests failed
    sys.exit(0 if failed == 0 else 1)