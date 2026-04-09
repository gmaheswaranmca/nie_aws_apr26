# Backend 
```
    express app -> mongo
    trainers {_id, name, skills}
    Operations:
        1. Creating Trainer 
            POST /trainers {"name":"", "skills":""}
        2. List all Trainers 
            GET /trainers 
            RESPONSE: array of trainers docs
    Configuration:
        .env
            PORT=5000
            MONGO_URL=constr_cloud_mongo_db
```

# Fronend
```
```

# Cloud Mongo Setup:
```
    1. Login to cloud mongo using google account
    2. Side Menu Bart -> Clusters
        Build a Cluster
        - Option: Free (512MB, shared RAM, shared CPU)
        - Name: Cluster0 (by default)
        - Provider: AWS (by default)
        - Region: Mumbai (ap-south-1) (by default)
        - Click "Create Deployment"
    After Created the Deployment
    We will have connect dialog page
    3. To check 
    4. Side Menu Bar -> Clustes 
        We will have options 
            "Connect", "Browse Collections..."
    5. Now, server is ready to use
    6. But, Please do setup:
        i. Database User Name
            mahesh:1234
        ii> Network Access 
            Everyone Everywhere IPv4
            0.0.0.0/0
        How to setup:
        Side Menu Bar
        -> Security
        -> Database and Network 
        -> "Add New Database User"
        -> UserName: mahesh
        -> Password: 1234
        -> Default Role: Atlas Admin
        -> Add User
        -> !User Created Successfully
        -> We will see in the user list
        Side Menu Bar 
        -> Security 
        -> Database and Network
        -> Next Side Menu Bar Sub Menu
        -> IP Access List
        -> Add IP Address
        -> Add IP Access List Entry we will get
        -> Access List Entry: 0.0.0.0/0
        -> Confirm
        -> IP Access List will have our entry
    7. We can connect to cloud mongo server
    8. Options to connect:
       1. Mongo Compass
       2. Mongo Shell
       3. Inside the App Code
    9. We will connect via shell
        Steps to Install shell
       ->  Side Menu Bar
       -> Clusters
       -> Click "Connect"
       -> Pick Option "Shell"
       -> I don't have the MongoDB Shell installed
       -> Click "Download mongosh (2.8.2)"
       -> In the downloads folder
            We will have mongo shell installer
       -> Install mongo shell
            (By one click installation)
       -> Mongo shell is installed
       -> To check:
        Open terminal or command prompt
       -> $ mongosh --version
       It should show the version of mongo shell.
       -> Now we can connect via mongo shell to the cloud mongo.
       mongosh "constr"
       -> Copy the connection string from connection options
            mongodb+srv://cluster0.54ofwxy.mongodb.net/
            -> 
            mongodb+srv://mahesh:1234@cluster0.54ofwxy.mongodb.net/
        -> mongosh "mongodb+srv://mahesh:1234@cluster0.54ofwxy.mongodb.net/"
```

# Architecture: (arch1)
```
    client          -> server        -> database
    ec2             -> ec2 (same)    -> cloud mongo
    trainer_server  -> trainer_server -> cloud mongo 
```

# EC2 Setup in AWS:
```
1. Search "EC2"
2. Go inside "EC2" Work Area
3. In side menu bar
4. Click "Instances"
5. Click "Launch Instances"
6. Name: trainer_server
7. AMI: Ubuntu
8. Architecture: 64-bit x86
9. Instnce Type: t3.micro (Free Tier)
10. Key Pair (login)
    1.  Create New Key Pair
    2.  Key Pair Name: trainer_server_key
    3.  Key pair Type: RSA
    4.  Private key file form: .pem (openssh)
    5.  Click "Create Key Pair"
11. Now, key file is downloded in the Downloads folder.
12. Network
    1.  Create Security Group
    2.  Tick the SSH
    3.  Tick the HTTP
    ! We have to modify the security group 
    to open port numbers 5000 and 3000. (little later)
13. Storage: 8 GB (by default)
14. Click "Launch Instance" 
15. Goto "Side Menu Bar" -> Instances
16. Check is there instance having state "Running"
17. Open the instance
18. Under Security Tab
19. Open the Security Group named (for me)"launch-wizard-2"
20. Security Group page is opened
21. Under Inbound Rules Tab
22. Give "Edit inbound rules"
    SSH         0.0.0.0/0
    HTTP        0.0.0.0/0
    TCP 5000    0.0.0.0/0
    TCP 3000    0.0.0.0/0
23. Give "Save Rules"

We are going to connect to the "trainer_server" ec2 instance via ssh
1. Go to the instance
2. Give Connect
3. Open SSH Client Tab
4. Copy the ssh connection string
   ssh -i "ec2_1_key.pem" ubuntu@ec2-13-206-102-95.ap-south-1.compute.amazonaws.com
It should connect to the instance.
```

# Settig up the application:
```bash
sudo apt update
sudo apt upgrade -y

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

node -v
npm -v

sudo apt install git -y

git --version

git clone https://github.com/gmaheswaranmca/mern-trainer-app.git

ls 

cd mern-trainer-app

cd backend

npm install

nano .env

# We are inside the nano editor
# Copy the PORT and MONGO_URL vars
Ctrl + V to paste
Ctrl + O to save
Ctrl + X to exit 
# Check file is created 
cat .env
# This will print the file content such as PORT and MONGO_URL vars

#Run server
node server.js

# Check the server is running or not
http://server_ip_or_name:5000/trainers

# This will display seeded trainers 
# Now we concluded server is working

# Stop the server is running

# Install "pm2" dependency of node to run the node apps in the bg
sudo npm install pm2 -g

# Run server silently
pm2 start server.js

# To conclude, browse the trainers in browser
http://server_ip_or_name:5000/trainers

pm2 list
# to see the processes running in pm2


# Edit ListTrainer.jsx and AddTrainer.jsx of frontend/src/pages dir
Replace "localhost" with "public ipv4 addr ie 13.206.102.95"
# To run the frontend app
# go to the fronend app dir via cd cmd
pm2 start "npm run dev -- --host 0.0.0.0" --name react-app

# Check in browser
http://13.206.102.95:3000/

# To list the pm2 services
pm2 list

# To check logs of service
pm2 logs server_name

# To delete the service
pm2 delete service_name
```