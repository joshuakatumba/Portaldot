import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Stealth } from './pages/Stealth';
import { Activity } from './pages/Activity';
import { Admin } from './pages/Admin';
import { Web3Provider } from './context/Web3Context';
import './index.css';

function App() {
  return (
    <Web3Provider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stealth" element={<Stealth />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </Web3Provider>
  );
}

export default App;
