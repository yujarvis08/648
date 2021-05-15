import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from "./components/Main";
import Sfsuswe from './components/Sfsuswe';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  async function handleLogout(e) {
    e.preventDefault();
    let wrappedResponse = await fetch('/api/auth/logout');
    if (wrappedResponse.ok) {
      console.log('logging out');
      setIsLoggedIn(false);
    }
  }

  // Check login status on App load
  React.useEffect(() => {
    let cookies = document.cookie.split('=');
    if (cookies.includes('account_id')) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Sfsuswe />
      <Navigation handleLogout={handleLogout} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Main isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Footer />
    </BrowserRouter>

  );
}

export default App;

