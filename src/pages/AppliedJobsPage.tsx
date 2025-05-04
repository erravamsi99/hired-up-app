
import React from 'react';
import { Button } from "@/components/ui/button";
import { JobCard } from '@/components/JobCard';
import { useJobs } from '@/contexts/JobsContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const AppliedJobsPage = () => {
  const { appliedJobs, saveJob, unsaveJob, isSaved } = useJobs();
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=/applied-jobs" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <div className="flex items-center mb-8">
          <Briefcase className="h-6 w-6 text-brand-purple mr-3" />
          <h1 className="text-3xl font-bold text-brand-dark">Applied Jobs</h1>
        </div>
        
        {appliedJobs.length > 0 ? (
          <div className="space-y-6">
            {appliedJobs.map(job => (
              <JobCard 
                key={job.id}
                job={job}
                isSaved={isSaved(job.id)}
                onSave={() => saveJob(job)}
                onUnsave={() => unsaveJob(job.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">No applications yet</h2>
            <p className="mt-2 text-gray-600 max-w-md mx-auto">
              Start applying for jobs and track your application history here.
            </p>
            <Button 
              className="mt-6 bg-brand-purple hover:bg-purple-600"
              onClick={() => window.location.href = '/jobs'}
            >
              Browse Jobs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobsPage;
