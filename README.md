### Introduction
The objective of this project is to enhance my existing portfolio by implementing key improvements such as OAuth integration for secure authentication, embedding GitHub contribution to show development activity, and deploying a high-availability setup using HAProxy. These enhancements will improve the portfolios security, functionality, and reliability.


---

### OAuth Integration
**Implementation:** GitHub's OAuth 2.0 protocol was successfully implemented to provide secure user authentication for the portfolio website with Next.js

##### How to get OAuth with GitHub
1. **Go to GitHub Developer Settings:**
    - Visit [GitHub Developer Settings](https://github.com/settings/developers).
2. **Create a new OAuth application:**
    - Click on **"New OAuth App"**.
    - Fill out the form:
        - **Application name**: Your app’s name.
        - **Homepage URL**: The URL of your application (e.g., `http://localhost:3000` for local development).
        - **Authorization callback URL**: This is where users will be sent after they authenticate. For example, `http://localhost:3000/api/auth/callback/github` for local development.
3. **Save the OAuth App:**
	-  After saving, you will receive your `Client ID` and `Client Secret`. Store these securely.

##### Using OAuth with Next.js 
1. Install required dependencies.
```bash
npm install next-auth
```
2. Created multiple folder inside the app folder with the following `api/auth/[...nextauth]`.
3. Add two `.ts` files.
**options.ts**
```ts
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
type UserType = {
    id: string;
    name: string;
    email: string;
    role?: string;
};
export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string };
                const user: UserType = { id: "1", name: "test", email: "test@example.com" };
                if (email === user.email && password === "test") {
                    return user;
                }
                return null;
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        })
    ],
};
```

**route.ts**
```ts
import NextAuth from 'next-auth'
import { options } from './options'

const handler = NextAuth(options)

export { handler as GET, handler as POST }
```


--- 

### High-Availability Setup with Load Balancing
To host the web application for this project, I deployed two EC2 instances running a Next.js app and used a third EC2 instance configured to HAProxy to serve as a load balancer. This setup ensures high availability, scalability, and secure HTTPS access via domain integration using Amazon Route 53 and Let's Encrypt for SSL certification.

#### Architecture Overview:
1. **Application Layer**: The web app is built with Next.js, running directly on each EC2 instance on port `3000`. Each instance listens for HTTP requests and serves both dynamic and static content.
2. **Load Balancer**: An additional EC2 instance runs HAProxy, configured to forward client requests to the backend Next.js servers using round-robin load balancing.
3. **DNS and Domain Integration**: A domain registered through Route 53 is linked to the application via an Elastic IP associated with the HAProxy instance. A Route 53 A record points the domain to this Elastic IP.
4. **Security (HTTPS)**: HTTPS is enabled on the HAProxy instance using Let’s Encrypt, a free certificate authority. Certificates were obtained and automatically renewed using Certbot, ensuring encrypted communication with minimal configuration. HAProxy is configured to redirect all HTTP traffic to HTTPS.


#### Application Layer
The core of the web application is built using **Next.js**, a modern React framework that supports both server-rendered and statically generated content. Each EC2 instance runs its own instance of the Next.js app, listening on port `3000`. These servers are responsible for handling incoming HTTP requests, rendering dynamic pages, and serving static assets like images and stylesheets. Deploying the application across multiple EC2 instances increases fault tolerance and prepares the architecture for load balancing.

#### DNS and Domain Integration
A custom domain name is configured using Amazon Route 53, AWS's scalable DNS service. An Elastic IP is attached to the HAProxy instance, providing a static public IP address that remains consistent even if the underlying EC2 instance is restarted. In Route 53, an A record is created to map the domain name (e.g., `portfolio.play.lillianvu.online`) to this Elastic IP. This allows users to access the web application via a friendly, memorable domain rather than a raw IP address.

####  Load Balancer 
To distribute traffic across the application servers, a third EC2 instance is dedicated to running HAProxy, an open-source, high-performance load balancer. It listens for both HTTP and HTTPS traffic and forwards client requests to the backend EC2 instances using the round-robin algorithm, ensuring even load distribution. HAProxy is configured to monitor the health of each backend server so that requests are only routed to servers that are online and responsive. This improves both availability and performance under load.

##### HAProxy Configuration
```bash
frontend http_front
    bind *:80 
    default_backend aws_backend

backend aws_backends
    balance roundrobin
    server aws1 44.203.140.84:3000 check
    server aws2 52.3.127.234:3000 check

frontend https_front
    bind *:443 ssl crt /etc/haproxy/ssl/portfolio.play.lillianvu.online.pem
    option httplog
    option forwardfor

    default_backend aws_backends
```

**Breakdown:**
1. `frontend http_front`
	- `bind *:80` → This tells HAProxy to listen on all available interfaces (*) at port 80
	- `default_backend aws_backend` → Any request received here will be forwarded to the aws_backends 

2. `backend aws_backends`
	- `balance round robin` → Distributes incoming request evenly across all listed servers, rotating between them
	- `server aws1 44.203.140.84:3000 check` → Adds a server named aws1 with IP the EC2 instance IP address, targeting port 3000
	- `server aws2 52.3.127.234:3000 check` → Adds a server named aws2 with IP the EC2 instance IP address, targeting port 3000

3. `frontend https_front`
	- `bind *:443 ssl crt /etc/haproxy/ssl/portfolio.play.lillianvu.online.pem` → HAProxy listens on port `443` for HTTPS and uses an SSL certificate located at: /etc/haproxy/ssl/portfolio.play.lillianvu.online.pem
	- `option httplog` → Enables detailed logging of HTTP request 
	- `option forwardfor` → Adds the original client's IP address to a special HTTP heeder (`X-Forwarded-For)` so your backend knows who the real user is
	- `default_backend aws_backends` → Just like the HTTP frontend, all HTTPS traffic will be passed to the backend Next.js servers.

#### SSL/TLS Implementation
To secure communication between users and the server, HTTPS is enabled using an SSL certificate issued by Let’s Encrypt. The certificate was installed and configured on the HAProxy instance using Certbot, an automated tool that also handles periodic certificate renewal. HAProxy is set up to terminate SSL on port `443` and to redirect all incoming HTTP traffic on port `80` to HTTPS, ensuring that all user interactions occur over an encrypted connection. This setup helps protect sensitive data and improves user trust.
