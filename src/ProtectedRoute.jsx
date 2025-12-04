import React from 'react';
import { auth } from './config/firebase';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {

    const user = auth.currentUser;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

  return children;
}

export default ProtectedRoute;