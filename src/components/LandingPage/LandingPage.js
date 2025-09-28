import React, { useEffect, useState } from 'react';
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

// Features array removed

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Track scroll position to control gradient opacity and apply scroll-snap to the document
  useEffect(() => {
    // Apply scroll snap to the HTML element for better performance
    document.documentElement.style.scrollSnapType = 'y mandatory';
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.overflowY = 'scroll';
    
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clean up styles when component unmounts
      document.documentElement.style.scrollSnapType = '';
      document.documentElement.style.scrollBehavior = '';
      document.body.style.overflowY = '';
    };
  }, []);
  
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

  const scrollToNext = () => {
    const currentPosition = window.scrollY;
    const nextPosition = currentPosition + window.innerHeight;
    window.scrollTo({
      top: nextPosition,
      behavior: 'smooth'
    });
  };

  const navigateToChat = () => {
    navigate('/chat');
  };

  return (
    <Box sx={{ 
      overflowX: 'hidden',
      position: 'relative',
      height: '250vh', // Extended to accommodate additional page
      // Scroll snapping is now handled at the document level for better performance
    }}>
      {/* Fixed background image that stays during scrolling */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -2,
          backgroundImage: 'url(/ArgoFinalle.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
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
          minHeight: '300vh', // Extended for additional page
          zIndex: 10,
          // Create a seamless gradient background that transitions from transparent to dark and extends further
          background: 'linear-gradient(to bottom, rgba(0, 20, 40, 0.2) 0%, rgba(0, 20, 40, 0.4) 5%, rgba(0, 15, 35, 0.6) 20%, rgba(0, 10, 25, 0.8) 40%, rgba(0, 5, 15, 1) 60%, rgba(0, 5, 15, 1) 100%)',
          // Add a continuous glass effect
          backdropFilter: 'blur(5px)',
          // Remove borders or any hard edges
          border: 'none',
          boxShadow: 'none',
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
                color: '#4dabf7', /* Changed from #003366 to #4dabf7 */
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
                color: '#003366', /* Changed from #4dabf7 to #003366 */
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
            mb: 3,
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
        {/* Features Grid removed */}
        </Box>

      {/* Data Visualization Preview Section - Moved Up */}
      <Box
        sx={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: 4, md: 8 },
          paddingTop: { xs: 0, md: 0 },
          scrollSnapAlign: 'start',
          position: 'relative',
          overflow: 'hidden',
          marginTop: '-100px'
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

          <Grid container spacing={2} sx={{ mt: 4 }}>
            {/* Main content area - left side */}
            <Grid item xs={12} md={8}>
              <Box sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ maxWidth: '600px' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Typography variant="h4" sx={{ mb: 3, color: '#fff', fontWeight: 500 }}>
                      Explore Ocean Data with AI
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.7 }}>
                      Analyze ARGO float data using natural language queries. Get insights on temperature, salinity, and oceanographic parameters with our powerful visualization tools.
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForward />}
                      onClick={navigateToChat}
                      sx={{
                        background: 'linear-gradient(45deg, #00b4d8, #0077b6)',
                        color: '#fff',
                        px: 4,
                        py: 1.5,
                        borderRadius: '30px',
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        boxShadow: '0 4px 20px rgba(0, 180, 216, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #0096c7, #023e8a)',
                          boxShadow: '0 6px 25px rgba(0, 180, 216, 0.4)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Start Exploring
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            </Grid>

            {/* Cards stack - right side */}
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Interactive Map Card - Top */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card 
                  sx={{ 
                    backgroundColor: 'rgba(30, 30, 30, 0.7)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(0, 180, 216, 0.2)',
                    height: '220px', // Increased height
                    width: '100%',
                    maxWidth: '320px', // Increased width
                    marginLeft: 'auto', // Push to the right side
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 16px rgba(0, 180, 216, 0.3)',
                      borderColor: 'rgba(0, 180, 216, 0.4)',
                    }
                  }}
                >
                  <Box sx={{ height: '100%' }}>
                    
                    {/* Interactive map image with hover effects */}
                    <Box 
                      component="a" 
                      href="https://incois.gov.in/OON/index.jsp" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      sx={{ 
                        height: '100%',
                        width: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        display: 'block',
                        '&:hover .mapImage': {
                          transform: 'scale(1.05)',
                        },
                        '&:hover .viewOverlay': {
                          opacity: 1,
                        }
                      }}
                    >
                      <Box
                        className="mapImage"
                        component="img"
                        src="/Map.png"
                        alt="ARGO Interactive Map"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                        }}
                      />
                      <Box 
                        className="viewOverlay"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        }}
                      >
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 500 }}>
                          View
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          {/* Button removed as it's now on the left side */}
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
      
      {/* Additional Page Section - Content to be added later */}
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
                background: 'linear-gradient(90deg, #4dabf7, #00b4d8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                width: '100%',
              }}
            >
              New Section Coming Soon
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
              Additional content will be added here
            </Typography>
          </motion.div>
        </Container>
      </Box>
      </Box>
    </Box>
  );
};


// Feature Box Component
const FeatureBox = ({ icon, title, description, delay }) => {
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
