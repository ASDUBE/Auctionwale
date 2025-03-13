"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminDashboard from "@/components/Admin/Admindashboard";

export default function AdminPage() {
  const { user } = useUser();
  const router = useRouter();
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  // List of allowed admin email addresses
  const adminEmails = [
    "surajss.3110@gmail.com",
    "ashutoshd6198@gmail.com",
    "admin2@example.com",
    "admin3@example.com",
    "admin4@example.com",
  ];

  useEffect(() => {
    if (!user) {
      router.replace("/sign-in"); // Redirect if not logged in
    } else if (!adminEmails.includes(user.primaryEmailAddress?.emailAddress || "")) {
      setIsUnauthorized(true); // Show error message if not an admin
    }
  }, [user, router]);

  if (!user) return <p>Loading...</p>; // Show while checking authentication

  if (isUnauthorized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500 text-lg font-semibold">
          You are not the admin. Contact system administrator.
        </p>
      </div>
    );
  }

  return <AdminDashboard />;
}
