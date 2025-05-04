
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { JobSearchBar } from '@/components/JobSearchBar';
import { JobFilters } from '@/components/JobFilters';
import { JobCard } from '@/components/JobCard';
import { useJobs } from '@/contexts/JobsContext';

const JobsPage = () => {
  const location = useLocation();
  const { searchJobs, saveJob, unsaveJob, isSaved, filters, setFilters } = useJobs();
  const searchResults = searchJobs();
  
  // Parse query parameters from the URL
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const searchQuery = query.get('query');
    const category = query.get('category');
    
    if (searchQuery || category) {
      setFilters({
        ...filters,
        query: searchQuery || '',
        jobCategory: category || '',
      });
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-dark mb-6">Find Your Perfect Job</h1>
          <JobSearchBar />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <JobFilters />
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  <span className="font-medium">{searchResults.length}</span> jobs found
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="text-sm border rounded p-1">
                    <option>Most Relevant</option>
                    <option>Date: Newest</option>
                    <option>Salary: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {searchResults.length > 0 ? (
                searchResults.map(job => (
                  <JobCard 
                    key={job.id}
                    job={job}
                    isSaved={isSaved(job.id)}
                    onSave={() => saveJob(job)}
                    onUnsave={() => unsaveJob(job.id)}
                  />
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800">No jobs found</h3>
                  <p className="mt-2 text-gray-600">
                    Try adjusting your search or filters to find more jobs
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
