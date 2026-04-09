# Setting up MERN App in AWS
```
1. AWS Console (Prerequisites)
2. EC2 work area
3. Prerequisite: Mongo Cloud 
4. Launch EC2 Instance
    - security group : mern_sg
    - description: mern app
    - In bound rules:
        SSH         0.0.0.0/0
        HTTP        0.0.0.0/0
        TCP 5000    0.0.0.0/0
        TCP 3000    0.0.0.0/0
    - key pair: mern_key
      Key pair type: RSA
      Private key file format: pem
      After creation, key file is in downloads folder.
    - ec2 : mern_instance
        ec2 -> Instances
        -> Launch Instances
        -> name: mern_instance
        -> ami: ubuntu
        -> architecture: 64 bit x86
        -> instance type: t3.micro
        -> key pair: mern_key
        -> security group: mern_sg
        -> storage: 8gb
        -> no advanced settings: no user data
        -> "Launch Instance"
    - ssh login to mern_instance
        ssh -i "mern_key.pem" ubuntu@ec2-13-201-90-138.ap-south-1.compute.amazonaws.com
    - deployment of app
        - setup runtime 
            - update
                sudo apt update
                sudo apt upgrade -y
            - install node
                curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
                sudo apt-get install -y nodejs

                node -v
                npm -v
            - install git
                sudo apt install git -y
                git --version
            - clone app repo
                git clone https://github.com/gmaheswaranmca/mern-trainer-app.git
                ls
                cd mern-trainer-app
            - we will have the apps in repo dir
                - backend 
                    cd backend
                    nano .env
                        PORT=5000
                        MONGO_URL=mongodb+srv://mahesh:1234@cluster0.54ofwxy.mongodb.net/trainerdb 
                - frontend 
                    cd ../frontend
                        localhost is replaced as ip_addr
                        in src/pages/AddTrainer.jsx
                        and src/pages/ListTrainer.jsx
            - Run applications
                - backend 
                    cd backend
                    npm install
                    # Install pm2 globally 
                    sudo npm install pm2 -g

                    pm2 start server.js
                    # to check log
                    pm2 logs server
                    # to detele service
                    pm2 delete server

                    # check in browser
                    http://13.201.90.138:5000/trainers
                    it will display all the trainers 
                - frontend
                    cd ../frontend
                    pm2 list
                    npm install
                    pm2 start "npm run dev -- --host 0.0.0.0" --name react-app
                    pm2 list

                    both server and react-app server "online"
                    we should not have any err
                    if err
                    check logs
                    and fix it
                    delete service
                    run service again

                # check in browser 
                http://13.201.90.138:3000/
```

# Architecture (server-oriented -> server-oriented -> server less)
```
MERN App Deployment

frontend -> backend -> db
react    -> expr    -> mongo
ec2      -> ec2     -> mongo cloud 
server-or -> server-ir -> server less 
```

# Architecture (server-less -> server-oriented -> server less)
```
MERN App Deployment

frontend    -> backend -> db
react       -> expr    -> mongo
s3          -> ec2     -> mongo cloud 
server-less -> server-ir -> server less 
```

# steps
```
1. delete the react-app service from pm2
    pm2 delete react-app
2. please ensure that react-app service is delete from pm2
    pm2 list
3. go to fronend dir
    cd mern-trainer-app/frontend
4. Build React App
    npm run build
5. zip the build ie dist/ dir
    # install zip
    sudo apt update
    sudo apt install zip -y

    zip -v

    # zip the build ie dist/ dir
    zip -r client.zip dist/
    # to check client.zip is there
    ls 
    # to download zip into ec2 mern_instance to local computer
    ssh -i "mern_key.pem" ubuntu@ec2-13-201-90-138.ap-south-1.compute.amazonaws.com
    =>
    scp source dest
    =>
    scp -i "mern_key.pem" ubuntu@ec2-13-201-90-138.ap-south-1.compute.amazonaws.com:/home/ubuntu/mern-trainer-app/frontend/client.zip .
```