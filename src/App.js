import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const data = localStorage.getItem('souldog-user');
    const auth = localStorage.getItem('souldog-isauth');

    if (auth) setIsAuth(JSON.parse(localStorage.getItem('souldog-isauth')));
    if (data) setUser(JSON.parse(localStorage.getItem('souldog-user')));
  }, []);

  useEffect(() => {
    localStorage.setItem('souldog-user', JSON.stringify(user));
    localStorage.setItem('souldog-isauth', isAuth);
  });
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
      <ThemeConfig>
        <ScrollToTop />
        <Router />
      </ThemeConfig>
    </AuthContext.Provider>
  );
}
