import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/shop/hats' element={ <HatsPage /> } />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
