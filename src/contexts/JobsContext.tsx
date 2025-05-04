
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { mockJobs } from '@/data/mockJobs';

export type Job = {
  id: string;
  company: string;
  job_title: string;
  experience: string;
  job_location: string;
  job_type: string;
  work_setting: string;
  salary: string;
  date_posted: string;
  h1Type: string;
  job_link: string;
  experience_level: string;
  full_description: string;
  job_category: string;
};

type SearchFilters = {
  query: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  workSetting: string;
  h1Type: string;
  jobCategory: string;
  minSalary: number | null;
  maxSalary: number | null;
};

type JobsContextType = {
  jobs: Job[];
  savedJobs: Job[];
  appliedJobs: Job[];
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  searchJobs: () => Job[];
  saveJob: (job: Job) => void;
  unsaveJob: (jobId: string) => void;
  applyToJob: (job: Job) => void;
  isSaved: (jobId: string) => boolean;
  isApplied: (jobId: string) => boolean;
};

const defaultFilters: SearchFilters = {
  query: '',
  location: '',
  jobType: 'all',
  experienceLevel: 'all',
  workSetting: 'all',
  h1Type: 'all',
  jobCategory: 'all',
  minSalary: null,
  maxSalary: null,
};

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const { toast } = useToast();

  useEffect(() => {
    // Load mock data
    setJobs(mockJobs);
    
    // Load saved data from localStorage
    const savedJobsData = localStorage.getItem('savedJobs');
    const appliedJobsData = localStorage.getItem('appliedJobs');
    
    if (savedJobsData) {
      setSavedJobs(JSON.parse(savedJobsData));
    }
    
    if (appliedJobsData) {
      setAppliedJobs(JSON.parse(appliedJobsData));
    }
  }, []);

  // Save to localStorage whenever these values change
  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  const searchJobs = (): Job[] => {
    return jobs.filter(job => {
      // Main search query (job title or company)
      const matchesQuery = !filters.query || 
        job.job_title.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.query.toLowerCase());
      
      // Location filter
      const matchesLocation = !filters.location || 
        job.job_location.toLowerCase().includes(filters.location.toLowerCase());
      
      // Job type filter
      const matchesJobType = filters.jobType === 'all' || 
        job.job_type === filters.jobType;
      
      // Experience level filter
      const matchesExperience = filters.experienceLevel === 'all' || 
        job.experience_level === filters.experienceLevel;
      
      // Work setting filter
      const matchesWorkSetting = filters.workSetting === 'all' || 
        job.work_setting === filters.workSetting;
      
      // H1 Type filter
      const matchesH1Type = filters.h1Type === 'all' || 
        job.h1Type === filters.h1Type;
      
      // Job category filter
      const matchesCategory = filters.jobCategory === 'all' || 
        job.job_category === filters.jobCategory;
      
      // Salary filter
      let matchesSalary = true;
      if (filters.minSalary !== null || filters.maxSalary !== null) {
        const salaryStr = job.salary.replace(/[^0-9-]/g, '');
        const salaryParts = salaryStr.split('-');
        let minJobSalary, maxJobSalary;
        
        if (salaryParts.length > 1) {
          minJobSalary = parseInt(salaryParts[0]);
          maxJobSalary = parseInt(salaryParts[1]);
        } else {
          minJobSalary = maxJobSalary = parseInt(salaryStr);
        }
        
        if (!isNaN(minJobSalary) && !isNaN(maxJobSalary)) {
          if (filters.minSalary !== null && maxJobSalary < filters.minSalary) {
            matchesSalary = false;
          }
          if (filters.maxSalary !== null && minJobSalary > filters.maxSalary) {
            matchesSalary = false;
          }
        } else {
          // If we can't parse the salary, we'll just include it in results
          matchesSalary = true;
        }
      }
      
      return matchesQuery && 
             matchesLocation && 
             matchesJobType && 
             matchesExperience && 
             matchesWorkSetting && 
             matchesH1Type && 
             matchesCategory && 
             matchesSalary;
    });
  };
  
  const saveJob = (job: Job) => {
    // Check if job is already saved
    if (!isSaved(job.id)) {
      setSavedJobs(prev => [...prev, job]);
      toast({
        title: "Job saved!",
        description: `${job.job_title} at ${job.company} added to your saved jobs.`,
      });
    }
  };
  
  const unsaveJob = (jobId: string) => {
    setSavedJobs(prev => prev.filter(job => job.id !== jobId));
    toast({
      title: "Job removed",
      description: "The job has been removed from your saved jobs.",
    });
  };
  
  const applyToJob = (job: Job) => {
    // Check if job is already applied
    if (!isApplied(job.id)) {
      setAppliedJobs(prev => [...prev, job]);
      toast({
        title: "Application submitted!",
        description: `You've successfully applied for ${job.job_title} at ${job.company}.`,
      });
    } else {
      toast({
        title: "Already applied",
        description: `You've already applied for this job.`,
      });
    }
  };
  
  const isSaved = (jobId: string) => {
    return savedJobs.some(job => job.id === jobId);
  };
  
  const isApplied = (jobId: string) => {
    return appliedJobs.some(job => job.id === jobId);
  };

  return (
    <JobsContext.Provider value={{
      jobs,
      savedJobs,
      appliedJobs,
      filters,
      setFilters,
      searchJobs,
      saveJob,
      unsaveJob,
      applyToJob,
      isSaved,
      isApplied
    }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};
