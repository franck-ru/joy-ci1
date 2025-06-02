import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import HomePage from './pages/home';
import CitoyenPage from './pages/citoyenpage';
import AgentPage from './pages/agentpage';
import PersonnelPage from './pages/personnelpage';
import Header from './components/header';


const App: React.FC = () => {
  return (
   
      < Router >
      
      <div className="min-h-screen flex flex-col" >
        <Header />
        < Routes >
        <Route path="/" element = {< HomePage />} />
          < Route path = "/citoyens" element = {< CitoyenPage />} />
            < Route path = "/agents" element = {< AgentPage />} />
           <Route path="/personnel" element={<PersonnelPage />} />
         </Routes>
              < Footer />
              </div>
              </Router>
  );
};

export default App;
