import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Typography, 
  InputAdornment, 
  Container,
  Paper,
} from '@mui/material';
import { 
  Send
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import Message from '../Message/Message';

const ChatInterface = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { 
      id: 1, 
      content: "Hey I am FloatChat, be ready to dive deep and explore the Ocean", 
      sender: 'bot',
      timestamp: new Date().toISOString() 
    },
  ]);
  
  // Suggested queries that float as hints
  const suggestions = [
    "Tell me about temperature profiles in the Arabian Sea",
    "Compare salinity between Pacific and Atlantic Ocean",
    "What data is available from Bay of Bengal for March 2023?"
  ];
  const messagesEndRef = useRef(null);
  const [thinking, setThinking] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      id: chatHistory.length + 1,
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    
    // Show thinking state
    setThinking(true);
    
    // Simulate bot response based on user input
    setTimeout(() => {
      setThinking(false);
      
      let botResponse;
      const userInput = message.toLowerCase();
      
      // Generate different response types based on user input
      if (userInput.includes('plot') || userInput.includes('graph') || userInput.includes('visualize') || userInput.includes('chart')) {
        // Simple text response for visualization requests
        botResponse = {
          id: chatHistory.length + 2,
          content: `I understand you're looking for a visualization of oceanographic data. While I can't generate plots directly in this interface, I can help you understand the data patterns:

For Pacific Ocean temperature profiles:
- Surface temperatures typically range from 25-30°C
- Temperature decreases rapidly in the thermocline (0-200m depth)
- Deep ocean temperatures stabilize around 2-5°C below 1000m
- Salinity patterns show subtropical maxima around 200m depth

Would you like me to provide specific data values or help you understand particular oceanographic phenomena?`,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
      } else if (userInput.includes('compare') || userInput.includes('table') || userInput.includes('summary')) {
        // Simple text response for comparison requests
        botResponse = {
          id: chatHistory.length + 2,
          content: `Here's a comparative summary of major ocean basins:

**North Atlantic Ocean:**
- Average Surface Temperature: 22.1°C
- Average Salinity: 36.1 PSU
- Average Oxygen: 245.3 μmol/kg
- Mixed Layer Depth: 73.2m

**Pacific Ocean:**
- Average Surface Temperature: 21.6°C
- Average Salinity: 34.8 PSU
- Average Oxygen: 235.2 μmol/kg
- Mixed Layer Depth: 61.0m

**Indian Ocean:**
- Average Surface Temperature: 27.2°C
- Average Salinity: 35.0 PSU
- Average Oxygen: 222.5 μmol/kg
- Mixed Layer Depth: 48.7m

**Southern Ocean:**
- Average Surface Temperature: 5.2°C
- Average Salinity: 34.1 PSU
- Average Oxygen: 301.4 μmol/kg
- Mixed Layer Depth: 92.6m

The Southern Ocean stands out with the coldest temperatures but highest oxygen content, while the Indian Ocean has the warmest surface temperatures.`,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
      } else if (userInput.includes('data') || userInput.includes('download') || userInput.includes('export')) {
        // Raw data response
        botResponse = {
          id: chatHistory.length + 2,
          content: `I've prepared the oceanographic data you requested for further analysis.

Here is your data: [RAW_DATA_KEY:GLOBAL_ARGO_${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}]

This dataset contains temperature, salinity, and pressure measurements from global ARGO floats for the current month. You can download or analyze this data using external tools.`,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
      } else {
        // Default text response
        botResponse = {
          id: chatHistory.length + 2,
          content: `I'm analyzing your query about "${message}". As your ARGO float data assistant, I can help with oceanographic data analysis, visualizations, and insights. You can ask me to:

1. Plot temperature or salinity profiles for specific regions
2. Compare oceanographic data between different basins
3. Generate statistical summaries of ARGO float measurements
4. Provide raw data exports for further analysis

For best results, try specifying the region, time period, and type of analysis you're interested in.`,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
      }
      
      setChatHistory(prev => [...prev, botResponse]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Handle clicking on a suggestion
  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    // Use setTimeout to allow the state update to complete
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, thinking]);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      bgcolor: '#0E1117',
      color: '#FFFFFF',
    }}>
      {/* Header */}
      <Box sx={{
        p: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
      }}>
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'start',
            cursor: 'pointer',
          }}  
          onClick={() => navigate('/')}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="/FloatLogo.png" 
              alt="FloatChat Logo"
              style={{ 
                width: 24, 
                height: 24, 
                marginRight: 8,
              }} 
            />
          </motion.div>
          <Typography sx={{ fontSize: '1.1rem', fontWeight: 400 }}>
            <span style={{ color: '#4dabf7' }}>Float</span>
            <span style={{ color: '#003366' }}>Chat</span>
          </Typography>
        </Box>
      </Box>
      
      {/* Main content area with messages */}
      <Container maxWidth="xl" sx={{ display: 'flex', flex: 1, position: 'relative', p: { xs: 0, md: 2 } }}>
        <Box sx={{ 
          display: 'flex', 
          flex: 1, 
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Chat messages area */}
          <Box
            sx={{
              p: 3,
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              background: 'transparent',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Welcome message and floating suggestions */}
            {chatHistory.length <= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box 
                  sx={{ 
                    textAlign: 'center', 
                    mb: 4,
                    mt: 2,
                    position: 'relative',
                  }}
                >
                  <Typography 
                    variant="h4" 
                    className="gradient-text"
                    sx={{ 
                      mb: 3,
                      fontWeight: 700,
                    }}
                  >
                    ARGO Float Data Assistant
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: theme.palette.text.secondary,
                      maxWidth: 700,
                      mx: 'auto',
                      mb: 4
                    }}
                  >
                    Ask questions about ARGO float data using natural language. I can help with salinity profiles, temperature data, BGC parameters, and other oceanographic information.
                  </Typography>
                  
                  {/* Floating suggestion chips */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '700px', mx: 'auto' }}>
                    {suggestions.map((suggestion, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                        whileHover={{ scale: 1.01, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Box 
                          sx={{
                            p: 2.5,
                            bgcolor: 'rgba(15, 23, 42, 0.6)',
                            borderRadius: '12px',
                            border: '1px solid rgba(30, 136, 229, 0.2)',
                            cursor: 'pointer',
                            '&:hover': {
                              bgcolor: 'rgba(30, 40, 60, 0.7)',
                              borderColor: 'rgba(78, 79, 235, 0.4)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                            },
                            transition: 'all 0.3s ease',
                            textAlign: 'left',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
                          }}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <Typography sx={{ fontSize: '1rem' }}>{suggestion}</Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            )}
            
            {/* Messages */}
            <Box sx={{ maxWidth: 900, mx: 'auto', width: '100%' }}>
              {chatHistory.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                  className="message-appear"
                >
                  <Message message={msg} />
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Input area */}
      <Container maxWidth="lg" sx={{ width: '100%', mb: { xs: 2, md: 4 }, mt: 2 }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Paper
            elevation={0}
            className="glass-effect"
            sx={{
              p: { xs: 1.5, md: 2 },
              borderRadius: 4,
              backdropFilter: 'blur(10px)',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(30, 136, 229, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              maxWidth: 900,
              mx: 'auto',
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ask about ARGO float data, e.g., 'Show salinity profiles near the equator'..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0, 10, 25, 0.4)',
                  backdropFilter: 'blur(10px)',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(30, 136, 229, 0.3)',
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconButton 
                        color="primary" 
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        sx={{
                          bgcolor: message.trim() ? theme.palette.primary.main : 'rgba(15, 23, 42, 0.2)',
                          color: message.trim() ? '#fff' : theme.palette.text.secondary,
                          '&:hover': {
                            bgcolor: message.trim() ? theme.palette.primary.dark : 'rgba(15, 23, 42, 0.3)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <Send fontSize="small" />
                      </IconButton>
                    </motion.div>
                  </InputAdornment>
                ),
              }}
            />
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ChatInterface;
