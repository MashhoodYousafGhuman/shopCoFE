"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoginMutation } from "@/store/shopCoApi";
import { setCredentials } from "@/store/authSlice";
import GuestRoute from "@/components/GuestRoute";

export const LoginContent = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, { isLoading, error }] = useLoginMutation();

  // Check for error messages in URL params (from OAuth failures)
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setErrorMessage(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData).unwrap();
      dispatch(setCredentials(data));
      router.push("/");
    } catch (err) {
      console.error("Login failed:", err);
      setErrorMessage(err.data?.message || "Invalid credentials");
    }
  };

  return (
    <GuestRoute redirectTo="/">
      <div className="min-h-screen flex items-center justify-center bg-[rgba(240,238,237,1)] px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 mb-24 rounded-2xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {/* Show error messages */}
          {(errorMessage || error) && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {errorMessage || "Invalid credentials"}
            </div>
          )}

          {/* Email + Password Login */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-lg text-white mb-4 disabled:opacity-70"
            style={{ backgroundColor: "rgba(0,0,0,1)" }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </GuestRoute>
  );
};


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <LoginContent />
    </Suspense>
  );
}