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

                // Mock user authentication
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