import React from 'react';
import { Box, Typography, Container, Grid, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { 
  Storage, 
  Chat, 
  Analytics, 
  DataObject, 
  QueryStats,
  Map as MapIcon
} from '@mui/icons-material';

const FeatureCard = ({ title, description, icon, index }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Paper
        elevation={0}
        sx={{
          height: '100%',
          p: 3,
          borderRadius: 2,
          background: 'rgba(0, 10, 15, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 120, 180, 0.15)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 30px rgba(0, 184, 212, 0.15)',
            background: 'rgba(15, 23, 42, 0.7)',
          }
        }}
      >
        <Box sx={{ 
          mb: 2, 
          display: 'flex',
          alignItems: 'center'
        }}>
          <Box sx={{ 
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 45,
            height: 45,
            borderRadius: '12px',
            background: theme.palette.gradient.blue,
          }}>
            {icon}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          {description}
        </Typography>
      </Paper>
    </motion.div>
  );
};

const QueryExample = ({ query, index }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.1 + (index * 0.1) }}
    >
      <Box
        sx={{
          p: 1.5,
          mb: 1,
          borderRadius: 2,
          background: 'rgba(0, 0, 10, 0.6)',
          border: '1px solid rgba(0, 120, 180, 0.2)',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: 'rgba(0, 30, 50, 0.6)',
          }
        }}
      >
        <Typography 
          variant="body2"
          sx={{ 
            fontFamily: 'monospace',
            color: theme.palette.primary.light,
          }}
        >
          {query}
        </Typography>
      </Box>
    </motion.div>
  );
};

const CombinedFeatures = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const features = [
    {
      title: "Data Processing",
      description: "Process ARGO NetCDF files into structured formats with our end-to-end pipeline",
      icon: <DataObject sx={{ color: '#fff' }} />
    },
    {
      title: "Natural Language Queries",
      description: "Ask questions about ocean data in plain language and get visual insights",
      icon: <Chat sx={{ color: '#fff' }} />
    },
    {
      title: "Interactive Visualizations",
      description: "Explore geospatial data with interactive maps and customizable charts",
      icon: <Analytics sx={{ color: '#fff' }} />
    },
    {
      title: "Vector Search",
      description: "Advanced similarity search through vector databases for fast information retrieval",
      icon: <QueryStats sx={{ color: '#fff' }} />
    },
    {
      title: "Geospatial Mapping",
      description: "Visualize ARGO float locations and track their movements over time",
      icon: <MapIcon sx={{ color: '#fff' }} />
    },
    {
      title: "Database Integration",
      description: "Seamless integration with PostgreSQL and vector databases like FAISS/Chroma",
      icon: <Storage sx={{ color: '#fff' }} />
    }
  ];
  
  const queries = [
    "Show me salinity profiles near the equator in March 2023",
    "Compare BGC parameters in the Arabian Sea for the last 6 months",
    "What are the nearest ARGO floats to this location?",
    "Plot temperature data at 1000m depth in the Indian Ocean"
  ];

  return (
    <Box 
      sx={{ 
        py: 8,
        position: 'relative',
        zIndex: 1,
        backgroundImage: 'linear-gradient(to bottom, rgba(0, 10, 20, 0), rgba(0, 10, 20, 0.6))',
      }}
    >
      <Container>
        <ResponsiveGrid container spacing={3}>
          {/* Left column - Features */}
          <ResponsiveGrid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography 
                variant="h3" 
                className="gradient-text"
                sx={{ fontWeight: 700, mb: 1 }}
              >
                Features
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  color: theme.palette.text.secondary,
                  mb: 4,
                  maxWidth: 500,
                }}
              >
                FloatChat combines multiple technologies to make ARGO float data accessible through natural language.
              </Typography>
            </motion.div>
            
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
            }}>
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  index={index}
                />
              ))}
            </Box>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Box 
                sx={{ 
                  mt: 4, 
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/chat')}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 3,
                    background: theme.palette.gradient.mixed,
                    '&:hover': {
                      background: theme.palette.gradient.blue,
                    }
                  }}
                >
                  Explore Now
                </Button>
              </Box>
            </motion.div>
          </ResponsiveGrid>
          
          {/* Right column - Example queries and visualization */}
          <ResponsiveGrid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography 
                variant="h4" 
                className="gradient-text"
                sx={{ fontWeight: 600, mb: 1 }}
              >
                Example Queries
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  mb: 3,
                }}
              >
                Ask questions in plain language to get insights from ARGO float data
              </Typography>
            </motion.div>
            
            <Box sx={{ mb: 4 }}>
              {queries.map((query, index) => (
                <QueryExample key={index} query={query} index={index} />
              ))}
            </Box>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Paper
                elevation={0}
                sx={{
                  overflow: 'hidden',
                  borderRadius: 2,
                  background: 'rgba(0, 0, 10, 0.7)',
                  border: '1px solid rgba(0, 120, 180, 0.2)',
                  height: { xs: '200px', md: '250px' },
                  position: 'relative',
                }}>
                {/* Ocean data visualization mockup */}
                <Box sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%',
                  background: 'linear-gradient(to bottom, rgba(0, 0, 10, 0.9) 0%, rgba(0, 20, 40, 0.8) 100%)',
                  backgroundImage: 'url("https://source.unsplash.com/1600x900/?ocean,waves")',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}>
                  {/* Ocean waves */}
                  {[1, 2, 3].map((i) => (
                    <motion.div 
                      key={i}
                      animate={{ 
                        y: [0, i * 2, 0],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 3 + (i * 0.5),
                        ease: 'easeInOut',
                      }}
                      style={{
                        position: 'absolute',
                        bottom: `${10 + (i * 20)}%`,
                        left: 0,
                        width: '100%',
                        height: '1px',
                        background: `rgba(0, 184, 212, ${0.1 + (i * 0.05)})`,
                        zIndex: 1,
                      }}
                    />
                  ))}
                  
                  {/* Chart mock */}
                  <Box sx={{ 
                    position: 'absolute', 
                    bottom: '20px', 
                    left: '20px', 
                    right: '20px',
                    height: '40%',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'flex-end',
                  }}>
                    {[...Array(10)].map((_, i) => (
                      <Box 
                        key={i} 
                        sx={{
                          flex: 1,
                          height: `${20 + Math.sin(i * 0.8) * 40 + Math.random() * 20}%`,
                          mx: 0.5,
                          background: `linear-gradient(to top, ${theme.palette.primary.main}80, ${theme.palette.secondary.main}20)`,
                          borderRadius: '2px 2px 0 0',
                        }}
                      />
                    ))}
                  </Box>
                  
                  {/* Label */}
                  <Box sx={{ position: 'absolute', top: '20px', left: '20px', zIndex: 2 }}>
                    <Typography variant="caption" sx={{ color: theme.palette.secondary.light, fontFamily: 'monospace' }}>
                      Temperature Profile
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </ResponsiveGrid>
        </ResponsiveGrid>
        
        {/* Technical summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box 
            sx={{ 
              mt: 8, 
              p: 3,
              borderRadius: 3,
              border: '1px solid rgba(30, 136, 229, 0.2)',
              background: 'rgba(0, 10, 30, 0.5)',
            }}
          >
            <Typography variant="h5" className="gradient-text" sx={{ mb: 1, fontWeight: 600 }}>
              Technical Stack
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {[
                'NetCDF Parser', 'PostgreSQL', 'FAISS/Chroma', 'LLMs (GPT, QWEN, LLaMA)', 
                'RAG Pipeline', 'Model Context Protocol', 'Plotly/Leaflet', 'SQL Generation'
              ].map((tech, i) => (
                <Box 
                  key={tech}
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: 'rgba(0, 30, 60, 0.5)',
                    border: '1px solid rgba(30, 136, 229, 0.15)',
                    fontSize: '0.8rem',
                    color: theme.palette.text.secondary,
                    fontFamily: 'monospace',
                  }}
                >
                  {tech}
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

// Styled Grid component for responsive layouts
const ResponsiveGrid = ({ container, item, spacing, xs, sm, md, lg, children, ...props }) => {
  const theme = useTheme();
  
  if (container) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          mx: spacing ? `-${spacing * 4}px` : 0,
          ...props.sx
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
  
  // For item
  return (
    <Box
      sx={{
        px: spacing ? `${spacing * 4}px` : 0,
        width: {
          xs: xs ? `${(xs / 12) * 100}%` : '100%',
          sm: sm ? `${(sm / 12) * 100}%` : (xs ? `${(xs / 12) * 100}%` : '100%'),
          md: md ? `${(md / 12) * 100}%` : (sm ? `${(sm / 12) * 100}%` : (xs ? `${(xs / 12) * 100}%` : '100%')),
          lg: lg ? `${(lg / 12) * 100}%` : (md ? `${(md / 12) * 100}%` : (sm ? `${(sm / 12) * 100}%` : (xs ? `${(xs / 12) * 100}%` : '100%'))),
        },
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default CombinedFeatures;
export { ResponsiveGrid };
