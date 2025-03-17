import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NextDeliveryPage from './pages/next-delivery/index';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/next-delivery/:userId" element={<NextDeliveryPage />}/>
      </Routes>
    </Router>
  );
};

export default App;