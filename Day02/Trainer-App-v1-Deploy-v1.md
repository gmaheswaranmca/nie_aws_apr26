**complete step-by-step guide** to run your **MERN Trainer App (React + Express + MongoDB Atlas)** on **AWS EC2**, starting from **launching EC2 → cloning GitHub → running backend → running frontend → accessing via browser**.

I’ll assume:

* **Ubuntu EC2**
* **Node.js app**
* **MongoDB Atlas DB**
* **React Vite frontend**
* **Express backend**

---

# 1. Launch EC2 Instance

Go to **Amazon Web Services → EC2 Console.

Steps:

1. Go to **Launch Instance**
2. Configure:

| Setting       | Value                |
| ------------- | -------------------- |
| Name          | trainer-app-server   |
| AMI           | Ubuntu Server 22.04  |
| Instance Type | t2.micro (free tier) |
| Key Pair      | create new key       |
| Storage       | 8 GB                 |

---

## Security Group

Add inbound rules:

| Type       | Port |
| ---------- | ---- |
| SSH        | 22   |
| Custom TCP | 3000 |
| Custom TCP | 5000 |
| HTTP       | 80   |

---

# 2. Connect to EC2 via SSH

Example:

```bash
ssh -i trainer.pem ubuntu@EC2_PUBLIC_IP
```

Example:

```bash
ssh -i trainer.pem ubuntu@54.xx.xx.xx
```

---

# 3. Update Server

Inside EC2:

```bash
sudo apt update
sudo apt upgrade -y
```

---

# 4. Install Node.js

Install Node 20:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verify:

```bash
node -v
npm -v
```

---

# 5. Install Git

```bash
sudo apt install git -y
```

Verify:

```bash
git --version
```

---

# 6. Clone Project from GitHub

Example repo:

```bash
# git clone https://github.com/yourusername/mern-trainer-app.git

git clone https://github.com/gmaheswaranmca/mern-trainer-app.git
```

Go inside:

```bash
cd mern-trainer-app
```

Project structure:

```
mern-trainer-app
   backend
   frontend
```

---

# 7. Configure Backend

Move to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# 8. Create Environment File

Create `.env`:

```bash
nano .env
```

Example:

```
PORT=5000
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/trainerdb
```

Save:

```
CTRL + X
Y
ENTER
```

---

# 9. Allow MongoDB Atlas Access

Go to **MongoDB Atlas**

Open **Network Access**

Add:

```
0.0.0.0/0
```

This allows EC2 to connect.

---

# 10. Run Express Server

Inside backend:

```bash
node server.js
```

You should see:

```
MongoDB Connected
Server running on 5000
```

Test in browser:

```
http://EC2_PUBLIC_IP:5000/trainers
```

Example:

```
http://54.xx.xx.xx:5000/trainers
```

Expected output:

```json
[
 {name:"Mahesh",skills:"React"},
 {name:"Arun",skills:"Node"},
 {name:"Divya",skills:"MongoDB"}
]
```

---

# 11. Setup Frontend

Open new terminal OR stop backend temporarily.

Go to frontend:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

---

# 12. Update Backend URL

Edit file:

```
src/pages/AddTrainer.jsx
```

Change:

```
http://localhost:5000
```

to

```
http://EC2_PUBLIC_IP:5000
```

Example:

```
http://54.xx.xx.xx:5000
```

Do same in:

```
src/pages/ListTrainer.jsx
```

---

# 13. Run React App

Start frontend:

```bash
npm run dev
```

Output:

```
Local: http://localhost:3000
```

---

# 14. Access React App from Browser

Open:

```
http://EC2_PUBLIC_IP:3000
```

Example:

```
http://54.xx.xx.xx:3000
```

You will see:

```
TrainerApp
List Trainers
Add Trainer
```

---

# 15. Run Backend in Background (Production Style)

Install **PM2**.

PM2 keeps Node running even if SSH closes.

```bash
sudo npm install pm2 -g
```

Start backend:

```bash
pm2 start server.js
```

Check:

```bash
pm2 list
```

Save process:

```bash
pm2 save
```

Auto start on reboot:

```bash
pm2 startup
```

---

# 16. Run React App in Background

Inside frontend:

```bash
pm2 start "npm run dev -- --host 0.0.0.0" --name react-app
```

---

# 17. Final Architecture

```
Users Browser
      |
      |
http://EC2_IP:3000
      |
      |
React Vite App
      |
      |
http://EC2_IP:5000
      |
      |
Express API
      |
      |
MongoDB Atlas
```

---

# 18. Production Improvement (Recommended)

In real projects:

* React should be **built**
* Served by **Nginx**
* Node only exposes **API**

Production flow:

```
Browser
   |
   | 80
Nginx
   |
React Build
   |
Node API
   |
MongoDB Atlas
```

---

# 19. Typical Production Folder Layout

```
/home/ubuntu
    trainer-app
        backend
        frontend
```

---

# 20. Clean Up Launch EC2 Instance

1. Terminate Instance
2. Delete Key
3. Delete Security Group

