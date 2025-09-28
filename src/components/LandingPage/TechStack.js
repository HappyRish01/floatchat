import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const TechStack = () => {
  const theme = useTheme();
  
  const technologies = {
    "Database": [
      { name: "PostgreSQL", description: "Relational database for structured data storage" },
      { name: "FAISS/Chroma", description: "Vector database for efficient similarity search" }
    ],
    "Backend": [
      { name: "Multimodal LLMs", description: "GPT/QWEN/LLaMA/Mistral for natural language understanding" },
      { name: "RAG Pipeline", description: "Retrieval-Augmented Generation for accurate responses" },
      { name: "SQL Generation", description: "Dynamic query construction from natural language" }
    ],
    "Data Processing": [
      { name: "NetCDF Parser", description: "Processing ARGO NetCDF files into structured formats" },
      { name: "Parquet", description: "Columnar storage format for efficient data access" }
    ],
    "Visualization": [
      { name: "Plotly/Leaflet", description: "Interactive geospatial data visualization" },
      { name: "Streamlit/Dash", description: "Dashboard frameworks for data presentation" }
    ],
    "Infrastructure": [
      { name: "Model Context Protocol", description: "Integration with various LLM providers" },
      { name: "API Gateway", description: "Secure and efficient data access endpoints" }
    ]
  };

  const BlockTitle = ({ title }) => (
    <Typography 
      variant="h6" 
      sx={{ 
        fontWeight: 600, 
        mb: 1,
        position: 'relative',
        display: 'inline-block',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-4px',
          left: 0,
          width: '100%',
          height: '2px',
          background: theme.palette.gradient.blue,
        }
      }}
    >
      {title}
    </Typography>
  );
  
  const TechItem = ({ name, description, delay }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
    >
      <Box sx={{ 
        display: 'flex',
        alignItems: 'flex-start',
        mb: 1.5,
      }}>
        <Box 
          sx={{ 
            width: 8, 
            height: 8, 
            borderRadius: '50%', 
            bgcolor: theme.palette.primary.main,
            mt: 0.8,
            mr: 1.5,
            boxShadow: `0 0 8px ${theme.palette.primary.main}`,
          }}
        />
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
            {description}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
  
  const ArchitectureDiagram = () => (
    <Box sx={{ 
      position: 'relative',
      width: '100%',
      height: 400,
      mt: 4,
      mb: 6,
    }}>
      {/* Database Layer */}
      <Paper
        elevation={0}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '80px',
          borderRadius: 2,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(30, 136, 229, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600,
              color: theme.palette.primary.light,
            }}
          >
            PostgreSQL & Vector Database (FAISS/Chroma)
          </Typography>
        </motion.div>
      </Paper>
      
      {/* Backend Layer */}
      <Paper
        elevation={0}
        sx={{
          position: 'absolute',
          bottom: '100px',
          left: '5%',
          width: '90%',
          height: '100px',
          borderRadius: 2,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(30, 136, 229, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" sx={{ color: theme.palette.primary.light }}>
              LLM Processing
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              GPT/QWEN/LLaMA
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" sx={{ color: theme.palette.secondary.light }}>
              RAG Pipeline
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              Retrieval-Augmented Generation
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" sx={{ color: theme.palette.primary.light }}>
              SQL Generation
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              Natural Language → Queries
            </Typography>
          </Box>
        </motion.div>
      </Paper>
      
      {/* Data Processing Layer */}
      <Paper
        elevation={0}
        sx={{
          position: 'absolute',
          bottom: '220px',
          left: '15%',
          width: '70%',
          height: '80px',
          borderRadius: 2,
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(30, 136, 229, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600,
              color: theme.palette.secondary.light,
            }}
          >
            Data Processing: NetCDF → Structured Formats
          </Typography>
        </motion.div>
      </Paper>
      
      {/* Front-end Layer */}
      <Paper
        elevation={0}
        sx={{
          position: 'absolute',
          bottom: '320px',
          left: '25%',
          width: '50%',
          height: '60px',
          borderRadius: 2,
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(30, 136, 229, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 4,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600,
              color: '#fff',
              textShadow: '0 0 10px rgba(30, 136, 229, 0.5)',
            }}
          >
            ChatBot & Interactive Visualizations
          </Typography>
        </motion.div>
      </Paper>
      
      {/* Connecting Lines */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity="0.8" />
            <stop offset="100%" stopColor={theme.palette.secondary.main} stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* Vertical connection lines */}
        <motion.line
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          x1="50%" y1="350" x2="50%" y2="320"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        
        <motion.line
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          x1="50%" y1="300" x2="50%" y2="260"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        
        <motion.line
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          x1="50%" y1="220" x2="50%" y2="180"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        
        <motion.line
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          x1="50%" y1="160" x2="50%" y2="100"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        
        {/* Data flow animation */}
        <motion.circle
          initial={{ cy: 350 }}
          animate={{ cy: [350, 100, 350] }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          cx="50%"
          r="4"
          fill={theme.palette.secondary.main}
          filter={`drop-shadow(0 0 4px ${theme.palette.secondary.main})`}
        />
        
        <motion.circle
          initial={{ cy: 350 }}
          animate={{ cy: [350, 100, 350] }}
          transition={{ 
            duration: 4, 
            delay: 2,
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          cx="50%"
          r="4"
          fill={theme.palette.primary.main}
          filter={`drop-shadow(0 0 4px ${theme.palette.primary.main})`}
        />
      </svg>
    </Box>
  );

  return (
    <Box sx={{ py: 10, position: 'relative', zIndex: 2, background: 'rgba(0, 10, 20, 0.3)' }}>
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
            Technical Architecture
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
            FloatChat combines cutting-edge technologies to create a seamless experience
          </Typography>
        </motion.div>
        
        {/* Architecture Diagram */}
        <ArchitectureDiagram />
        
        {/* Technology Details */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            backdropFilter: 'blur(10px)',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(30, 136, 229, 0.2)',
          }}
        >
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' },
            gap: 4,
          }}>
            {Object.entries(technologies).map(([category, items], index) => (
              <Box key={category}>
                <BlockTitle title={category} />
                <Box sx={{ mt: 2 }}>
                  {items.map((item, itemIndex) => (
                    <TechItem 
                      key={item.name} 
                      name={item.name} 
                      description={item.description}
                      delay={0.1 * (index + itemIndex)}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default TechStack;
