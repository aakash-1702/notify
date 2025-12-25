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

/**
 * Login Page
 * Handles user authentication using HTTP-only cookies
 */
const LogIn = () => {
  // Prevents double submission
  const [isLoading, setIsLoading] = React.useState(false);

  // Controlled input state
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  /**
   * Submits login form
   * 1. Sends credentials to backend
   * 2. Backend sets secure cookie
   * 3. Shows toast feedback
   * 4. Redirects to dashboard
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("http://localhost:5151/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 🔑 Required for cookie auth
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    // ❌ Login failed
    if (!res.ok) {
      if (data.message === "User is not signed Up") {
        toast.error("Account not found", {
          description: "Opening SignUp page ",
        });

        setIsLoading(false);

        setTimeout(() => {
          window.location.href = "/sign-up";
        }, 1500);

        return;
      }

      toast.error("Login Failed", {
        description: data.message || "Unable to login at the moment",
      });

      setIsLoading(false);
      return;
    }

    // ✅ Login successful
    toast.success("Login Successful", {
      description: data.message || "Redirecting to your notes...",
    });

    setIsLoading(false);

    // Give user time to read toast
    setTimeout(() => {
      window.location.href = "/notes";
    }, 2000);
  };

  /**
   * Updates form state on typing
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-950 dark:via-emerald-950 dark:to-teal-950">
      <Card className="mx-auto max-w-7xl px-4 py-8 border-2 border-emerald-200/50 dark:border-emerald-800/50 shadow-2xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your Notely account</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full mt-4">
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <a href="/sign-up" className="text-emerald-500">
                Sign up
              </a>
            </p>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default LogIn;
