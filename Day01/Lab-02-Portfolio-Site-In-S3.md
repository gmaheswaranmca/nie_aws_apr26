# Steps to deploy static portfolio site in S3 
```
1. Search in the console
    "S3"
2. General Purpose Bucket 
3. Create Bucket
    "
    AWS Region
    Asia Pacific (Mumbai) ap-south-1
    "
4. Bucket Type: General Purpose
    Bucket Namespace: Global Namespace
5. Bucket Name: gmaheswaranmca-resume
    (Name should unique, follow rules for naming the bucket)
6. Block Public Access settings for this bucket
    - Untick the "Block all public access"
    - Turning off block all public access might result in this bucket and the objects within becoming public
        [tick]I acknowledge that the current settings might result in this bucket and the objects within becoming public.
7. Create Bucket
    Successfully created bucket "gmaheswaranmca-resume"
8. S3 Side Menu Bar 
    -> General purpose buckets
    -> Go inside the bucket "gmaheswaranmca-resume"
9. You will be inside the bucket
10. Goto "Properties" Tab
    -> Static website hosting
    -> "Edit"
    -> Static website hosting: Enable
    -> Index document: index.html
        !It is home page
    -> Error document - optional: index.html
        !It is error page
    -> Save Changes
11. Now the time to upload the web site files.
    Open Tab "Objects"
    -> Upload 
    -> Add Files
        -> Select Files
        -> Tick all the listed files
        -> Command "Upload"
        -> Files uploaded successfully
        -> "Close" the upload page
        In the objects tab, we will see the uploaded files.
12. Tab "Permissions" 
    -> Bucket Policy 
    -> Edit
    ---
	{
	"Version":"2012-10-17",
	"Statement":[
	{
	"Sid":"PublicRead",
	"Effect":"Allow",
	"Principal":"*",
	"Action":["s3:GetObject"],
	"Resource":["arn:aws:s3:::gmaheswaranmca-resume/*"]
	}
	]
	}
    ---
    -> Save Changes
13. Properties
    -> Static Web Site Hosting 
    -> Copy bucket website endpoint
    -> Open browser: Paste the endpoint (site link)
        http://gmaheswaranmca-resume.s3-website.ap-south-1.amazonaws.com

```