# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP:
   - http://18.236.138.191/
2. SSH username: 
   - `ubuntu`
3. SSH password or key: 
   - `SFSUTeam03.pem` (in credentials folder)
    <br> If a ssh key is used please upload the key to the credentials folder.
4. Database URL or IP and port used: 
   - IP: `localhost` (I believe default is 127.0.0.1)
   - Port: `3306`
    <br><strong> NOTE THIS DOES NOT MEAN YOUR DATABASE NEEDS A PUBLIC FACING PORT.</strong> But knowing the IP and port number will help with SSH tunneling into the database. The default port is more than sufficient for this class.
5. Database username:
   - `root@localhost`
6. Database password: 
   - `SFSUteam03`
7. Database name (basically the name that contains all your tables):
   - `team3db`
8. Instructions on how to use the above information:
   
   - To access our AWS instance:
     - Use the command: `ssh -i SFSUTeam03.pem ubuntu@18.236.138.191`
       - Format: `ssh -i <path/to/file.pem> <user>@<public ip>`

   - To connect to our DB *from inside the AWS instance*:
     - Use the command: `sudo mysql`

   - To access our DB tables:
     - Connect to the DB using the command: `sudo mysql`
     - Then, in the mysql prompt: `use team3db;`
     - To list the available tables: `show tables;`

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
