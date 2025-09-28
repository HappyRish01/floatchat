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
  Send,
  Menu,
  ArrowUpward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import Message from '../Message/Message';

const ChatInterface = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [message, setMessage] = useState('');  // State for chat messages
  const [chatHistory, setChatHistory] = useState([]);  // State for chat history
  
  const messagesEndRef = useRef(null);
  const [thinking, setThinking] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Professional loading messages
  const loadingMessages = [
    'Searching...',
    'Diving deeper...',
    'Swimming through data...',
    'Analyzing patterns...',
    'Processing request...'
  ];
  
  // Animate typing text
  useEffect(() => {
    if (!thinking) return;
    
    let messageIndex = 0;
    setTypingText(loadingMessages[messageIndex]);
    
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setTypingText(loadingMessages[messageIndex]);
    }, 1500);
    
    return () => clearInterval(interval);
  }, [thinking]);

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
      
      const botResponse = {
        id: chatHistory.length + 2,
        content: `I'm your ocean data assistant. I can help you analyze and visualize oceanographic data. Please ask me about specific data, regions, or analyses you're interested in.`,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      
      setChatHistory(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [chatHistory, thinking]);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      position: 'relative',
      bgcolor: '#00050f',
      color: '#FFFFFF',
      overflowY: 'auto',
      paddingBottom: '100px'
    }}>
      {/* Header */}
      <Box sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 0,
        bgcolor: 'rgba(0, 5, 15, 0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': { 
                color: '#fff',
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <Menu />
          </IconButton>
          
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}  
            onClick={() => navigate('/')}
          >
            <Typography sx={{ fontSize: '1rem', fontWeight: 500 }}>
              <span style={{ color: '#4dabf7' }}>Float</span>
              <span style={{ color: '#ffffff' }}>Chat</span>
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ width: 40 }} />
      </Box>
      
      {/* Main content area with messages */}
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Left Sidebar with Queries */}
        <Box sx={{
          width: chatHistory.length === 0 ? '300px' : '0px',
          transition: 'width 0.3s ease',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {chatHistory.length === 0 && (
            <Box sx={{ 
              p: 3,
              height: '100%',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              scrollbarWidth: 'none',
            }}>
              
              {[
                "Plot temperature profile for the Arabian Sea",
                "Compare salinity in Pacific vs Atlantic Ocean", 
                "Show me data from Bay of Bengal for March 2023",
                "Analyze oxygen levels in the Southern Ocean"
              ].map((query, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                  style={{ 
                    marginBottom: '16px',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Query clicked:', query);
                    
                    // Set the query text in the input box
                    setMessage(query);
                  }}
                >
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: '12px',
                      border: '1px solid rgba(77, 171, 247, 0.3)',
                      backgroundColor: 'rgba(0, 5, 15, 0.6)',
                      backdropFilter: 'blur(10px)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        backgroundColor: 'rgba(77, 171, 247, 0.15)',
                        borderColor: 'rgba(77, 171, 247, 0.6)',
                        boxShadow: '0 8px 25px rgba(77, 171, 247, 0.25)',
                        '& .query-text': {
                          color: 'rgba(255, 255, 255, 1)',
                        }
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(77, 171, 247, 0.1), transparent)',
                        transition: 'left 0.5s ease',
                      },
                      '&:hover::before': {
                        left: '100%',
                      }
                    }}
                  >
                    <Typography
                      className="query-text"
                      sx={{
                        fontFamily: 'Monaco, "Courier New", monospace',
                        fontSize: '12px',
                        color: 'rgba(77, 171, 247, 0.9)',
                        lineHeight: 1.4,
                        letterSpacing: '0.5px',
                        position: 'relative',
                        zIndex: 1,
                        transition: 'color 0.3s ease',
                        '&::before': {
                          content: '">"',
                          color: 'rgba(0, 255, 255, 0.7)',
                          marginRight: '8px',
                          fontWeight: 'bold'
                        }
                      }}
                    >
                      {query}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          )}
        </Box>
        
        {/* Overlay Sidebar */}
        <Box sx={{
          position: 'absolute',
          left: sidebarOpen ? 0 : '-320px',
          top: 0,
          width: '320px',
          height: '100%',
          bgcolor: 'rgba(0, 5, 15, 0.95)',
          backdropFilter: 'blur(20px)',
          transition: 'left 0.3s ease',
          zIndex: 1000,
          p: 3,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          scrollbarWidth: 'none',
        }}>
          <Typography sx={{ 
            color: '#4dabf7', 
            fontSize: '18px', 
            fontWeight: 600, 
            mb: 3 
          }}>
            Navigation
          </Typography>
          <Typography sx={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            fontSize: '14px' 
          }}>
            Sidebar content goes here...
          </Typography>
        </Box>
        
        {/* Main Chat Area */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          px: 2,
          overflow: 'hidden'
        }}>
          <Box sx={{ 
            width: '100%',
            maxWidth: '768px',
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 180px)',
            overflow: 'hidden'
          }}>
            {/* Welcome message */}
            {chatHistory.length === 0 && (
              <Box sx={{ 
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1
              }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <img 
                    src="/Float.png" 
                    alt="Float Logo"
                    style={{ 
                      maxWidth: '200px',
                      height: 'auto',
                      marginBottom: '16px'
                    }}
                  />
                </motion.div>
              </Box>
            )}
          
          {/* Messages */}
          {chatHistory.length > 0 && (
            <Box sx={{ 
              flex: 1,
              py: 2,
              px: 2,
              overflowY: 'auto',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              scrollbarWidth: 'none',
            }}>
              {chatHistory.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginBottom: '24px' }}
                >
                  <Message message={msg} />
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {thinking && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 0',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}
                >
                  <Box sx={{
                    display: 'flex',
                    gap: '4px'
                  }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#4dabf7'
                        }}
                      />
                    ))}
                  </Box>
                  <motion.span
                    key={typingText}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: '14px' }}
                  >
                    {typingText}
                  </motion.span>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </Box>
          )}
          </Box>
        </Box>
      </Box>

      {/* Input area */}
      <Box sx={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'rgba(0, 5, 15, 0.95)',
        backdropFilter: 'blur(20px)',
        p: 3,
        zIndex: 1000
      }}>
        <Box sx={{ 
          maxWidth: '768px',
          mx: 'auto'
        }}>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.2s ease',
              '&:focus-within': {
                borderColor: 'rgba(77, 171, 247, 0.5)',
                boxShadow: '0 0 0 3px rgba(77, 171, 247, 0.1)',
              },
            }}
          >
            <TextField
              fullWidth
              multiline
              maxRows={4}
              variant="standard"
              placeholder="Message FloatChat..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                '& .MuiInput-root': {
                  border: 'none',
                  '&:before': { display: 'none' },
                  '&:after': { display: 'none' },
                },
                '& .MuiInputBase-input': {
                  color: '#fff',
                  fontSize: '16px',
                  lineHeight: '24px',
                  padding: '16px 20px',
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.4)',
                    opacity: 1
                  }
                }
              }}
            />
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'absolute',
                right: '8px',
                bottom: '8px'
              }}
            >
              <IconButton 
                type="submit"
                disabled={!message.trim()}
                sx={{
                  width: '32px',
                  height: '32px',
                  bgcolor: message.trim() ? '#4dabf7' : 'rgba(255, 255, 255, 0.1)',
                  color: message.trim() ? '#000' : 'rgba(255, 255, 255, 0.4)',
                  '&:hover': {
                    bgcolor: message.trim() ? '#3b9ae0' : 'rgba(255, 255, 255, 0.15)',
                  },
                  '&:disabled': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    color: 'rgba(255, 255, 255, 0.3)'
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ArrowUpward sx={{ fontSize: '18px' }} />
              </IconButton>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatInterface;
