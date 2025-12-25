"use client";

import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignUp = () => {

  // Loading state prevents double form submission
  const [isLoading, setIsLoading] = React.useState(false);

  // Controlled form state
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  /**
   * Handles form submission
   * 1. Prevents page reload
   * 2. Sends signup request to backend
   * 3. Shows success / error toast using Sonner
   * 4. Redirects user to login page on success
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("https://notely-backend-9bno.onrender.com/api/v1/users/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await res.json();

    // ❌ Error case
    if (!res.ok) {
      toast.error("Signup failed", {
        description: data.message || "Unable to create account",
      });
      setIsLoading(false);
      return;
    }

    // ✅ Success case
    toast.success(data.success, {
      description: data.message || "You can now login with your credentials",
    });

    setIsLoading(false);
    setTimeout(() => {
        window.location.href="/login"
    },2000);
  };

  /**
   * Updates form state when user types
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-950 dark:via-emerald-950 dark:to-teal-950">
      <Card className="w-full max-w-md border-2 border-emerald-200/50 dark:border-emerald-800/50 shadow-2xl">
        
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Join Notely</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">

            <div className="space-y-2">
              <Label>Username</Label>
              <Input name="username" value={formData.username} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full mt-4">
              {isLoading ? "Creating..." : "Create Account"}
            </Button>

          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
    