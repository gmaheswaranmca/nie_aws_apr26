# Billing and Cost Management 

### AWS Billing and Cost Management

Explain:

* Free Tier
* Pay as you go
* Reserved Instances
* Spot Instances
* Savings Plans

Show:

* Billing Dashboard
* Cost Explorer.

# AWS Billing and Cost Management 

## 1️⃣ Introduction to AWS Billing

AWS uses a **utility-based pricing model**, similar to electricity billing.

Example:

```
Use EC2 for 5 hours
Pay only for 5 hours
```

Key idea:

* No upfront infrastructure purchase
* Pay only for what you use

This model is called **Pay-as-you-go**.

---

# 2️⃣ AWS Free Tier

AWS provides a **Free Tier for 12 months** for new accounts.

Types of Free Tier:

### 1. 12-Month Free Tier

Example services:

* EC2 → **750 hours/month**
* S3 → **5 GB storage**
* RDS → **750 hours**

Example:

```
1 EC2 instance running full month
≈ Free (within 750 hours)
```

### 2. Always Free

Some services remain free forever (limited usage):

Examples:

* DynamoDB
* Lambda
* CloudWatch (basic metrics)

### 3. Free Trials

Short-term trials for certain services.

Example:

```
Amazon Redshift
Amazon SageMaker
```

---

# 3️⃣ Pay-As-You-Go Model

AWS default pricing model.

You pay **only for what you consume**.

Example:

| Service | Usage         | Cost          |
| ------- | ------------- | ------------- |
| EC2     | 10 hours      | Pay 10 hours  |
| S3      | 20 GB storage | Pay for 20 GB |
| Lambda  | 1M requests   | Pay for 1M    |

Example scenario:

```
Run EC2 instance
↓
Stop after 2 hours
↓
Pay for only 2 hours
```

This is ideal for:

* Startups
* Experiments
* Development environments

---

# 4️⃣ Reserved Instances (RI)

Reserved Instances provide **discounted pricing** for long-term usage.

Commitment period:

* **1 year**
* **3 years**

Discount:

```
Up to 72% cheaper than On-Demand
```

Example:

| Instance Type | On-Demand  | Reserved   |
| ------------- | ---------- | ---------- |
| t3.micro      | $0.0104/hr | ~$0.004/hr |

Use case:

* Applications running **24/7**
* Production workloads

Example:

```
Web server running for 1 year
→ Buy Reserved Instance
→ Large cost saving
```

---

# 5️⃣ Spot Instances

Spot instances use **unused AWS capacity**.

Discount:

```
Up to 90% cheaper
```

But AWS can **terminate anytime**.

Example:

```
EC2 price = $1/hour
Spot price = $0.20/hour
```

Best for:

* Data processing
* Machine learning jobs
* Batch workloads
* Testing

Not good for:

* Databases
* Critical production apps

---

# 6️⃣ Savings Plans

Savings Plans provide **flexible cost savings**.

Instead of committing to instance type, you commit to:

```
$ per hour usage
```

Example:

```
Commit to $5/hour compute usage
for 1 year
```

Benefits:

* Works across EC2, Lambda, Fargate
* Flexible instance types

Savings:

```
Up to 66%
```

---

# 7️⃣ AWS Billing Dashboard (Live Demo)

Navigation:

```
AWS Console
   ↓
Billing
```

Or open:

```
https://console.aws.amazon.com/billing/
```

What students should see:

### Sections:

1️⃣ **Current Month Cost**

Example:

```
$3.42
```

2️⃣ **Top Services**

Example:

```
EC2
S3
Data Transfer
```

3️⃣ **Forecasted Cost**

Example:

```
Estimated monthly cost
```

---

# 8️⃣ Cost Explorer (Practical Demo)

Navigation:

```
Billing Dashboard
   ↓
Cost Explorer
```

Enable if not enabled.

Shows:

* Cost trends
* Service usage
* Daily expenses

Example graph:

```
Cost
 │
 │      *
 │   *     *
 │ *         *
 └──────────────
     Days
```

You can filter by:

* Service (EC2, S3)
* Region
* Instance type
* Tag

---

# 9️⃣ Small Demo for Students (5 min)

### Step 1

Open:

```
Billing → Cost Explorer
```

### Step 2

Select:

```
Last 7 days
Group by → Service
```

Students will see cost from:

```
EC2
Data Transfer
Elastic IP
```

---

# 10️⃣ Important Cost Tips (Students must know)

1️⃣ **Stop EC2 instances when not using**

```
Running EC2 → charged
Stopped EC2 → not charged
```

2️⃣ **Delete unused resources**

Example:

* EBS volumes
* Elastic IP
* Load balancers

3️⃣ Use **AWS Budgets**

To prevent overspending.

---

# Quick Summary

| Concept            | Meaning                      |
| ------------------ | ---------------------------- |
| Free Tier          | Free usage for new users     |
| Pay-as-you-go      | Pay only for usage           |
| Reserved Instances | Long-term discount           |
| Spot Instances     | Very cheap but interruptible |
| Savings Plans      | Flexible cost commitment     |
| Billing Dashboard  | Shows total AWS cost         |
| Cost Explorer      | Analyze cost trends          |


