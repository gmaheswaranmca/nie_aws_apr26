 **simple practical lab for AWS DynamoDB using only the AWS Console**. 

---

# AWS DynamoDB Practical Lab (Using AWS Console)

## Lab Objective

In this lab you will:

1. Create a DynamoDB table
2. Insert items (records)
3. Query and scan data
4. Update items
5. Delete items

No coding required — **only AWS Console**.

---

# Step 1: Open DynamoDB Service

1. Login to **AWS Console**
2. In the search bar type **DynamoDB**
3. Click **DynamoDB**

You will see the DynamoDB dashboard.

---

# Step 2: Create a Table

1. Click **Create table**

Fill the details:

| Field         | Value       |
| ------------- | ----------- |
| Table name    | `Students`  |
| Partition key | `StudentID` |
| Data type     | String      |

Leave all other settings **default**.

Click **Create table**.

✔ Table will be created in a few seconds.

---

# Step 3: Add Items (Records)

1. Click the **Students** table
2. Select **Explore table items**
3. Click **Create item**

Switch to **JSON view**.

Add this record:

```json
{
 "StudentID": "S101",
 "Name": "Rahul",
 "Course": "AWS",
 "Age": 22
}
```

Click **Create item**.

---

### Add another record

Click **Create item** again.

```json
{
 "StudentID": "S102",
 "Name": "Anita",
 "Course": "Cloud Computing",
 "Age": 23
}
```

Now the table has **2 records**.

---

# Step 4: Scan the Table (View All Records)

1. Go to **Explore items**
2. Click **Scan**

You will see **all items stored in the table**.

---

# Step 5: Query Data (Using Primary Key)

1. Select **Query**
2. Partition key:

```
StudentID = S101
```

Click **Run**

Result:

```
Rahul record will appear
```

✔ Query is faster than scan because it uses the **primary key**.

---

# Step 6: Update an Item

1. Select the record `S101`
2. Click **Edit item**

Change:

```
Course : AWS → AWS + DevOps
```

Click **Save changes**

---

# Step 7: Delete an Item

1. Select item `S102`
2. Click **Delete**

Confirm deletion.

Now only **1 record remains**.

---

# Step 8: Delete the Table (Cleanup)

To avoid AWS charges:

1. Go to **Tables**
2. Select **Students**
3. Click **Delete**
4. Type:

```
delete
```

Click **Delete table**.

---

# DynamoDB Concepts Learned in This Lab

| Concept       | Meaning                 |
| ------------- | ----------------------- |
| Table         | Collection of items     |
| Item          | Record                  |
| Attribute     | Column                  |
| Partition Key | Primary Key             |
| Scan          | Reads all data          |
| Query         | Reads using primary key |

---

# Real-world DynamoDB Example

| Table    | Partition Key |
| -------- | ------------- |
| Users    | UserID        |
| Orders   | OrderID       |
| Products | ProductID     |
| Trainers | TrainerID     |

Example item:

```json
{
 "TrainerID": "T101",
 "Name": "Maheswaran",
 "Skills": "AWS, MERN"
}
```

---

# Mini Student Exercise (5 min lab)

Ask students to:

1. Create table **Trainer**
2. Partition Key → `TrainerID`
3. Insert 3 trainers
4. Query one trainer
5. Update skills
6. Delete one trainer

# Via node code
```bash
cd dynamodb_code
npm init
# accept all default values and complete node project creation

npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```
