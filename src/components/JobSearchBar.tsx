
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useJobs } from '@/contexts/JobsContext';

export function JobSearchBar() {
  const navigate = useNavigate();
  const { filters, setFilters } = useJobs();
  const [searchQuery, setSearchQuery] = useState(filters.query || '');
  const [location, setLocation] = useState(filters.location || '');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    setFilters({
      ...filters,
      query: searchQuery,
      location: location
    });
    
    navigate('/jobs');
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Job title or company"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
        
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
        
        <Button 
          type="submit" 
          className="h-12 px-8 bg-brand-purple hover:bg-purple-600 text-white"
        >
          Find Jobs
        </Button>
      </div>
    </form>
  );
}
