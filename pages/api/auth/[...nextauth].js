import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import clientPromise from "@/utils/lib/mongo"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import dbConnect from "@/utils/middleware/dbConnect";
import bcrypt from "bcryptjs";

dbConnect();

export default NextAuth({
    // adapter: MongoDBAdapter(clientPromise),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const email = credentials.email
                const password = credentials.password

                const user = await User.findOne({ email: email })

                if (!user) {
                    throw new Error("You haven't registered yet")
                }
                if (user) {
                    return signInUser({ user, password })
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
    },
    database: process.env.MONGODB_URI,
    secret: process.env.SECRET,
})

const signInUser = async ({ user, password }) => {
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Incorrect password")
    }

    return user
}