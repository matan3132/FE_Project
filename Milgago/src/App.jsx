import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./view/components/Navigation/Navigation";
import Footer from "./view/components/Footer/Footer";

// ייבוא כל המסכים
import Home from "./view/pages/Home/Home";
import Registration from "./view/pages/Registration/Registration";
import Scholarships from "./view/pages/Scholarships/Scholarships";
import HelpCenter from "./view/pages/HelpCenter/HelpCenter";
import Dashboard from "./view/pages/Dashboard/Dashboard";
import AdminPanel from "./view/pages/AdminPanel/AdminPanel";
import Profile from "./view/pages/Profile/Profile";
import ScholarshipDetails from "./view/pages/ScholarshipDetails/ScholarshipDetails";
import ApplicationSuccess from "./view/pages/ApplicationSuccess/ApplicationSuccess";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/scholarship/:id" element={<ScholarshipDetails />} />
        <Route path="/application-success" element={<ApplicationSuccess />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
