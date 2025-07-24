import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginuser } from "@/utils/api/Httproutes";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize (credentials:any, req:any) {
        let requestUrl="";
        let requestPayload = {}
        if(credentials.number && credentials.otp){
           requestPayload = {
            "otp":credentials.otp,
            "mobile":Number(credentials.number)
           }
        }else{
           requestPayload = {
            "source":"T2T",
            "mobile":Number(credentials.number),
            "email":credentials.email,
            "password":credentials.password  
           }
        }
       const loginCall = await loginuser(requestPayload).then((response:any) => {
          if(response.status === 200 && response.data.StatusCode === 200){
              return response.data
          }else{
             return {error:true}
          }
       }).catch((error:any) => {
        return {error:true}
       });
      const user = loginCall
       if (user.error) {
            return null;
          } else {
            return user;
          }
         }
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.account = { 
          ...account, 
          userdetail:user
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  }
};

export default NextAuth(authOptions);