**Frontend Hosting using S3 + CloudFront**.

---

# Practical Lab — Host Frontend using **S3 + CloudFront**

## Step 1 — Build the Frontend

If you are using **React**:

```bash
npm run build
```

This creates a folder:

```
build/
 ├ index.html
 ├ static/
 ├ css/
 ├ js/
```

These files will be uploaded to **S3**.

---

# Step 2 — Create S3 Bucket

1. Open **AWS Console**
2. Go to **S3**
3. Click **Create bucket**

Example:

```
Bucket name: trainer-frontend-demo
Region: ap-south-1
```

Important settings:

```
Uncheck: Block all public access
```

Then click **Create bucket**.

---

# Step 3 — Upload Frontend Files

1. Open the created **S3 bucket**
2. Click **Upload**
3. Upload all files from:

```
build/*
```

Example files inside bucket:

```
index.html
static/js/main.js
static/css/main.css
```

---

# Step 4 — Enable Static Website Hosting

Go to:

```
Bucket → Properties
```

Scroll to:

```
Static website hosting
```

Enable it.

Configure:

```
Index document: index.html
Error document: index.html
```

Save.

You will get a **website endpoint** like:

```
http://trainer-frontend-demo.s3-website-ap-south-1.amazonaws.com
```

Your frontend works now.

---

# Step 5 — Create CloudFront Distribution

Now we add **CloudFront CDN**.

Go to:

```
AWS → CloudFront
```

Click:

```
Create Distribution
```

Set:

```
Origin domain → Select S3 bucket
```

Settings:

```
Viewer protocol policy → Redirect HTTP to HTTPS
Default root object → index.html
```

Click:

```
Create distribution
```

---

# Step 6 — Wait for Deployment

CloudFront takes **5–10 minutes**.

You will get a URL like:

```
https://d2abc123.cloudfront.net
```

Open it.

Your **frontend website loads globally**.

---

# Final Architecture

```
User
 ↓
CloudFront CDN
 ↓
S3 Bucket
 ↓
React build files
```

---

# Quick Student Demo (10 minutes)

You can do this flow live:

```
Create S3 bucket
↓
Upload React build
↓
Enable static hosting
↓
Create CloudFront
↓
Open CloudFront URL
```

Students will see **production-level architecture**.

---

# Important Interview Point

Always explain:

**Without CDN**

```
User → S3
```

**With CDN**

```
User → CloudFront → S3
```

CloudFront gives:

```
Faster
Global caching
HTTPS
Security
```

---


When you finish the **S3 + CloudFront practical**, it is important to **clean up resources** to avoid AWS charges. Follow these steps.

---

# Cleanup Steps — S3 + CloudFront Architecture

## 1️⃣ Disable and Delete CloudFront Distribution

CloudFront **must be disabled first** before deleting.

Steps:

1. Go to **AWS Console → CloudFront**
2. Select your **Distribution ID**
3. Click **Disable**

Example:

```
CloudFront
   ↓
Distribution
   ↓
Disable
```

Wait **5–10 minutes** for status to become **Disabled**.

Then:

4. Select the distribution again
5. Click **Delete**

---

## 2️⃣ Delete S3 Bucket Objects

You cannot delete a bucket if files exist.

Steps:

1. Go to **AWS Console → S3**
2. Open the bucket

Example:

```
trainer-frontend-demo
```

3. Select **all files**
4. Click **Delete**

Example files:

```
index.html
static/js/main.js
static/css/main.css
```

Confirm deletion.

---

## 3️⃣ Delete the S3 Bucket

After deleting objects:

1. Go back to **S3 bucket list**
2. Select the bucket
3. Click **Delete**

AWS will ask confirmation:

```
Type bucket name: trainer-frontend-demo
```

Then confirm delete.

---

# Final Check

Make sure the following are removed:

```
CloudFront Distribution
S3 Bucket
Uploaded build files
```

---

# Why Cleanup is Important

| Service    | Cost Risk             |
| ---------- | --------------------- |
| CloudFront | Data transfer charges |
| S3         | Storage + requests    |

Even small labs can accumulate charges if left running.

---

# Quick Cleanup Flow (for students)

```
CloudFront
   ↓
Disable Distribution
   ↓
Delete Distribution
   ↓
Delete S3 Objects
   ↓
Delete S3 Bucket
```

---

To know:

> “Always clean up AWS resources after labs to avoid unexpected billing.”
