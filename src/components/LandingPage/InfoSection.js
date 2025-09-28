import React from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { Waves, Science, DataObject, Analytics } from '@mui/icons-material';

const FeatureCard = ({ icon, title, description, delay }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay }}
    >
      <Paper
        elevation={0}
        className="glass-effect"
        sx={{
          p: 3,
          height: '100%',
          borderRadius: 4,
          backdropFilter: 'blur(8px)',
          background: 'rgba(15, 23, 42, 0.6)',
          borderLeft: `3px solid ${theme.palette.primary.main}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: `0 8px 30px rgba(0, 184, 212, 0.2)`,
            background: 'rgba(15, 23, 42, 0.8)',
          }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%' 
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2 
          }}>
            <Box sx={{ 
              mr: 2, 
              p: 1.5, 
              borderRadius: '12px', 
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`, 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {icon}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, flexGrow: 1 }}>
            {description}
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};

const InfoSection = () => {
  const theme = useTheme();
  
  const features = [
    { 
      icon: <Waves sx={{ color: '#fff', fontSize: 28 }} />, 
      title: 'Ocean Data Analysis', 
      description: 'Dive deep into marine datasets with our advanced AI tools designed specifically for oceanographic research.'
    },
    { 
      icon: <Science sx={{ color: '#fff', fontSize: 28 }} />, 
      title: 'Scientific Insights', 
      description: 'Extract meaningful insights from complex ocean data patterns to support marine science and climate research.'
    },
    { 
      icon: <DataObject sx={{ color: '#fff', fontSize: 28 }} />, 
      title: 'Data Visualization', 
      description: 'Transform raw ocean data into beautiful, interactive visualizations that reveal hidden patterns and trends.'
    },
    { 
      icon: <Analytics sx={{ color: '#fff', fontSize: 28 }} />, 
      title: 'Predictive Models', 
      description: 'Utilize machine learning algorithms to forecast marine conditions and support conservation efforts.'
    },
  ];

  return (
    <Box 
      sx={{
        py: 8,
        position: 'relative',
        zIndex: 2,
        background: 'transparent',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <Typography 
            variant="h3" 
            align="center"
            className="gradient-text"
            sx={{ 
              mb: 1,
              fontWeight: 700,
            }}
          >
            Explore the Depths
          </Typography>
          <Typography 
            variant="h6"
            align="center"
            sx={{ 
              mb: 6,
              color: theme.palette.text.secondary,
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            FloatChat uses cutting-edge AI to make complex ocean data accessible and understandable
          </Typography>
        </motion.div>
        
        {/* Feature Cards */}
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            </Grid>
          ))}
        </Grid>
        
        {/* Tech Section */}
        <Box sx={{ mt: 10, mb: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h4" 
              align="center"
              className="gradient-text"
              sx={{ 
                mb: 1,
                fontWeight: 600,
              }}
            >
              Powered by Advanced Technology
            </Typography>
          </motion.div>
          
          <Box sx={{ 
            mt: 4, 
            p: 3, 
            borderRadius: 4, 
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Marine Data Processing
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                    FloatChat leverages sophisticated neural networks trained on vast oceanographic datasets to interpret and analyze marine information.
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    Our AI models understand complex relationships between ocean temperature, salinity, currents, and ecosystems to provide comprehensive insights.
                  </Typography>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(30, 136, 229, 0.3)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0.1,
                        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cg fill='%231E88E5' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h20v20H0V0zm1 1v18h18V1H1z'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        color: theme.palette.primary.light,
                      }}
                    >
                      {`{`}<br/>
                      {`  "model": "ocean-gpt-v2",`}<br/>
                      {`  "parameters": {`}<br/>
                      {`    "depth_analysis": true,`}<br/>
                      {`    "marine_ecosystems": true,`}<br/>
                      {`    "climate_patterns": true`}<br/>
                      {`  },`}<br/>
                      {`  "capabilities": [`}<br/>
                      {`    "data_visualization",`}<br/>
                      {`    "predictive_modeling",`}<br/>
                      {`    "pattern_recognition"`}<br/>
                      {`  ]`}<br/>
                      {`}`}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default InfoSection;
