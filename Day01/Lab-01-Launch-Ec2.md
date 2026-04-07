# Steps
```
1. Sing in AWS Console 
    - Make sure that your payment method is enabled 
2. Search in search box 
    "EC2"
3. You will have EC2 page with side menu bar 
    Launch Instance
3. Lauch withou walkthrough
4. We will have "Launch an Instance" Page
    - Name: learning-server-1
    - AMI: Amazon Linux
    - Architecture: 64-bit x86
    - Instance Type: t3.micro (Free Tier Available)
    - Key Pair: Proceed without key pair 
    - Network
      Security Group: Create Security Group 
      [x] SSH
      [x] HTTP
    - Storage: 8GB
    - Advanced Settings 
        - user data
        -----
        #!/bin/bash
        yum update -y
        yum install -y httpd

        systemctl start httpd
        systemctl enable httpd

        echo "<h1>Server is up and running!</h1>" > /var/www/html/index.html
        echo "<p>Hello from EC2 Instance - $(hostname -f)</p>" >> /var/www/html/index.html
        echo "<p>Date: $(date)</p>" >> /var/www/html/index.html
        ------
5. Launch Instance
    !Takes time to setup the virtual server or EC2 instance
6. To check 
    EC2 Side Menu Bar -> Instances
7 You will have list of instances 
    Check is there the launched instance having the state "Running" 
    !Yes "I got"
8. Open the instance
    Click on the instance id of the instance 
    Now the instnce page will be opened 
    Copy the IPv4 Public IP 
    Open Browser 
        "http://13.206.81.48"
    We will see our web site running in the web server of the instance
    ----
    Server is up and running!
    Hello from EC2 Instance - ip-172-31-40-52.ap-south-1.compute.internal

    Date: Tue Apr 7 07:05:33 UTC 2026
    ----
9. Cleanup
    Terminate instance 
    - EC2 Side Menu Bar -> Instances -> 
    -> Select the instance (tick
    -> Under "Instance State" Drop Down
    -> Click "Terminal (delete) instance" option
    "Successfully termination initiated" message we will get
10 To check terminated instance 
    EC2 Side Menu Bar -> Instances 
    If instance is not there: "Terminated"
    Of 
    If instance is there and state "Terminated" , it wiil be gone after some hours.
```


```
#!/bin/bash
yum update -y
yum install -y httpd

systemctl start httpd
systemctl enable httpd

echo "<h1>Server is up and running!</h1>" > /var/www/html/index.html
echo "<p>Hello from EC2 Instance - $(hostname -f)</p>" >> /var/www/html/index.html
echo "<p>Date: $(date)</p>" >> /var/www/html/index.html
echo "<h3>About Me</h3>" >> /var/www/html/index.html
echo "<p>I am Maheswaran, Trainer for AWS Cloud Practioner Exam</p>" >> /var/www/html/index.html
```

1. AWS Management Console
2. Launched EC2 instance - Basic Usage