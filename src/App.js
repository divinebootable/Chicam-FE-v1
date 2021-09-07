// routes
import React, { Component } from 'react';
import Router from './routes';
import UserRoutes from './user.routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { useState, useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router';

// ----------------------------------------------------------------------

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const verifyUser = () => {
    const user = localStorage.getItem('usertype');
    if (user) {
      try {
        return user === 'admin' ? setIsAdmin(true) : setIsAdmin(false);
      } catch {
        console.log('error error');
      }
    } else {
      console.log('loop');
      navigate('/login', { replace: true });
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return isAdmin ? (
    <ThemeConfig>
      <ScrollToTop />
      <Router />
    </ThemeConfig>
  ) : (
    <ThemeConfig>
      <ScrollToTop />
      <UserRoutes />
    </ThemeConfig>
  );
};

export default App;
