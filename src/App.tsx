import { Box, CssBaseline } from '@mui/joy';
import { Outlet, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Preferences from './pages/Preferences';
import Navbar from './components/organisms/Navbar';

function App() {
  return (
    <Box className="min-h-screen">
      <CssBaseline />
      <Navbar />
      <Box component="main" className="p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
