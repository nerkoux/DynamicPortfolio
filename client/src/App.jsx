import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/portfolio/:id" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;