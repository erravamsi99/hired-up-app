
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { JobsProvider } from "./contexts/JobsContext";

import { Layout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import SavedJobsPage from "./pages/SavedJobsPage";
import AppliedJobsPage from "./pages/AppliedJobsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <JobsProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/jobs/:id" element={<JobDetailPage />} />
                <Route path="/saved-jobs" element={<SavedJobsPage />} />
                <Route path="/applied-jobs" element={<AppliedJobsPage />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </JobsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
