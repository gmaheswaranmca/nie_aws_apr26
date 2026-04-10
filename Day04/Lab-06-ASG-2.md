Below are the **clean, correct steps from scratch** to build **React + ALB + Auto Scaling Group** on AWS.

---

# Architecture

```
Internet
   |
Application Load Balancer
   |
Target Group
   |
Auto Scaling Group
   |
EC2 Instances (Nginx serving React build)
```

---

# Step 1 — Create Security Groups

## 1️⃣ ALB Security Group

Go to:

**EC2 → Security Groups → Create**

Name

```
alb-sg
```

Inbound rules

| Type | Port | Source    |
| ---- | ---- | --------- |
| HTTP | 80   | 0.0.0.0/0 |

Outbound

```
All traffic
```

---

## 2️⃣ EC2 Security Group

Create another SG

```
ec2-sg
```

Inbound rules

| Type | Port | Source  |
| ---- | ---- | ------- |
| SSH  | 22   | Your IP |
| HTTP | 80   | alb-sg  |

Outbound

```
All traffic
```

Important concept:

```
Only ALB can reach EC2
```

---

# Step 2 — Launch One EC2 Instance (Golden Server)

Go to

```
EC2 → Launch Instance
```

Settings

```
AMI → Ubuntu 22.04
Instance → t2.micro
Security group → ec2-sg
Key pair → create/select
```

Launch instance.

---

# Step 3 — Install Nginx

SSH into instance

```
ssh -i key.pem ubuntu@EC2_PUBLIC_IP
```

Run

```bash
sudo apt update
sudo apt install nginx -y
```

Start nginx

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

Test

```
http://EC2_PUBLIC_IP
```

You should see **Welcome to nginx**.

---

# Step 4 — Deploy React Build

Upload build file

```
scp -i key.pem build.zip ubuntu@EC2_IP:/home/ubuntu
```

SSH again.

Unzip

```bash
unzip build.zip
```

Replace nginx content

```bash
sudo rm -rf /var/www/html/*
sudo cp -r build/* /var/www/html/
```

Restart nginx

```bash
sudo systemctl restart nginx
```

Test again

```
http://EC2_PUBLIC_IP
```

React app should load.

---

# Step 5 — Create AMI

Go to

```
EC2 → Instances
```

Select instance.

Click

```
Actions → Image → Create Image
```

Name

```
react-server-ami
```

Wait until AMI is **Available**.

---

# Step 6 — Create Target Group

Go to

```
EC2 → Target Groups → Create
```

Settings

```
Target type → Instance
Protocol → HTTP
Port → 80
VPC → your VPC
```

Health check

```
Path → /
```

Create.

Do **NOT register instances manually**.

ASG will register automatically.

---

# Step 7 — Create Load Balancer

Go to

```
EC2 → Load Balancers → Create
```

Select

```
Application Load Balancer
```

Settings

Name

```
react-alb
```

Scheme

```
Internet facing
```

Listener

```
HTTP 80
```

VPC

```
Select your VPC
```

Subnets

Select **at least 2 AZs**.

Example

```
ap-south-1a
ap-south-1b
```

Security group

```
alb-sg
```

Forward to target group

```
react-tg
```

Create.

---

# Step 8 — Create Launch Template

Go to

```
EC2 → Launch Templates → Create
```

Settings

Name

```
react-template
```

AMI

```
react-server-ami
```

Instance type

```
t2.micro
```

Security group

```
ec2-sg
```

Key pair

(optional)

Create template.

---

# Step 9 — Create Auto Scaling Group

Go to

```
EC2 → Auto Scaling Groups → Create
```

Select launch template

```
react-template
```

Next.

VPC

```
select your VPC
```

Subnets

```
ap-south-1a
ap-south-1b
```

Next.

Attach load balancer

```
Attach to existing target group
```

Select

```
react-tg
```

Next.

---

# Step 10 — Configure Capacity

Set

```
Desired capacity → 2
Minimum → 1
Maximum → 4
```

Next → Create ASG.

---

# Step 11 — Wait for Instances

Go to

```
EC2 → Instances
```

You will see

```
Instance 1
Instance 2
```

Wait until both are **running**.

---

# Step 12 — Verify Target Group

Go to

```
Target Group → Targets
```

Status must show

```
2 Healthy
```

---

# Step 13 — Access Load Balancer

Go to

```
Load Balancer → DNS name
```

Example

```
http://react-alb-123.ap-south-1.elb.amazonaws.com
```

Open browser.

Your **React site should load**.

---

# Step 14 — Demonstrate Auto Healing

Terminate one instance

```
EC2 → terminate instance
```

ASG will automatically create a **new instance**.

---

# Step 15 — Demonstrate Load Balancing

Add hostname to nginx page:

```bash
hostname
```

Then refresh ALB URL multiple times.

Traffic will hit different servers.

---

# Common mistakes that cause your issue

1️⃣ ALB security group missing

```
HTTP 80 → 0.0.0.0/0
```

2️⃣ Launch template wrong security group

3️⃣ Nginx not enabled

```
sudo systemctl enable nginx
```

4️⃣ Target group port wrong

```
must be 80
```
