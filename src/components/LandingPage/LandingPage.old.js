import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box, Typography, Container, IconButton, Button, Grid, Card, CardContent, TextField, InputAdornment, Divider, Chip } from '@mui/material';
import { KeyboardArrowDown, Search, Public, Timeline, TableChart, Chat, ArrowForward, Explore, DataUsage, CloudDownload } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Sample data for demonstration
const sampleQueries = [
  "Show me salinity profiles near the equator in March 2023",
  "Compare BGC parameters in the Arabian Sea for the last 6 months",
  "What are the nearest ARGO floats to this location?",
  "Display temperature anomalies in the Pacific Ocean"
];

const features = [
  {
    icon: <Public sx={{ fontSize: 40, color: '#00b4d8' }} />,
    title: "Interactive Map",
    description: "Explore ARGO float locations and trajectories with our interactive map interface.",
    color: "#00b4d8"
  },
  {
    icon: <Timeline sx={{ fontSize: 40, color: '#90e0ef' }} />,
    title: "Data Visualization",
    description: "Generate time-depth plots, temperature/salinity profiles, and comparative analyses.",
    color: "#90e0ef"
  },
  {
    icon: <TableChart sx={{ fontSize: 40, color: '#48cae4' }} />,
    title: "Data Export",
    description: "Export data in multiple formats including NetCDF and ASCII for further analysis.",
    color: "#48cae4"
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollTimeout = useRef(null);
  const rafId = useRef(null);
  const lastScrollY = useRef(0);
  
  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      
      // Only update state if scroll position changed significantly
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        lastScrollY.current = currentScrollY;
        
        // Throttle state updates
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        
        scrollTimeout.current = setTimeout(() => {
          setScrollPosition(currentScrollY);
        }, 16); // ~60fps
      }
    });
  }, []);
  
  // Set up scroll listener with passive: true for better performance
  useEffect(() => {
    const scrollOptions = { passive: true };
    window.addEventListener('scroll', handleScroll, scrollOptions);
    
    // Initial scroll position
    setScrollPosition(window.scrollY);
    
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      window.removeEventListener('scroll', handleScroll, scrollOptions);
    };
  }, [handleScroll]);
  
  const [activeQuery, setActiveQuery] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate sample queries
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setActiveQuery((prev) => (prev + 1) % sampleQueries.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const navigateToChat = () => {
    navigate('/chat');
  };

  return (
    <Box sx={{ 
      overflowX: 'hidden',
      position: 'relative',
      height: '200vh', // Reduced to 200vh since we only have two sections now
      // Scroll snapping is now handled at the document level for better performance
    }}>
      {/* Main content container */}
      <Box>
        {/* Main content will go here */}
        {/* Fixed background image that stays during scrolling */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -2,
          willChange: 'transform', // Hint to browser for optimization
          transform: 'translateZ(0)', // Force hardware acceleration
          backfaceVisibility: 'hidden', // Improve performance on mobile
          backgroundImage: 'url(/ArgoFinalle.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          imageRendering: '-webkit-optimize-contrast', // Improve image rendering
          WebkitBackfaceVisibility: 'hidden', // For Safari
          WebkitTransform: 'translateZ(0)', // For Safari
        }}
      />

      {/* Glass overlay that changes with scroll - starts transparent, becomes darker */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(to bottom, 
            rgba(0,40,60,0) 0%, 
            rgba(0,40,60,${Math.min(0.3, scrollPosition / 1000)}) 30%, 
            rgba(0,30,50,${Math.min(0.6, scrollPosition / 800)}) 60%, 
            rgba(0,20,40,${Math.min(0.9, scrollPosition / 600)}) 100%)`,
          backdropFilter: `blur(${Math.min(5, scrollPosition / 200)}px)`,
          zIndex: 0,
          transition: 'background 0.3s ease',
        }}
      />
      
      {/* Left side gradient overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: { xs: '100%', md: '70%', lg: '65%' },
          height: '100vh',
          background: 'linear-gradient(90deg, rgba(0,40,60,0.95) 0%, rgba(0,40,60,0.85) 40%, rgba(0,40,60,0.6) 70%, rgba(0,40,60,0) 100%)',
          backdropFilter: 'blur(3px)',
          zIndex: 1,
        }}
      />
      
      
      {/* Seamless scrollable content area */}
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          left: 0,
          width: '100%',
          minHeight: '200vh',
          zIndex: 10,
          willChange: 'transform', // Optimize for animations
          // Optimized gradient with fewer color stops
          background: 'linear-gradient(to bottom, rgba(0, 20, 40, 0.2) 0%, rgba(0, 15, 35, 0.5) 30%, rgba(0, 5, 15, 0.9) 100%)',
          // Optimized backdrop filter
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)', // For Safari
          // Remove borders or any hard edges
          border: 'none',
          boxShadow: 'none',
          // Optimize for GPU rendering
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: 1000,
          WebkitFontSmoothing: 'subpixel-antialiased',
        }}
      >
        {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: { xs: 4, md: 8, lg: 12 },
          scrollSnapAlign: 'start',
          position: 'relative',
          maxWidth: { md: '60%' },
        }}
      >
        {/* Logo and Tagline */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ mb: 6 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '3.5rem', sm: '4.2rem', md: '5.5rem' },
                fontWeight: 300,
                color: '#003366',
                letterSpacing: '0.01em',
                fontFamily: '"Poppins", "Montserrat", "Roboto", sans-serif',
                lineHeight: 1,
              }}
            >
              Float
            </Typography>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '3.5rem', sm: '4.2rem', md: '5.5rem' },
                fontWeight: 300,
                color: '#4dabf7',
                letterSpacing: '0.01em',
                fontFamily: '"Poppins", "Montserrat", "Roboto", sans-serif',
                lineHeight: 1,
              }}
            >
              Chat
            </Typography>
          </Box>
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#90e0ef',
              fontWeight: 300,
              mb: 3,
              maxWidth: '80%',
              lineHeight: 1.3
            }}
          >
            AI-Powered ARGO Ocean Data Explorer
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              mb: 4,
              maxWidth: '90%',
              fontSize: '1.1rem',
              lineHeight: 1.6
            }}
          >
            Explore and analyze oceanographic data with natural language queries. 
            Get instant insights from ARGO float data with the power of AI.
          </Typography>
        </Box>

        {/* Search Bar with Animated Queries */}
        <Box 
          sx={{ 
            width: '100%',
            maxWidth: '800px',
            mb: 6,
            position: 'relative',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ask about ocean data..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#4dabf7' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button 
                      variant="contained" 
                      color="primary"
                      endIcon={<ArrowForward />}
                      onClick={navigateToChat}
                      sx={{ 
                        borderRadius: '20px',
                        px: 3,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 500,
                        background: 'linear-gradient(45deg, #4dabf7 0%, #1976d2 100%)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(77, 171, 247, 0.4)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Explore Data
                    </Button>
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '30px',
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid rgba(77, 171, 247, 0.5)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #4dabf7',
                    boxShadow: '0 0 0 2px rgba(77, 171, 247, 0.2)',
                  },
                  height: '60px',
                  fontSize: '1.1rem',
                  paddingRight: '16px',
                },
              }}
              value={sampleQueries[activeQuery]}
              onChange={() => {}}
              sx={{ width: '100%' }}
            />
            <Box sx={{ mt: 2, ml: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip 
                icon={<Explore fontSize="small" />} 
                label="Try: Salinity profiles" 
                size="small" 
                sx={{ 
                  backgroundColor: 'rgba(0, 119, 182, 0.2)', 
                  color: '#90e0ef',
                  '& .MuiChip-icon': { color: '#4dabf7' }
                }} 
              />
              <Chip 
                icon={<DataUsage fontSize="small" />} 
                label="Try: Temperature trends" 
                size="small" 
                sx={{ 
                  backgroundColor: 'rgba(0, 119, 182, 0.2)', 
                  color: '#90e0ef',
                  '& .MuiChip-icon': { color: '#4dabf7' }
                }} 
              />
            </Box>
          </motion.div>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={3} sx={{ mt: 4, mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card 
                  sx={{ 
                    backgroundColor: 'rgba(30, 30, 30, 0.7)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 10px 20px rgba(0, 0, 0, 0.3)`,
                      borderColor: feature.color,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ color: '#fff', mb: 1, fontWeight: 500 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Scroll indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 20, md: 40 },
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 5,
          }}
        >
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
          </motion.div>
        </Box>

      {/* Data Visualization Preview Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: 4, md: 8 },
          scrollSnapAlign: 'start',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                color: '#FFFFFF',
                mb: 2,
                textAlign: 'center',
                fontWeight: 600,
                fontSize: { xs: '2rem', md: '3rem' },
                background: 'linear-gradient(90deg, #90e0ef, #4dabf7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                width: '100%',
              }}
            >
              Ocean Data, Simplified
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 6,
                textAlign: 'center',
                fontWeight: 300,
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Powerful tools to explore and understand oceanographic data
            </Typography>
          </motion.div>

          <Grid container spacing={3} sx={{ mt: 2, justifyContent: 'center' }}>
            {/* Interactive Map Explorer Card */}
            <Grid item xs={12} md={5} sx={{ display: 'flex' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{ width: '100%' }}
              >
                <Card 
                  sx={{ 
                    backgroundColor: 'rgba(30, 30, 30, 0.7)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '14px',
                    border: '1px solid rgba(0, 180, 216, 0.2)',
                    height: '100%',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 25px rgba(0, 180, 216, 0.15)',
                      borderColor: 'rgba(0, 180, 216, 0.3)',
                    }
                  }}
                >
                  <Box sx={{ p: 2, borderBottom: '1px solid rgba(0, 180, 216, 0.1)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Public sx={{ 
                        color: '#00b4d8', 
                        mr: 1.2,
                        fontSize: 24,
                        backgroundColor: 'rgba(0, 180, 216, 0.1)',
                        p: 0.4,
                        borderRadius: '6px'
                      }} />
                      <Typography variant="subtitle1" sx={{ 
                        fontWeight: 600,
                        background: 'linear-gradient(90deg, #00b4d8, #90e0ef)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '1.05rem'
                      }}>
                        Interactive Map
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255, 255, 255, 0.65)',
                      pl: 4,
                      fontSize: '0.85rem',
                      lineHeight: 1.4
                    }}>
                      Visualize ARGO float locations and trajectories with interactive filtering.
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    flex: 1,
                    minHeight: '250px',
                    background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.15) 0%, rgba(0, 40, 60, 0.25) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <Box
                      component={motion.div}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                      sx={{
                        position: 'absolute',
                        width: '200%',
                        height: '200%',
                        background: 'radial-gradient(circle, rgba(0,180,216,0.1) 0%, rgba(0,0,0,0) 70%)',
                      }}
                    />
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255, 255, 255, 0.5)', 
                      zIndex: 1,
                      textAlign: 'center',
                      p: 2,
                      fontSize: '0.8rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      borderRadius: '6px',
                      border: '1px dashed rgba(255, 255, 255, 0.1)'
                    }}>
                      ARGO float visualization
                    </Typography>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
            
            {/* Data Analysis & Visualization Card */}
            <Grid item xs={12} md={5} sx={{ display: 'flex' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                style={{ width: '100%' }}
              >
                <Card 
                  sx={{ 
                    backgroundColor: 'rgba(30, 30, 30, 0.7)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '14px',
                    border: '1px solid rgba(144, 224, 239, 0.2)',
                    height: '100%',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 25px rgba(144, 224, 239, 0.15)',
                      borderColor: 'rgba(144, 224, 239, 0.3)',
                    }
                  }}
                >
                  <Box sx={{ p: 2, borderBottom: '1px solid rgba(144, 224, 239, 0.1)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Timeline sx={{ 
                        color: '#90e0ef', 
                        mr: 1.2,
                        fontSize: 24,
                        backgroundColor: 'rgba(144, 224, 239, 0.1)',
                        p: 0.4,
                        borderRadius: '6px'
                      }} />
                      <Typography variant="subtitle1" sx={{ 
                        fontWeight: 600,
                        background: 'linear-gradient(90deg, #90e0ef, #caf0f8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '1.05rem'
                      }}>
                        Data Analysis
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255, 255, 255, 0.65)',
                      pl: 4,
                      fontSize: '0.85rem',
                      lineHeight: 1.4
                    }}>
                      Generate time-series plots and comparative analyses with natural language queries.
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    flex: 1,
                    minHeight: '250px',
                    background: 'linear-gradient(135deg, rgba(0, 40, 60, 0.25) 0%, rgba(0, 119, 182, 0.15) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <Box
                      component={motion.div}
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                      sx={{
                        position: 'absolute',
                        width: '200%',
                        height: '200%',
                        background: 'radial-gradient(circle, rgba(144, 224, 239, 0.1) 0%, rgba(0,0,0,0) 70%)',
                      }}
                    />
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255, 255, 255, 0.5)', 
                      zIndex: 1,
                      textAlign: 'center',
                      p: 2,
                      fontSize: '0.8rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      borderRadius: '6px',
                      border: '1px dashed rgba(255, 255, 255, 0.1)'
                    }}>
                      Interactive charts & plots
                    </Typography>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ marginTop: '60px' }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="outlined"
                size="large"
                endIcon={<ArrowForward />}
                onClick={navigateToChat}
                sx={{
                  color: '#4dabf7',
                  borderColor: 'rgba(77, 171, 247, 0.5)',
                  borderRadius: '30px',
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: 'rgba(77, 171, 247, 0.1)',
                    borderColor: '#4dabf7',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Start Exploring with FloatChat
              </Button>
            </Box>
          </motion.div>
        </Container>

        {/* Animated background elements */}
        <Box 
          component={motion.div}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            position: 'absolute',
            top: '20%',
            right: '5%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(77,171,247,0.2) 0%, rgba(77,171,247,0) 70%)',
            zIndex: 1,
          }}
        />
        <Box 
          component={motion.div}
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          sx={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,180,216,0.15) 0%, rgba(0,180,216,0) 70%)',
            zIndex: 1,
          }}
        />
      </Box>
      </Box>
    </Box>
  );
};


// Feature Box Component
const FeatureBox = (props) => {
  const { icon, title, description, delay = 0 } = props;
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      sx={{
        backgroundColor: 'rgba(30, 30, 30, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
          borderColor: '#4dabf7',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 2 }}>{icon}</Box>
        <Typography variant="h6" sx={{ color: '#fff', mb: 1, fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          {description}
        </Typography>
      </CardContent>
    </Box>
  );
};

// Custom Icons
const AtomIcon = ({ color }) => (
  <Box sx={{ width: 24, height: 24, color }}>
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="12" cy="12" r="2" />
      <motion.path
        d="M12 2a10 10 0 0 0-6.88 17.23" 
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: 'center center' }}
        fill="none"
        stroke={color}
      />
      <motion.path
        d="M12 22a10 10 0 0 0 6.88-17.23" 
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: 'center center' }}
        fill="none"
        stroke={color}
      />
    </motion.svg>
  </Box>
);

const BrainIcon = ({ color }) => (
  <Box sx={{ width: 24, height: 24, color }}>
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 2 17.5v-10a2.5 2.5 0 0 1 4.96-.44A2.5 2.5 0 0 1 9.5 2Z"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44A2.5 2.5 0 0 0 22 17.5v-10a2.5 2.5 0 0 0-4.96-.44A2.5 2.5 0 0 0 14.5 2Z"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </motion.svg>
  </Box>
);

const CodeIcon = ({ color }) => (
  <Box sx={{ width: 24, height: 24, color }}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.polyline 
        points="16 18 22 12 16 6" 
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.polyline 
        points="8 6 2 12 8 18" 
        animate={{ x: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  </Box>
);

export default LandingPage;
