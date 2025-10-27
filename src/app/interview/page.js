import { getServerSession } from "next-auth"; // your NextAuth config
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";
import "./../globals.css";
import Interview from "@/components/interview";

export default async function Page() {

  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/not-found");
  }

  return <Interview  />;
}

