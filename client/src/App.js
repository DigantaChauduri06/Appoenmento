import 'antd/dist/reset.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Page Import
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
