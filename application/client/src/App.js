import logo from './logo.svg';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from "./components/Main";
import UserRegistration from "./components/userRegistration";

function App() {
  return (
    <BrowserRouter>
      <Main />
      <Route path="/userRegistration" component={UserRegistration} />
    </BrowserRouter>
    
  );
}

export default App;
