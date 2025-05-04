
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Briefcase, LogIn, LogOut, User } from "lucide-react";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white border-b shadow-sm py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Briefcase className="h-6 w-6 text-brand-purple" />
          <span className="text-xl font-bold text-brand-dark">HiredUp</span>
        </Link>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="font-medium hover:text-brand-purple transition-colors">
            Home
          </Link>
          <Link to="/jobs" className="font-medium hover:text-brand-purple transition-colors">
            Find Jobs
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/saved-jobs" className="font-medium hover:text-brand-purple transition-colors">
                Saved Jobs
              </Link>
              <Link to="/applied-jobs" className="font-medium hover:text-brand-purple transition-colors">
                Applied Jobs
              </Link>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{user?.name.split(' ')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link to="/profile">
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Link to="/login">
                <Button variant="outline" className="flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="default" className="bg-brand-purple hover:bg-purple-600">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
