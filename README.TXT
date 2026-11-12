
AWS INFRASTRUCTURE TOOLS
Author: Kadence Parker

DESCRIPTION
This program includes two AWS infrastructure tools:
1. Subnet Host Checker
2. Compute Environment Selector

INSTALLATION
1. Install Node.js.
2. Open the project folder in a terminal.
3. Run: npm install
4. Run: node app.js

SUBNET HOST CHECKER

Checks whether a subnet has enough usable IP addresses
for the required number of devices.

AWS reserves 5 IP addresses in each subnet.

EXAMPLE 1: SUFFICIENT SUBNET

VPC CIDR: /16
Subnet CIDR: /24
Devices Required: 100

Total IP Addresses: 256
Reserved IP Addresses: 5
Usable IP Addresses: 251

Result: SUFFICIENT
The subnet has enough IP addresses.
Unused IP Addresses: 151

EXAMPLE 2: INSUFFICIENT SUBNET

VPC CIDR: /16
Subnet CIDR: /24
Devices Required: 300

Total IP Addresses: 256
Reserved IP Addresses: 5
Usable IP Addresses: 251

Result: INSUFFICIENT
The subnet does not have enough IP addresses.
Additional IP Addresses Needed: 49

COMPUTE ENVIRONMENT SELECTOR

Recommends an AWS architecture based on:
- Application name
- Monthly users
- Monthly budget
- High availability requirements

ARCHITECTURE RECOMMENDATIONS

Less than 1,000 users:
Single EC2

1,000–10,000 users:
EC2 + Load Balancer

More than 10,000 users or high availability required:
EC2 + Load Balancer + Auto Scaling

TECHNOLOGIES
Node.js
JavaScript
readline-sync
Git
GitHub

