
import React from 'react';
import { Button } from "@/components/ui/button";
import { JobCard } from '@/components/JobCard';
import { useJobs } from '@/contexts/JobsContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';

const SavedJobsPage = () => {
  const { savedJobs, unsaveJob, isSaved } = useJobs();
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=/saved-jobs" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <div className="flex items-center mb-8">
          <Bookmark className="h-6 w-6 text-brand-purple mr-3" />
          <h1 className="text-3xl font-bold text-brand-dark">Saved Jobs</h1>
        </div>
        
        {savedJobs.length > 0 ? (
          <div className="space-y-6">
            {savedJobs.map(job => (
              <JobCard 
                key={job.id}
                job={job}
                isSaved={isSaved(job.id)}
                onSave={() => {}} // Already saved
                onUnsave={() => unsaveJob(job.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">No saved jobs yet</h2>
            <p className="mt-2 text-gray-600 max-w-md mx-auto">
              When you find a job that interests you, click the bookmark icon to save it for later.
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

export default SavedJobsPage;
