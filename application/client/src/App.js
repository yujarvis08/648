import Checkout from "./components/Checkout";
import AccountInfo from './components/AccountInfo';
// import { insertRestaurant } from '../../server/models/Restaurant';
import Resturantmenu from './components/Resturantmenu';
import AccountChangePassword from "./components/AccountChangePassword";

 
function App() {
 return (
   <BrowserRouter>
     <Main />
     <Route path="/userRegistration" component={UserRegistration} />
     <Route path="/Checkout" component={Checkout} />
     <Route path="/AccountInfo" component={AccountInfo} />
     <Route path="/Resturantmenu" component={Resturantmenu} />
     <Route path="/AccountChangePassword" component={AccountChangePassword} />
   </BrowserRouter>
 
 
 );
}
 
export default App;

