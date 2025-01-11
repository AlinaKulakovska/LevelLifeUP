import './App.css';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Lore from './pages/Lore';
import Bingo from './pages/Bingo';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/lore" element={<Lore />} />
          <Route path="/bingo" element={<Bingo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
