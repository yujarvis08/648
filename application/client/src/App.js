import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from "./components/Main";
import Sfsuswe from './components/Sfsuswe';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userType, setUserType] = React.useState('');

  async function handleLogout() {
    let wrappedResponse = await fetch('/api/auth/logout');
    if (wrappedResponse.ok) {
      console.log('logging out');
      setIsLoggedIn(false);
      // now that we're logged out, reset the userType
      setUserType('');
    }
  }

  async function handleLogin() {
    let cookies = document.cookie.split('; ');

    for (let cookie of cookies) {
      let key = cookie.split('=')[0];
      if (key === 'account_id') {
        setIsLoggedIn(true);
        // now that user logged in, get the userType as well
        let response = await fetch('/api/accountInfo/getUserType');
        response = await response.json();
        console.log('Logged in. User type:', response.userType);
        setUserType(response.userType);
      }
    }
  }


  // Check login status on App load
  React.useEffect(() => {
    handleLogin();
  }, []);

  return (
    <BrowserRouter>
      <Sfsuswe />
      <Navigation
        handleLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        userType={userType}
        handleLogin={handleLogin}
      />
      <Main
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userType={userType}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
      />
      <Footer />
    </BrowserRouter>

  );
}

export default App;

