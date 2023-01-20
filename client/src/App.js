import 'antd/dist/reset.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

// Page Import
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import { useSelector } from 'react-redux';
import ProtectedRoutes from './Components/ProtectedRoutes';
import PublicRoute from './Components/PublicRoute';
import ApplyDoctor from './Pages/ApplyDoctor';
import Notification from './Pages/Notification';

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <BrowserRouter>
      {
        loading &&
        <div className='loader-parent'>
          <ClipLoader color="#fff"
            size={190}
          />
        </div>
      }
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
        <Route path='/apply-doctor' element={<ProtectedRoutes><ApplyDoctor /></ProtectedRoutes>} />
        <Route path='/notifications' element={<ProtectedRoutes><Notification /></ProtectedRoutes>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
