import logo from './logo.svg';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from "./components/Main";
import UserRegistration from "./components/userRegistration";
import Checkout from "./components/Checkout";
import AccountInfo from './components/AccountInfo';
// import { insertRestaurant } from '../../server/models/Restaurant';
import Resturantmenu from './components/Resturantmenu';

function App() {
  return (
    <BrowserRouter>
      <Main />
      <Route path="/userRegistration" component={UserRegistration} />
      <Route path="/Checkout" component={Checkout} />
      <Route path="/AccountInfo" component={AccountInfo} />
      <Route path="/Resturantmenu" component={Resturantmenu} />
    </BrowserRouter>


  );
}

export default App;
