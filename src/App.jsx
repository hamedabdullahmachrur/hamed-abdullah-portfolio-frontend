import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminExperience from './pages/admin/AdminExperience';
import AdminEducation from './pages/admin/AdminEducation';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{
        duration: 3500,
        style: {
          background: '#101820', color: '#c9d8e8',
          border: '1px solid rgba(23,158,122,0.25)',
          borderRadius: '0.625rem', fontSize: '0.875rem',
        },
        success: { iconTheme: { primary: '#38d9a9', secondary: '#101820' } },
        error: { iconTheme: { primary: '#f87171', secondary: '#101820' } },
      }} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainLayout><PageWrapper><Home /></PageWrapper></MainLayout>} />
          <Route path="/about" element={<MainLayout><PageWrapper><About /></PageWrapper></MainLayout>} />
          <Route path="/projects" element={<MainLayout><PageWrapper><Projects /></PageWrapper></MainLayout>} />
          <Route path="/experience" element={<MainLayout><PageWrapper><Experience /></PageWrapper></MainLayout>} />
          <Route path="/education" element={<MainLayout><PageWrapper><Education /></PageWrapper></MainLayout>} />
          <Route path="/contact" element={<MainLayout><PageWrapper><Contact /></PageWrapper></MainLayout>} />
          <Route path="/admin/login" element={<PageWrapper><AdminLogin /></PageWrapper>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><PageWrapper><AdminDashboard /></PageWrapper></ProtectedRoute>} />
          <Route path="/admin/projects" element={<ProtectedRoute><PageWrapper><AdminProjects /></PageWrapper></ProtectedRoute>} />
          <Route path="/admin/experience" element={<ProtectedRoute><PageWrapper><AdminExperience /></PageWrapper></ProtectedRoute>} />
          <Route path="/admin/education" element={<ProtectedRoute><PageWrapper><AdminEducation /></PageWrapper></ProtectedRoute>} />
          <Route path="*" element={<MainLayout><PageWrapper><NotFound /></PageWrapper></MainLayout>} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;
