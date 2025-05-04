
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { JobSearchBar } from '@/components/JobSearchBar';
import { Briefcase } from 'lucide-react';
import { useJobs } from '@/contexts/JobsContext';
import { JobCard } from '@/components/JobCard';

const HomePage = () => {
  const { jobs, searchJobs, saveJob, unsaveJob, isSaved } = useJobs();
  
  const featuredJobs = jobs.slice(0, 4);
  const categories = [
    { name: "Software Development", count: 215 },
    { name: "Data Science", count: 132 },
    { name: "Marketing", count: 97 },
    { name: "Design", count: 85 },
    { name: "Product Management", count: 76 },
    { name: "DevOps", count: 68 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-light to-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-white px-4 py-2 rounded-full shadow-sm">
                <p className="text-sm font-medium flex items-center text-brand-purple">
                  <span className="bg-brand-purple h-2 w-2 rounded-full mr-2"></span>
                  10,000+ Jobs Available
                </p>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-brand-dark animate-fade-in">
                Find Your Dream Job With <span className="text-brand-purple">HiredUp</span>
              </h1>
              
              <p className="text-lg text-gray-600 animate-fade-in">
                Discover opportunities from leading companies. Search, save, and apply to jobs all in one place.
              </p>
              
              <div className="pt-4 animate-fade-in">
                <JobSearchBar />
              </div>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <p className="text-sm text-gray-500">Popular searches:</p>
                <Link to="/jobs?query=software+engineer" className="text-sm text-brand-purple hover:underline">
                  Software Engineer
                </Link>
                <Link to="/jobs?query=data+scientist" className="text-sm text-brand-purple hover:underline">
                  Data Scientist
                </Link>
                <Link to="/jobs?query=product+manager" className="text-sm text-brand-purple hover:underline">
                  Product Manager
                </Link>
              </div>
            </div>
            
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-brand-purple opacity-10 rounded-full"></div>
                <img 
                  src="https://images.unsplash.com/photo-1573496546038-82f9c39f6365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8am9iJTIwaW50ZXJ2aWV3fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" 
                  alt="Job search" 
                  className="rounded-lg shadow-xl relative z-10 animate-scale-in"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">Featured Jobs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our hand-picked selection of top job opportunities from leading companies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredJobs.map(job => (
              <JobCard 
                key={job.id}
                job={job}
                isSaved={isSaved(job.id)}
                onSave={() => saveJob(job)}
                onUnsave={() => unsaveJob(job.id)}
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/jobs">
              <Button size="lg" className="bg-brand-purple hover:bg-purple-600">
                Browse All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Job Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">
              Browse By Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore jobs across various industries and specializations
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/jobs?category=${category.name}`}
                className="block group"
              >
                <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-brand-purple hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-brand-dark group-hover:text-brand-purple transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-500 mt-1">{category.count} jobs available</p>
                    </div>
                    
                    <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all duration-300">
                      <Briefcase className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
