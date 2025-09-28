import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { TrendingUp, Storage, QueryStats, Visibility } from '@mui/icons-material';

const IconBox = ({ icon, title, description, delay }) => {
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
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Box 
            sx={{ 
              mr: 2, 
              p: 1.5, 
              borderRadius: '12px', 
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`, 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {description}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

const ProblemSection = () => {
  const theme = useTheme();
  
  const problemPoints = [
    {
      icon: <TrendingUp sx={{ color: '#fff' }} />,
      title: "Complex Data",
      description: "Oceanographic data from ARGO floats is vast, complex, and heterogeneous - spanning satellite observations to in-situ measurements like CTD casts, ARGO floats, and BGC sensors."
    },
    {
      icon: <Storage sx={{ color: '#fff' }} />,
      title: "Specialized Formats",
      description: "ARGO program deploys autonomous profiling floats across oceans, generating extensive datasets in NetCDF format containing temperature, salinity, and other ocean variables."
    },
    {
      icon: <QueryStats sx={{ color: '#fff' }} />,
      title: "Technical Barriers",
      description: "Accessing, querying, and visualizing this data requires domain knowledge, technical skills, and familiarity with complex formats and tools."
    },
    {
      icon: <Visibility sx={{ color: '#fff' }} />,
      title: "Limited Accessibility",
      description: "Traditional oceanographic data access tools are difficult for non-technical users, limiting the reach and impact of valuable ocean data."
    }
  ];

  return (
    <Box sx={{ py: 10, position: 'relative', zIndex: 2 }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Typography 
            variant="h3" 
            className="gradient-text"
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              textAlign: 'center'
            }}
          >
            The Challenge
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              color: theme.palette.text.secondary, 
              mb: 6, 
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            Oceanographic data is crucial for understanding our planet, but its complexity creates barriers for researchers, policymakers, and the general public.
          </Typography>
        </motion.div>
        
        <Grid container spacing={3}>
          {problemPoints.map((point, index) => (
            <Grid item xs={12} md={6} key={index}>
              <IconBox 
                icon={point.icon} 
                title={point.title} 
                description={point.description}
                delay={index * 0.1} 
              />
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Box 
            sx={{ 
              mt: 6, 
              p: 4, 
              borderRadius: 4,
              border: '1px solid rgba(30, 136, 229, 0.2)',
              background: 'rgba(10, 25, 41, 0.5)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600, 
                mb: 2,
                color: theme.palette.primary.light,
              }}
            >
              Introducing FloatChat
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
              FloatChat bridges the gap between complex oceanographic data and users by leveraging AI and natural language processing. Our solution makes ARGO float data accessible through simple conversations, enabling everyone from scientists to policymakers to explore ocean data without technical barriers.
            </Typography>
            
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              With the rise of AI and Large Language Models (LLMs), especially when combined with structured databases and interactive dashboards, we've created an intuitive system that democratizes access to ocean data.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProblemSection;
