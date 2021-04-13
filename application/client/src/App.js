import logo from './logo.svg';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from "./components/Main";
import UserRegistration from "./components/userRegistration";
import Checkout from "./components/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Main />
      <Route path="/userRegistration" component={UserRegistration} />
      <Route path="/checkout" component={Checkout} />
    </BrowserRouter>
    
    
  );
}

export default App;
