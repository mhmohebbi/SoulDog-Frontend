import React, { useState } from 'react';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { AuthContext } from './AuthContext';

// ----------------------------------------------------------------------

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <ThemeConfig>
        <ScrollToTop />
        <Router />
      </ThemeConfig>
    </AuthContext.Provider>
  );
}
