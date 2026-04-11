# Serverless Backend 

Introduce serverless computing.

### AWS Lambda

### Amazon API Gateway

Explain:

* No server management
* Event-driven computing
* Pay per execution.

### Practical Lab

Create:

Lambda function:

```javascript
exports.handler = async () => {
 return {
  statusCode:200,
  body:JSON.stringify({message:"Hello from Lambda"})
 };
};
```

Connect:

API Gateway → Lambda.

Test API in browser.


## ⚡ Serverless Backend (AWS)

Serverless means **you do not manage servers**. AWS automatically runs your code when an event occurs.

Instead of creating EC2 instances and managing infrastructure, you simply **upload code and AWS runs it on demand**.

Key ideas:

* No server management
* Event-driven execution
* Automatic scaling
* Pay only when code runs

Example flow:

```
Client Request
      ↓
API Gateway
      ↓
AWS Lambda
      ↓
Response to Client
```

---

## 🧠 AWS Lambda

AWS Lambda is a **serverless compute service** that runs your code without provisioning servers.

You only provide the **function code**, and AWS handles:

* server setup
* scaling
* execution
* monitoring

### Features

* Runs code in response to events
* Supports many languages

  * Node.js
  * Python
  * Java
  * Go
  * C#

Example uses:

* Backend APIs
* Image processing
* File processing from S3
* Scheduled jobs

Example architecture:

```
S3 Upload
   ↓
Lambda Function
   ↓
Process File
```

---

## 🌐 Amazon API Gateway

API Gateway allows you to **expose Lambda functions as HTTP APIs**.

It acts like a **front door for your backend services**.

Responsibilities:

* Receive HTTP request
* Route request to Lambda
* Return response

Example:

```
Browser
   ↓
API Gateway
   ↓
Lambda
   ↓
JSON Response
```

---

## 💰 Pay Per Execution

Unlike EC2:

| Service | Payment                         |
| ------- | ------------------------------- |
| EC2     | Pay while instance running      |
| Lambda  | Pay only when function executes |

Example:

```
100 requests → pay for 100 executions
No requests → pay ₹0
```

This makes serverless **very cost-effective for startups**.

---

# 🧪 Practical Lab (10 minutes demo)

Goal: **Create a serverless API**

Architecture:

```
Browser
   ↓
API Gateway
   ↓
Lambda Function
```

---

# Step 1 — Create Lambda Function

1. Open **AWS Console**
2. Go to **Lambda**
3. Click **Create Function**
4. Select **Author from Scratch**

Configuration:

```
Function name: hello-lambda
Runtime: Node.js
Architecture: x86
```

Click **Create Function**

---

# Step 2 — Add Code

Replace the code with:

```javascript
exports.handler = async () => {
 return {
  statusCode:200,
  body:JSON.stringify({message:"Hello from Lambda"})
 };
};
```

Click:

```
Deploy
```

---

# Step 3 — Test Lambda

Click **Test**

Create test event:

```
Event Name: test
```

Run test.

Expected output:

```
{
  "statusCode": 200,
  "body": "{\"message\":\"Hello from Lambda\"}"
}
```

---

# Step 4 — Create API Gateway Trigger

Inside Lambda:

```
Add Trigger
```

Select:

```
API Gateway
```

Settings:

```
API type: HTTP API
Security: Open
```

Click:

```
Add
```

AWS will automatically create:

```
API Gateway → Lambda integration
```

---

# Step 5 — Test in Browser

Copy the API endpoint:

Example:

```
https://abc123.execute-api.ap-south-1.amazonaws.com
```

Open in browser.

Expected output:

```json
{"message":"Hello from Lambda"}
```

---

# 🎯 What Students Learn from this Lab

Students understand:

* What **Serverless architecture** is
* How **Lambda runs backend code**
* How **API Gateway exposes APIs**
* How backend APIs can be built **without EC2**

---

# 🧠 Important Interview Question

**Q: Difference between EC2 backend and Lambda backend?**

| EC2 Backend                | Lambda Backend           |
| -------------------------- | ------------------------ |
| Server management required | No server management     |
| Always running             | Runs only when triggered |
| Manual scaling             | Automatic scaling        |
| Pay for running time       | Pay per execution        |

---

✅ **VERY IMPRESSIVE demo** possilbe:

**React Website → API Gateway → Lambda → DynamoDB**

You will see a **complete serverless application in 10 minutes.**

# Demo
```
Lambda
-> Functions 
-> Create
-> Author From Scratch
-> Function name: hello-lambda
-> Runtime: Node.js
-> Architecture: x86
-> Create Function 
-> Code 
    -> 
---
exports.handler = async () => {
 return {
  statusCode:200,
  body:JSON.stringify({message:"Hello from Lambda"})
 };
};
---
-> Deploy
-> Test Lambda
-> Create test event
-> Event Name: test
-> Run test.
-> Expected output:

---
{
  "statusCode": 200,
  "body": "{\"message\":\"Hello from Lambda\"}"
}
---

-> Add Trigger
-> API Gateway
-> Create new API 
-> API type: HTTP API
-> Security: Open
-> Add 
-> API Gateway under trigger
-> Click the API endpoint
-> In browser
---
{"message":"Hello from Lambda"}
---

```