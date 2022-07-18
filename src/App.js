import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/shop' element={ <ShopPage /> } />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
