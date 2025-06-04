/**
 * ProtectedRoute Component
 * 
 * A higher-order component that protects routes from unauthorized access.
 * This component implements two levels of protection:
 * 1. Authentication check - ensures user is logged in
 * 2. Role-based access control - ensures user has required permissions
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if access is granted
 * @param {boolean} [props.requireAdmin=false] - Whether admin role is required to access the route
 * 
 * @returns {React.ReactNode} - Either the protected content or a redirect component
 */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { currentUser, userRole } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (requireAdmin && userRole !== 'admin') {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute; 