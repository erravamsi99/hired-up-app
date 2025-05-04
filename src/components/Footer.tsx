
import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 text-brand-purple" />
              <span className="text-xl font-bold text-brand-dark">HiredUp</span>
            </Link>
            <p className="mt-4 text-gray-600">
              Find your dream job with HiredUp. We connect talent with opportunity.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              For Job Seekers
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-600 hover:text-brand-purple transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/saved-jobs" className="text-gray-600 hover:text-brand-purple transition-colors">
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link to="/applied-jobs" className="text-gray-600 hover:text-brand-purple transition-colors">
                  Applied Jobs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">
                  Career Advice
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">
                  Resume Builder
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">
                  Interview Prep
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-purple transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} HiredUp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
