import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import CitoyenPage from './pages/citoyenpage';
import AgentPage from './pages/agentpage';
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeProvider } from "@/components/theme-provider"


const App: React.FC = () => {
  return (
   
      < Router >
      
      <div className="min-h-screen flex flex-col" >
        <Header />
        < Routes >
        <Route path="/" element = {< HomePage />} />
          < Route path = "/citoyens" element = {< CitoyenPage />} />
            < Route path = "/agents" element = {< AgentPage />} />
              </Routes>
              < Footer />
              </div>
              </Router>
  );
};

export default App;