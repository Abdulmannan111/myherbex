import './App.css'; 
import Home from './Pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Pages/Header/Header';
import { Route, Routes } from 'react-router';
import Availability from './Pages/Availability/Availability';
import Profile from './Pages/Profile/Profile';
import Minted from './Pages/Minted/Minted';
import WalletLogin from './components/WalletLogin/WalletLogin';
import AvailableItem from './Pages/Availability/AvailableItem';


function App() { 
  return (
    <div> 
      <WalletLogin></WalletLogin>
      <Header/> 
      <Routes> 
        <Route path='/' element={<Home/>}/>
        <Route path='/availability' element={<Availability/>}/>
        <Route path='/availability/:id' element={<AvailableItem/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/minted' element={<Minted/>}/>
      </Routes>
        
    </div>
  );
}

export default App;
