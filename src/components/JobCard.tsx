
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, BookmarkPlus } from 'lucide-react';
import { Job } from '@/contexts/JobsContext';

type JobCardProps = {
  job: Job;
  isSaved: boolean;
  onSave: () => void;
  onUnsave: () => void;
};

export function JobCard({ job, isSaved, onSave, onUnsave }: JobCardProps) {
  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };
  
  // Extract date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card className="group overflow-hidden border border-gray-200 card-shadow hover:shadow-md transition-shadow animate-fade-in hover-scale">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/jobs/${job.id}`} className="block">
              <h3 className="text-lg font-bold text-brand-dark hover:text-brand-purple transition-colors">
                {job.job_title}
              </h3>
              <p className="text-gray-600 font-medium">{job.company}</p>
            </Link>
            
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-brand-light text-brand-purple">
                {job.job_type}
              </Badge>
              <Badge variant="secondary" className="bg-brand-light text-brand-purple">
                {job.work_setting}
              </Badge>
              {job.h1Type && (
                <Badge variant="outline">{job.h1Type}</Badge>
              )}
            </div>
            
            <div className="mt-3 text-sm text-gray-500">
              <p>{job.job_location}</p>
              <p className="mt-1">{job.salary}</p>
            </div>
            
            <p className="mt-3 text-sm text-gray-600">
              {truncate(job.full_description, 150)}
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={isSaved ? onUnsave : onSave}
            className="h-9 w-9 rounded-full hover:bg-brand-light"
          >
            {isSaved ? (
              <Bookmark className="h-5 w-5 text-brand-purple" />
            ) : (
              <BookmarkPlus className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-gray-500">Posted: {formatDate(job.date_posted)}</p>
          <Link to={`/jobs/${job.id}`}>
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
