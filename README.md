# nie_aws_apr26

Author: Maheswaran
```
1. user -> web site (ec2)
           (web server) 
2. user -> portfolio site (s3)
           static site hosting
           server less       
3. user -> frotend (ec2)    -> backend (ec2)   -> mongodb (cloud)
           server-oriented     server-oriented    server less
4. user -> frotend (s3)    -> backend (ec2)   -> mongodb (cloud)
           server-oriented     server-oriented    server less 
5. load balancers -> ec2 servers (web site)
6. auto scaling group ASG -> ec2 servers (web site)
7. AWS RDS MySQL
8. AWS DynamoDB
```