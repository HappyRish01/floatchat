import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const CentralLogo = () => {
  const theme = useTheme();
  
  // Animation variants for the logo elements
  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 1.2,
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  };
  
  // Create the connection "wires" that radiate from the central logo
  const createConnections = () => {
    const connections = [];
    const totalConnections = 12;
    
    for (let i = 0; i < totalConnections; i++) {
      const angle = (Math.PI * 2 / totalConnections) * i;
      const length = 80 + Math.random() * 40;
      
      connections.push(
        <motion.div
          key={`connection-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.3, 0.7, 0.3], 
            scale: 1,
            transition: {
              opacity: {
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.2
              },
              scale: {
                duration: 0.8,
                delay: 0.5 + i * 0.05
              }
            }
          }}
          style={{
            position: 'absolute',
            width: `${length}px`,
            height: '2px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
            transformOrigin: 'left center',
            transform: `rotate(${angle}rad)`,
            left: '50%',
            top: '50%',
            zIndex: 0
          }}
        />
      );
      
      // Add "nodes" at the end of some connections
      if (i % 3 === 0) {
        connections.push(
          <motion.div
            key={`node-${i}`}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.7, 1, 0.7],
              transition: {
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.1
              }
            }}
            style={{
              position: 'absolute',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: theme.palette.secondary.main,
              boxShadow: `0 0 8px ${theme.palette.secondary.main}`,
              transform: `translate(-50%, -50%) rotate(${angle}rad) translateX(${length}px)`,
              left: '50%',
              top: '50%',
              zIndex: 1
            }}
          />
        );
      }
    }
    
    return connections;
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: 240, md: 320 },
        height: { xs: 240, md: 320 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        my: 6
      }}
    >
      {/* Connection lines radiating from center */}
      {createConnections()}
      
      {/* Outer glowing circle */}
      <motion.div
        variants={pulseVariants}
        animate="animate"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(30, 136, 229, 0.2) 0%, rgba(13, 71, 161, 0) 70%)`,
          boxShadow: '0 0 60px rgba(30, 136, 229, 0.4)',
          zIndex: 1
        }}
      />
      
      {/* Middle circle with animation */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        style={{
          position: 'relative',
          width: '80%',
          height: '80%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2
        }}
      >
        {/* Inner glowing circle */}
        <motion.div
          variants={itemVariants}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(0, 184, 212, 0.3) 0%, rgba(13, 71, 161, 0.8) 100%)`,
            boxShadow: '0 0 30px rgba(0, 184, 212, 0.5)',
            backdropFilter: 'blur(5px)',
          }}
        />
        
        {/* Logo text */}
        <motion.div
          variants={itemVariants}
          style={{
            position: 'relative',
            zIndex: 3,
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h1" 
            className="gradient-text"
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              letterSpacing: '0.05em',
              textShadow: '0 0 20px rgba(0, 184, 212, 0.7)'
            }}
          >
            Float
          </Typography>
          <Typography 
            variant="h1" 
            className="gradient-text"
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              letterSpacing: '0.05em',
              textShadow: '0 0 20px rgba(0, 184, 212, 0.7)',
              mt: -2
            }}
          >
            Chat
          </Typography>
          
          {/* Tagline */}
          <motion.div
            variants={itemVariants}
            style={{ marginTop: '8px' }}
          >
            <Typography 
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                letterSpacing: '0.02em',
                mb: 1
              }}
            >
              ARGO Float Data AI
            </Typography>
          </motion.div>
          
          {/* Technical details */}
          <motion.div
            variants={itemVariants}
            style={{ marginTop: '8px' }}
          >
            <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Typography 
                variant="caption"
                sx={{ 
                  color: theme.palette.primary.light,
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                  bgcolor: 'rgba(30, 136, 229, 0.1)',
                  fontFamily: 'monospace',
                  border: '1px solid rgba(30, 136, 229, 0.2)'
                }}
              >
                NetCDF
              </Typography>
              
              <Typography 
                variant="caption"
                sx={{ 
                  color: theme.palette.secondary.light,
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                  bgcolor: 'rgba(0, 184, 212, 0.1)',
                  fontFamily: 'monospace',
                  border: '1px solid rgba(0, 184, 212, 0.2)'
                }}
              >
                LLM-RAG
              </Typography>
            </Box>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Orbiting particles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`particle-${i}`}
          animate={{
            rotate: 360,
            transition: {
              duration: 8 + i * 4,
              ease: 'linear',
              repeat: Infinity
            }
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 0,
            transform: `rotate(${i * 45}deg)`
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.5
              }
            }}
            style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? theme.palette.primary.main : theme.palette.secondary.main,
              boxShadow: `0 0 10px ${i % 2 === 0 ? theme.palette.primary.main : theme.palette.secondary.main}`,
              top: '0%',
              left: '50%',
              marginLeft: '-6px',
              marginTop: '-6px'
            }}
          />
        </motion.div>
      ))}
    </Box>
  );
};

export default CentralLogo;
