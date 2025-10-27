import { getServerSession } from "next-auth"; // your NextAuth config
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard";
import { authOptions } from "@/app/lib/auth";
import "./../../globals.css";
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/not-found");
  }

  return <Dashboard  />;
}
