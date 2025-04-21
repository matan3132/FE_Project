import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./view/components/Navigation/Navigation";

// ייבוא כל המסכים
import Home from "./view/pages/Home/Home";
import Welcome from "./view/pages/Welcome/Welcome";
import Registration from "./view/pages/Registration/Registration";
import Scholarships from "./view/pages/Scholarships/Scholarships";
import HelpCenter from "./view/pages/HelpCenter/HelpCenter";
import Dashboard from "./view/pages/Dashboard/Dashboard";
import AdminPanel from "./view/pages/AdminPanel/AdminPanel";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
