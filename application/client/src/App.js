import logo from './logo.svg';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from "./components/Main";
import UserRegistration from "./components/userRegistration";
import Sfsuswe from './components/Sfsuswe';

function App() {
  return (
    <BrowserRouter>
      <Sfsuswe />
      <Main />
      <Route path="/userRegistration" component={UserRegistration} />
    </BrowserRouter>

  );
}

export default App;
