import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout/Layout';
import Home from './components/Home/Home';
import ScrapRates from './components/scrap_rates/ScrapRates';
import PickupRequest from './components/pickup_request/PickupRequest';
import UserProfile from './components/userprofile/UserProfile';
import Error from './components/Error';
import Wallet from './components/Wallet/Wallet';
import TransferToBank from './components/Wallet/TransferToBank';
import MyOrders from './components/userprofile/MyOrders';
import { ConfirmPickup } from './components/confirmation/ConfirmPickup';
import { Privacy } from './components/footer/Privacy';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/privacy-policy' element={<Privacy />} />
        <Route path='/scraprates' element={<ScrapRates />} />
        <Route path='/pickuprequest' element={<PickupRequest />} />
        <Route path='/confirmpickup' element={<ConfirmPickup />} />
        <Route path='/user' element={<UserProfile />} />
        <Route path='/wallet' element={<Wallet />} />
        <Route path='/transfertobank' element={<TransferToBank />} />
        <Route path='/myorders' element={<MyOrders />} />
        <Route path='*' element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
