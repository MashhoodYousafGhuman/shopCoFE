"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";

import {
  UserIcon,
  ShoppingCartIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import GuestRoute from "./GuestRoute";
import ClientOnly from "./ClientOnly";

const navLinks = [
  { name: "On Sale", href: "/" },
  { name: "New Arrivals", href: "/products?dressStyle=formal" },
  { name: "Brands", href: "/products?dressStyle=casual" },
];

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { items } = useSelector((state) => state.cart);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // 👇 hydration guard
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <ClientOnly>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        {/* Top Promo Bar */}
        <GuestRoute redirectTo="/">
          <div className="w-full bg-black text-white text-[11px] sm:text-sm py-2 text-center">
            Sign up and get 20% off your first order.{" "}
            <Link href="/register" className="underline font-medium">
              Sign Up Now
            </Link>
          </div>
        </GuestRoute>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Side - Logo */}
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-tight text-gray-900 flex items-center"
            >
              <span>Xoc</span>
            </Link>

            {/* Centered Navigation */}
            <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-black text-base font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Link
                href="/cart"
                className="p-2 text-gray-700 hover:text-black relative"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Profile */}
              <Link
                href="/profile"
                className="p-2 text-gray-700 hover:text-black"
              >
                <UserIcon className="h-6 w-6" />
              </Link>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-2">
                {!isAuthenticated ? (
                  <>
                    <Link href="/login">
                      <button className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100">
                        Login
                      </button>
                    </Link>
                    <Link href="/register">
                      <button
                        className="px-4 py-2 rounded-lg text-white text-sm"
                        style={{ backgroundColor: "rgba(0,0,0,1)" }}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </>
                ) : (
                  <button
                    className="px-4 py-2 rounded-lg border text-sm"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Bars3Icon className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
            <nav className="flex flex-col px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-black text-base font-medium py-2"
                >
                  {link.name}
                </Link>
              ))}

              {!isAuthenticated ? (
                <div className="flex flex-col space-y-2 mt-2">
                  <Link href="/login">
                    <button className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100">
                      Login
                    </button>
                  </Link>
                  <Link href="/register">
                    <button
                      className="px-4 py-2 rounded-lg text-white text-sm"
                      style={{ backgroundColor: "rgba(0,0,0,1)" }}
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              ) : (
                <button
                  className="px-4 py-2 rounded-lg border text-sm"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </header>
    </ClientOnly>
  );

};

export default Header;
