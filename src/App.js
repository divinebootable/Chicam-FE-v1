// routes
import React, { Component } from 'react';
import Router from './routes';
import UserRoutes from './user.routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { useState } from 'react';
import { useNavigate, useRoutes } from 'react-router';

// ----------------------------------------------------------------------

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const verifyUser = () => {
    const user = localStorage.getItem('usertype');
    console.log('first', +user);
    if (user) {
      try {
        return user === 'admin' ? setIsAdmin(true) : setIsAdmin(false);
      } catch {
        console.log('error');
      }
    } else {
      window.location.href = 'http://localhost:3000/login';
    }
    console.log('later', +user);
  };

  React.useEffect(() => {
    verifyUser();
    console.log('onMount');
  }, [isAdmin]);

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
