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
      content: "How can I help you? I'm your ARGO float data assistant. Ask me about ocean data analysis, temperature profiles, salinity data, or other oceanographic questions.", 
      sender: 'bot',
      timestamp: new Date().toISOString() 
    },
  ]);
  
  // Suggested queries that float as hints
  const suggestions = [
    "Plot temperature profile for the Arabian Sea",
    "Compare salinity in Pacific vs Atlantic Ocean",
    "Show me data from Bay of Bengal for March 2023"
  ];
  const messagesEndRef = useRef(null);
  const [thinking, setThinking] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Store the current message before clearing it
    const currentMessage = message;
    
    // Add user message to chat
    const userMessage = {
      id: chatHistory.length + 1,
      content: currentMessage,
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
      const userInput = currentMessage.toLowerCase();
      console.log('Processing user input:', userInput); // Debug log
      
      // Generate different response types based on user input
      if (userInput.includes('plot') || userInput.includes('graph') || userInput.includes('visualize') || userInput.includes('chart')) {
        console.log('Matched plot condition'); // Debug log
        // Plotly visualization response
        botResponse = {
          id: Date.now(), // Use timestamp for unique ID
          content: `Based on your request, here's a comprehensive ocean analysis with multiple visualizations:

## Ocean Temperature and Salinity Analysis

<<PLOTLY_JSON_BEGIN>>
{"data":[{"x":[0,50,100,150,200,300,400,500,600,700,800,900,1000,1200,1500,2000],"y":[28.5,26.8,24.2,18.5,12.8,8.9,6.7,5.2,4.8,4.3,3.9,3.6,3.2,2.8,2.4,2.1],"mode":"lines+markers","name":"Temperature (°C)","type":"scatter","line":{"color":"#4dabf7","width":3},"marker":{"color":"#4dabf7","size":6}},{"x":[0,50,100,150,200,300,400,500,600,700,800,900,1000,1200,1500,2000],"y":[34.2,34.8,35.1,35.3,35.0,34.7,34.5,34.6,34.7,34.8,34.9,35.0,35.1,35.0,34.9,34.8],"mode":"lines+markers","name":"Salinity (PSU)","type":"scatter","yaxis":"y2","line":{"color":"#ff6b35","width":3},"marker":{"color":"#ff6b35","size":6}},{"x":[0,50,100,150,200,300,400,500,600,700,800,900,1000,1200,1500,2000],"y":[280,265,245,220,195,175,160,150,145,140,138,135,132,128,125,120],"mode":"lines+markers","name":"Oxygen (μmol/kg)","type":"scatter","yaxis":"y3","line":{"color":"#51cf66","width":3},"marker":{"color":"#51cf66","size":6}}],"layout":{"title":{"text":"Multi-Parameter Ocean Profile - Indian Ocean","font":{"size":18,"color":"#FFFFFF"}},"xaxis":{"title":"Depth (meters)","gridcolor":"rgba(255,255,255,0.1)","zerolinecolor":"rgba(255,255,255,0.2)"},"yaxis":{"title":"Temperature (°C)","titlefont":{"color":"#4dabf7"},"tickfont":{"color":"#4dabf7"},"gridcolor":"rgba(255,255,255,0.1)","zerolinecolor":"rgba(255,255,255,0.2)"},"yaxis2":{"title":"Salinity (PSU)","titlefont":{"color":"#ff6b35"},"tickfont":{"color":"#ff6b35"},"overlaying":"y","side":"right","gridcolor":"rgba(255,255,255,0.05)"},"yaxis3":{"title":"Oxygen (μmol/kg)","titlefont":{"color":"#51cf66"},"tickfont":{"color":"#51cf66"},"overlaying":"y","side":"right","position":0.95},"showlegend":true,"legend":{"x":0.7,"y":0.95,"bgcolor":"rgba(0,0,0,0.5)","bordercolor":"rgba(255,255,255,0.2)","borderwidth":1}}}
<<PLOTLY_JSON_END>>

### Key Observations:
- **Temperature**: Shows classic thermocline structure with rapid decrease in upper 200m
- **Salinity**: Exhibits subsurface maximum around 150-200m depth (typical of subtropical waters)
- **Oxygen**: Displays oxygen minimum zone between 400-800m depth

<<MARKDOWN_TABLE_BEGIN>>
| Depth Layer | Temperature Range (°C) | Salinity Range (PSU) | Oxygen Range (μmol/kg) | Characteristics |
|-------------|------------------------|----------------------|------------------------|-----------------|
| **Surface (0-50m)** | 26.8 - 28.5 | 34.2 - 34.8 | 265 - 280 | Mixed layer, high oxygen |
| **Thermocline (50-200m)** | 12.8 - 26.8 | 34.8 - 35.3 | 195 - 265 | Rapid temperature decline |
| **Intermediate (200-1000m)** | 3.2 - 12.8 | 34.5 - 35.1 | 132 - 195 | Oxygen minimum zone |
| **Deep (1000-2000m)** | 2.1 - 3.2 | 34.8 - 35.1 | 120 - 132 | Cold, stable waters |
<<MARKDOWN_TABLE_END>>

This profile represents typical conditions in the tropical Indian Ocean, showing the complex interplay between physical and biogeochemical processes that shape our ocean's structure.`,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
      } else if (userInput.includes('compare') || userInput.includes('table') || userInput.includes('summary')) {
        // Markdown table response
        botResponse = {
          id: Date.now() + 1,
          content: `Here's a comprehensive comparative analysis of global ocean basins with detailed oceanographic parameters:

## Global Ocean Basin Comparison

<<MARKDOWN_TABLE_BEGIN>>
| Ocean Basin | Surface Temp (°C) | Salinity (PSU) | Oxygen (μmol/kg) | Mixed Layer (m) | Chlorophyll (mg/m³) | pH | Area (10⁶ km²) |
|-------------|-------------------|----------------|------------------|-----------------|---------------------|----|--------------------|
| **North Atlantic** | 22.1 ± 8.5 | 36.1 ± 1.2 | 245.3 ± 45.2 | 73.2 ± 28.1 | 0.52 ± 0.31 | 8.05 | 41.5 |
| **South Atlantic** | 21.7 ± 6.8 | 36.4 ± 0.9 | 241.8 ± 38.7 | 67.5 ± 22.4 | 0.48 ± 0.28 | 8.08 | 40.3 |
| **North Pacific** | 20.8 ± 9.2 | 34.2 ± 1.8 | 233.6 ± 52.1 | 56.8 ± 31.5 | 0.31 ± 0.22 | 8.02 | 77.2 |
| **South Pacific** | 22.5 ± 7.1 | 35.3 ± 1.1 | 236.7 ± 41.3 | 65.1 ± 26.8 | 0.28 ± 0.19 | 8.06 | 85.1 |
| **Indian Ocean** | 27.2 ± 4.3 | 35.0 ± 1.4 | 222.5 ± 48.9 | 48.7 ± 19.2 | 0.42 ± 0.35 | 8.03 | 70.6 |
| **Southern Ocean** | 5.2 ± 3.8 | 34.1 ± 0.7 | 301.4 ± 28.5 | 92.6 ± 45.3 | 0.68 ± 0.52 | 8.12 | 20.3 |
| **Arctic Ocean** | -0.8 ± 2.1 | 32.8 ± 2.3 | 285.2 ± 35.1 | 15.3 ± 8.7 | 0.15 ± 0.12 | 8.18 | 14.1 |
<<MARKDOWN_TABLE_END>>

### Key Insights:

**🌡️ Temperature Patterns:**
- Indian Ocean: Warmest average (27.2°C) due to tropical location
- Arctic Ocean: Coldest (-0.8°C) with permanent ice cover
- Southern Ocean: Cold (5.2°C) but highly variable seasonally

**🧂 Salinity Distribution:**
- North Atlantic: Highest salinity (36.4 PSU) from evaporation
- Arctic Ocean: Lowest salinity (32.8 PSU) from freshwater input
- Pacific basins: Generally lower salinity than Atlantic

**💨 Oxygen Levels:**
- Southern Ocean: Highest oxygen (301.4 μmol/kg) from cold water solubility
- Indian Ocean: Lowest oxygen (222.5 μmol/kg) due to warm temperatures
- Arctic Ocean: High oxygen despite low temperatures

**🌊 Mixed Layer Dynamics:**
- Southern Ocean: Deepest mixing (92.6m) from strong winds
- Arctic Ocean: Shallowest mixing (15.3m) due to stratification
- Tropical regions: Generally shallower mixed layers

This analysis reveals the complex interplay between latitude, climate, and ocean circulation patterns that create distinct oceanographic signatures in each basin.`,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
      } else if (userInput.includes('data') || userInput.includes('download') || userInput.includes('export')) {
        // Raw data response
        botResponse = {
          id: Date.now() + 2,
          content: `I've prepared the oceanographic data you requested for further analysis.

Here is your data: [RAW_DATA_KEY:GLOBAL_ARGO_${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}]

This dataset contains temperature, salinity, and pressure measurements from global ARGO floats for the current month. You can download or analyze this data using external tools.`,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
      } else {
        // Default text response
        botResponse = {
          id: Date.now() + 3,
          content: `I'm analyzing your query about "${currentMessage}". As your ARGO float data assistant, I can help with oceanographic data analysis, visualizations, and insights. You can ask me to:

1. Plot temperature or salinity profiles for specific regions
2. Compare oceanographic data between different basins
3. Generate statistical summaries of ARGO float measurements
4. Provide raw data exports for further analysis

For best results, try specifying the region, time period, and type of analysis you're interested in.`,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
      }
      
      console.log('Bot response created:', botResponse); // Debug log
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
              
              {/* Thinking indicator */}
              {thinking && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      mb: 3,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      gap: 1
                    }}
                  >
                    {/* Bot Avatar */}
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'rgba(77, 171, 247, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        mt: 0.5,
                        p: 0.5
                      }}
                    >
                      <img 
                        src="/FloatLogo.png" 
                        alt="FloatChat Logo"
                        style={{ 
                          width: '20px', 
                          height: '20px',
                          objectFit: 'contain'
                        }}
                      />
                    </Box>
                    
                    <Box
                      sx={{
                        px: 3,
                        py: 2,
                        borderRadius: '25px',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        color: '#FFFFFF',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
                        backdropFilter: 'blur(10px)',
                        maxWidth: 'fit-content',
                        minHeight: '44px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.7)' }}>
                        Analyzing ocean data...
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              )}
              
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
