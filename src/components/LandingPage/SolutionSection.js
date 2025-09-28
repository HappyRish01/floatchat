import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { 
  Code, 
  Storage, 
  Chat, 
  Analytics, 
  Map,
  DataObject
} from '@mui/icons-material';

const SolutionCard = ({ icon, title, description, index }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: 0.1 * index }}
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
          border: '1px solid rgba(30, 136, 229, 0.2)',
          transition: 'all 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: `0 8px 30px rgba(0, 184, 212, 0.2)`,
            background: 'rgba(15, 23, 42, 0.8)',
          }
        }}
      >
        <Box 
          sx={{ 
            width: 50, 
            height: 50, 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            mb: 2,
            boxShadow: `0 4px 20px rgba(0, 184, 212, 0.3)`,
          }}
        >
          {icon}
        </Box>
        
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
          {title}
        </Typography>
        
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, flexGrow: 1 }}>
          {description}
        </Typography>
      </Paper>
    </motion.div>
  );
};

const SolutionSection = () => {
  const theme = useTheme();
  
  const solutions = [
    {
      icon: <DataObject sx={{ color: '#fff' }} />,
      title: "Data Processing",
      description: "End-to-end pipeline to process ARGO NetCDF data and store it efficiently in relational (PostgreSQL) and vector databases (FAISS/Chroma)."
    },
    {
      icon: <Chat sx={{ color: '#fff' }} />,
      title: "Natural Language Interface",
      description: "Backend LLM system that translates natural language into database queries and generates responses using Retrieval-Augmented Generation (RAG)."
    },
    {
      icon: <Map sx={{ color: '#fff' }} />,
      title: "Interactive Visualizations",
      description: "Frontend dashboard with geospatial visualizations using Plotly, Leaflet, or Cesium, and tabular summaries to ASCII and NetCDF."
    },
    {
      icon: <Analytics sx={{ color: '#fff' }} />,
      title: "Intelligent Querying",
      description: "Chat interface that understands user intent and guides them through data discovery with queries like 'Show salinity profiles near the equator in March 2023'."
    },
    {
      icon: <Storage sx={{ color: '#fff' }} />,
      title: "Vector Database",
      description: "Uses vector databases like FAISS/Chroma to store metadata and summaries for efficient retrieval of relevant oceanographic information."
    },
    {
      icon: <Code sx={{ color: '#fff' }} />,
      title: "Extensible Architecture",
      description: "Designed for future extensibility to in-situ observations (BGC, glider, buoys) and satellite datasets beyond the initial Indian Ocean ARGO data."
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
            Our Solution
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
            FloatChat combines AI, databases, and visualizations to democratize access to oceanographic data through natural language.
          </Typography>
        </motion.div>
        
        <Grid container spacing={3}>
          {solutions.map((solution, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <SolutionCard 
                icon={solution.icon} 
                title={solution.title} 
                description={solution.description}
                index={index} 
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SolutionSection;
