
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Bookmark, BookmarkPlus, Briefcase } from 'lucide-react';
import { useJobs } from '@/contexts/JobsContext';
import { useAuth } from '@/contexts/AuthContext';

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { jobs, savedJobs, appliedJobs, saveJob, unsaveJob, applyToJob, isSaved, isApplied } = useJobs();
  const { isAuthenticated } = useAuth();
  
  const job = jobs.find(job => job.id === id);
  
  if (!job) {
    return (
      <div className="container mx-auto py-16 px-6 text-center">
        <h1 className="text-3xl font-bold text-red-500">Job Not Found</h1>
        <p className="mt-4 text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/jobs')} className="mt-6">
          Back to Job Listings
        </Button>
      </div>
    );
  }
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };
  
  const handleApply = () => {
    if (isAuthenticated) {
      applyToJob(job);
    } else {
      navigate('/login?redirect=' + encodeURIComponent(`/jobs/${id}`));
    }
  };
  
  const handleSaveToggle = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=' + encodeURIComponent(`/jobs/${id}`));
      return;
    }
    
    if (isSaved(job.id)) {
      unsaveJob(job.id);
    } else {
      saveJob(job);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="card-shadow">
              <CardContent className="p-8">
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-brand-dark">{job.job_title}</h1>
                    <div className="flex items-center mt-2">
                      <span className="font-medium text-gray-700">{job.company}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-600">{job.job_location}</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSaveToggle}
                    className="h-10 w-10 rounded-full hover:bg-brand-light"
                  >
                    {isSaved(job.id) ? (
                      <Bookmark className="h-5 w-5 text-brand-purple" />
                    ) : (
                      <BookmarkPlus className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  <Badge variant="secondary" className="bg-brand-light text-brand-purple">
                    {job.job_type}
                  </Badge>
                  <Badge variant="secondary" className="bg-brand-light text-brand-purple">
                    {job.work_setting}
                  </Badge>
                  <Badge variant="secondary" className="bg-brand-light text-brand-purple">
                    {job.experience_level}
                  </Badge>
                  {job.h1Type && (
                    <Badge variant="outline">{job.h1Type}</Badge>
                  )}
                </div>
                
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Salary</p>
                    <p className="font-medium">{job.salary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium">{job.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Posted</p>
                    <p className="font-medium">{formatDate(job.date_posted)}</p>
                  </div>
                </div>
                
                <Separator className="my-8" />
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                  <div className="space-y-4 text-gray-700">
                    {job.full_description.split('\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="mb-6 card-shadow">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Job Overview</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center mr-3">
                      <Briefcase className="h-4 w-4 text-brand-purple" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Job Category</p>
                      <p className="font-medium">{job.job_category}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  {isApplied(job.id) ? (
                    <div className="text-center p-3 bg-green-50 rounded-md border border-green-200">
                      <p className="text-green-700 font-medium">You've already applied</p>
                      <p className="text-green-600 text-sm mt-1">Application submitted</p>
                    </div>
                  ) : (
                    <Button 
                      className="w-full bg-brand-purple hover:bg-purple-600"
                      onClick={handleApply}
                    >
                      Apply Now
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-3"
                    onClick={handleSaveToggle}
                  >
                    {isSaved(job.id) ? 'Saved' : 'Save Job'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-shadow">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Similar Jobs</h2>
                
                <div className="space-y-4">
                  {jobs
                    .filter(j => 
                      j.id !== job.id && 
                      (j.job_category === job.job_category || 
                       j.job_title.includes(job.job_title.split(' ')[0]))
                    )
                    .slice(0, 3)
                    .map(similarJob => (
                      <div 
                        key={similarJob.id} 
                        className="border border-gray-200 rounded-md p-3 hover:border-brand-purple transition-colors cursor-pointer"
                        onClick={() => navigate(`/jobs/${similarJob.id}`)}
                      >
                        <h3 className="font-medium text-brand-dark hover:text-brand-purple">
                          {similarJob.job_title}
                        </h3>
                        <p className="text-sm text-gray-600">{similarJob.company}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {similarJob.job_type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {similarJob.work_setting}
                          </Badge>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
