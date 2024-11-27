import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RideOptionsPage from './pages/RideOptionsPage';
import RideHistoryPage from './pages/RideHistoryPage';
import RideRequest from './pages/RideRequest';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<RideRequest />} />
      <Route path='/ride-options' element={<RideOptionsPage />} />
      <Route path='/ride-history' element={<RideHistoryPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
