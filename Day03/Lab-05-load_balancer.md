# Load Balancer
```
    ec2 instances - 2 - http server (simple site)
    -> under ALB
    -> We will access the web site via ALB
Steps:
1. Search "EC2" in AWS console
2. Side Menu Bar -> Instances -> Launch Instances
    Name: alb_servers
    Number of instances: 2
    AMI: Amazon Linux
    Architecture: 64 bit x86
    Instance Type: t3.micro
    Key Pair: Proceed without key pair
    Networking Settings:
        Security Group: Create Security Group 
        with SSH and HTTP allowed [Tick Them]
    Storage : 8 GB
    Advanced Details: 
        User Data:
    ---
#!/bin/bash
yum update -y
yum install -y httpd

systemctl start httpd
systemctl enable httpd

echo "<h1>Server is up and running!</h1>" > /var/www/html/index.html
echo "<p>Hello from EC2 Instance - $(hostname -f)</p>" >> /var/www/html/index.html
echo "<p>Date: $(date)</p>" >> /var/www/html/index.html
    ---
3. "Launch Instance"
4. Check instances are launched and Running
    Goto Instances -> Check
Attaching Load Balancer to the Instances:
5. EC2 Left Side Menu Bar
  -> Load Balancing
  -> Load Balancers
  -> Create Load Balancer
  -> Application Load Balancer
  -> Create
  -> We will have "Create Application Load Balancer" Page
  -> Load balancer name: alb1
  -> Scheme: Internet-facing
  -> Load balancer IP address type: IPv4
  -> Network mapping: default VPC
  -> Availability Zones and subnets
    tick all the AZs.
  -> Create Security Group
    Security group name: alb-sg
    Description: for load balancer
    VPC: Default
    Inbound Rules: 
        SSH     0.0.0.0/0
        HTTP    0.0.0.0/0
  -> Create Secuity Group
  -> Come to the ALB Creation Page
    -> Select Security Group: alb-sg
  -> Listeners and routing
    Protocol: HTTP
    Port: 80
    Routing action
        :Forward to target groups
            Create Target Group
  -> We are in the "Create target group" page
    -> Target type: Instances
    -> Target group name: alb-tg
    -> Protocol: HTTP
    -> Port: 80
    -> IP address type: IPv4
    -> VPC: Default
    -> Protocol version: HTTP1
    Health checks
    -> Health check protocol: HTTP
    -> Health check path: /
    Click "Next"
    Register targets - recommended
        -> Available instances
         Tick 2 instances ie alb_servers
         -> Ports for the selected instances: 80
         -> Give "Include as pending below"
         Targets (2) are added
    -> Give "Next"
    We are in the review page.
    -> Give "Create Target Group"
  - Come back ALB Page
    In Target Group: Pick "alb-tg"
  -> Review section
    "Create Load Balancer"
    ! Successfully created load balancer: alb1
  -> We will go the alb1 page
    Copy the DNS name to the browser:
    alb1-1347607742.ap-south-1.elb.amazonaws.com

    Now our instances http server response 
    we will see in the browser.
    
```
