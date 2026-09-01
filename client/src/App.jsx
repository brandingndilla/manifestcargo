import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import ManifestManager from './components/Manifest/ManifestManager';
import ManifestItems from './components/Manifest/ManifestItems';
import ViewManifest from './components/Manifest/ViewManifest';
import EditManifest from './components/Manifest/EditManifest';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './App.css'; 

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/" element={<Navigate to="/manifest-manager" />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              {/* Main route - Manifest Manager */}
              <Route path="/manifest-manager" element={<ManifestManager />} />
              
              {/* Redirect old /manifest to /manifest-manager */}
              <Route path="/manifest" element={<Navigate to="/manifest-manager" />} />
              
              <Route path="/manifest-items" element={<ManifestItems />} />
              <Route path="/manifest-items/:id" element={<ManifestItems />} />
              <Route path="/view-manifest/:id" element={<ViewManifest />} />
              
              {/* Add Edit Manifest route */}
              <Route path="/edit-manifest/:id" element={<EditManifest />} />

              {/* Admin Dashboard - AdminDashboard itself checks isAdmin
                  and redirects non-admins back to /manifest-manager */}
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;