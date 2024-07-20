import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import Doctor from './pages/Doctor';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<Navigate to='/login' />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<User />} />
        <Route path="/doctor" element={<Doctor />} />
      </Routes>
    </div>
  );
}

export default App;

