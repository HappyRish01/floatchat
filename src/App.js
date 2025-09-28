import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import theme from './theme';

// Import components
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={
              <Box sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
                <ChatInterface />
              </Box>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
