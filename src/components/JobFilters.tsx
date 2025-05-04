
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import { useJobs } from '@/contexts/JobsContext';

export function JobFilters() {
  const { filters, setFilters } = useJobs();
  const [minSalary, setMinSalary] = useState<number>(filters.minSalary || 40000);
  const [maxSalary, setMaxSalary] = useState<number>(filters.maxSalary || 200000);
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };
  
  const handleSalaryChange = () => {
    setFilters({
      ...filters,
      minSalary,
      maxSalary
    });
  };
  
  const clearFilters = () => {
    setMinSalary(40000);
    setMaxSalary(200000);
    
    setFilters({
      query: filters.query,
      location: filters.location,
      jobType: '',
      experienceLevel: '',
      workSetting: '',
      h1Type: '',
      jobCategory: '',
      minSalary: null,
      maxSalary: null
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 card-shadow animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-brand-purple" />
          <h2 className="font-semibold text-lg">Filters</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>
      
      <Accordion type="multiple" defaultValue={["job-type", "experience", "work-setting"]}>
        <AccordionItem value="job-type">
          <AccordionTrigger>Job Type</AccordionTrigger>
          <AccordionContent>
            <Select 
              value={filters.jobType} 
              onValueChange={(value) => handleFilterChange('jobType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="experience">
          <AccordionTrigger>Experience Level</AccordionTrigger>
          <AccordionContent>
            <Select 
              value={filters.experienceLevel} 
              onValueChange={(value) => handleFilterChange('experienceLevel', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Levels</SelectItem>
                <SelectItem value="Entry-level">Entry-level</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Mid-level">Mid-level</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="work-setting">
          <AccordionTrigger>Work Setting</AccordionTrigger>
          <AccordionContent>
            <Select 
              value={filters.workSetting} 
              onValueChange={(value) => handleFilterChange('workSetting', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select work setting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Settings</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Onsite">Onsite</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="h1-type">
          <AccordionTrigger>H-1B Visa</AccordionTrigger>
          <AccordionContent>
            <Select 
              value={filters.h1Type} 
              onValueChange={(value) => handleFilterChange('h1Type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select H-1B status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="H-1B">H-1B</SelectItem>
                <SelectItem value="Cap-Exempt">Cap-Exempt</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="salary">
          <AccordionTrigger>Salary Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>${minSalary.toLocaleString()}</Label>
                  <Label>${maxSalary.toLocaleString()}</Label>
                </div>
                <Slider 
                  min={40000} 
                  max={200000} 
                  step={5000} 
                  value={[minSalary, maxSalary]} 
                  onValueChange={([min, max]) => {
                    setMinSalary(min);
                    setMaxSalary(max);
                  }}
                  className="my-4"
                />
              </div>
              <Button 
                size="sm" 
                onClick={handleSalaryChange}
                className="w-full"
              >
                Apply Salary Filter
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="category">
          <AccordionTrigger>Job Category</AccordionTrigger>
          <AccordionContent>
            <Select 
              value={filters.jobCategory} 
              onValueChange={(value) => handleFilterChange('jobCategory', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="Software Development">Software Development</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="DevOps">DevOps</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="AI/ML">AI/ML</SelectItem>
                <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                <SelectItem value="Customer Success">Customer Success</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
