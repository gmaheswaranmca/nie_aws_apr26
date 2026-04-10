# Demo ASG (Auto Scaling Group)
```
    asg
    ->
    alb
    ->
    ec2 web site
    servers
```

# Steps
```
1. Security Groups 
	"ec2-sg" 	HTTP SSH
	"alb-sg"  HTTP
2. Launch EC2 for making AMI
    ec2-1 + amazon linux + t3.micro + ec2-sg + user-data
    !Proceed without key pair
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
    !Check instance is running in browser
     using http://public_ip
3. AMI of ec2-1 ie "ami-1"
    Make the image 
    and then delete the ec2-1

    Instances -> Select ec2-1 (tick) -> Actions (v)  
    -> Image And Templates -> Create Image
    Name: ami-1

    Check in Side Menu Bar -> AMIs -> It will display the created ami ie "ami-1"

    Now, "ec2-1" we can delete.
4. Target Group : "tg-1"
	Instance + Http + 80 + same vpc we will use for instances 
	Health Check = /
	No instances attached here 


    Side Menu Bar -> Load Balancing -> Target Groups
    -> Create Target Group 
5. ALB  "alb-1"
	Internet facing + Listern Http 80 + Same vpc + subnets 2 or 3 
	alb-sg + tg-1 
6. Launch Template "LT-1"
	"ami-1" + t3.micro + ec2-sg + leave key pair 
	+ user data (our script)

    Key Pair: Dont include in launch template
7. ASG "asg-1"
	"lt-1" + same vpc + subnets two or three + "alb+1 via tg-1" 
	Configuration: 
	Desired capacity → 2
	Minimum → 1
	Maximum → 4
	! Wait till things are ready 
8. Check in the internet 
	Copy DNS from ALB 
	http://dns-name 
```

# Cleanup
```
Clean Up:
1. Delete asg-1
2. Delete lt-1 
3. Delete applicationlb1
4. Delete tg-1
5. Deregister AMI with Associated Snapshot Deletion 
6. Terminate (Delete) ec2-1 
7. Delete Security Groups ec2-sg, alb-sg 
```