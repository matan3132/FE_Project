import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import Navigation from "./view/components/Navigation/Navigation";
import StatusBar from "./view/components/StatusBar/StatusBar";
import Footer from "./view/components/Footer/Footer";
import ProtectedRoute from './view/components/ProtectedRoute/ProtectedRoute';
import Home from "./view/pages/Home/Home";
import Registration from "./view/pages/Registration/Registration";
import Login from "./view/pages/Login/Login";
import Scholarships from "./view/pages/Scholarships/Scholarships";
import HelpCenter from "./view/pages/HelpCenter/HelpCenter";
import AdminPanel from "./view/pages/AdminPanel/AdminPanel";
import Profile from "./view/pages/Profile/Profile";
import ScholarshipDetails from "./view/pages/ScholarshipDetails/ScholarshipDetails";
import ApplicationSuccess from "./view/pages/ApplicationSuccess/ApplicationSuccess";
import NotFound from "./view/pages/NotFound/NotFound";

function App() {
  return (
    <Router>
      <AuthProvider>
        <StatusBar />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/scholarship/:id" element={<ScholarshipDetails />} />
          <Route path="/application-success" element={<ApplicationSuccess />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminPanel /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
