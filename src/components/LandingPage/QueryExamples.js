import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Chip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { Send, LocationOn, BarChart, CompareArrows, WaterfallChart } from '@mui/icons-material';

const QueryExample = ({ query, description, icon, delay, active, onClick }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 3,
          backdropFilter: 'blur(8px)',
          background: active 
            ? `linear-gradient(135deg, rgba(30, 136, 229, 0.2) 0%, rgba(0, 184, 212, 0.2) 100%)`
            : 'rgba(15, 23, 42, 0.5)',
          border: `1px solid ${active ? 'rgba(30, 136, 229, 0.4)' : 'rgba(255, 255, 255, 0.05)'}`,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: active ? 'scale(1.02)' : 'scale(1)',
          boxShadow: active ? '0 8px 32px rgba(0, 184, 212, 0.15)' : 'none',
        }}
      >
        <Box sx={{ 
          mr: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: '50%',
          flexShrink: 0,
          background: active 
            ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)` 
            : 'rgba(255, 255, 255, 0.1)',
        }}>
          {icon}
        </Box>
        
        <Box sx={{ flexGrow: 1 }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 500, 
              fontFamily: 'monospace',
              color: active ? theme.palette.primary.light : theme.palette.text.primary,
              mb: 0.5
            }}
          >
            {query}
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            {description}
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};

const ResponseVisual = ({ activeQuery }) => {
  const theme = useTheme();
  
  // Mock visualizations for each query type
  const renderVisual = () => {
    switch (activeQuery) {
      case 0:
        return (
          <Box sx={{ 
            height: 300, 
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 2,
            p: 2,
            border: '1px solid rgba(30, 136, 229, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
              Visualizing salinity profiles
            </Typography>
            <Box sx={{ 
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* Mock graph visualization */}
              <Box sx={{
                width: '100%',
                height: '80%',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '1px',
                  background: 'rgba(255, 255, 255, 0.2)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: '1px',
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.2)',
                },
              }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: `${20 + i * 15}%`,
                      width: '2px',
                      height: `${30 + Math.random() * 50}%`,
                      background: `linear-gradient(to top, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      borderRadius: '2px',
                    }}
                  />
                ))}
                <Box sx={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  color: theme.palette.text.secondary,
                  fontSize: '0.75rem',
                }}>
                  Equator, Mar 2023
                </Box>
              </Box>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              pt: 1,
            }}>
              <Chip 
                label="Depth: 0-2000m" 
                size="small" 
                sx={{ bgcolor: 'rgba(0, 184, 212, 0.2)', color: theme.palette.primary.light }}
              />
              <Chip 
                label="5 profiles found" 
                size="small" 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
              />
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ 
            height: 300, 
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 2,
            p: 2,
            border: '1px solid rgba(30, 136, 229, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
              BGC parameters comparison
            </Typography>
            <Box sx={{ 
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              {/* Mock visualization for comparing parameters */}
              <Box sx={{ 
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'flex-end',
                pt: 4,
                position: 'relative',
              }}>
                {['Oxygen', 'Chlorophyll', 'Nitrate', 'pH'].map((param, i) => (
                  <Box key={param} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '22%' }}>
                    <Box sx={{
                      width: '100%',
                      height: `${50 + Math.random() * 120}px`,
                      background: `linear-gradient(to top, ${theme.palette.primary.main}80, ${theme.palette.secondary.main}50)`,
                      borderRadius: '4px 4px 0 0',
                      position: 'relative',
                    }}>
                      <Box sx={{
                        width: '100%',
                        height: `${30 + Math.random() * 50}px`,
                        background: `linear-gradient(to top, ${theme.palette.primary.dark}80, ${theme.palette.primary.main}50)`,
                        position: 'absolute',
                        bottom: 0,
                        borderRadius: '0 0 0 0',
                      }} />
                    </Box>
                    <Typography variant="caption" sx={{ mt: 1, color: theme.palette.text.secondary, fontSize: '0.7rem' }}>
                      {param}
                    </Typography>
                  </Box>
                ))}
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '1px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem', transform: 'translateY(-50%)' }}>
                    6 months ago
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem', transform: 'translateY(-50%)' }}>
                    Today
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              pt: 1,
            }}>
              <Chip 
                label="Arabian Sea" 
                size="small" 
                sx={{ bgcolor: 'rgba(0, 184, 212, 0.2)', color: theme.palette.primary.light }}
              />
              <Chip 
                label="Jan-Jun 2023" 
                size="small" 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
              />
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ 
            height: 300, 
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 2,
            p: 2,
            border: '1px solid rgba(30, 136, 229, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
              Nearest ARGO floats map
            </Typography>
            <Box sx={{ 
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 1,
            }}>
              {/* Mock map visualization */}
              <Box sx={{
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(0, 30, 60, 0.9) 0%, rgba(0, 10, 20, 0.95) 100%)',
                position: 'relative',
              }}>
                {/* Ocean waves */}
                {[1, 2, 3, 4].map((i) => (
                  <Box 
                    key={i}
                    sx={{
                      position: 'absolute',
                      top: `${20 + i * 15}%`,
                      left: 0,
                      width: '100%',
                      height: '1px',
                      background: 'rgba(0, 184, 212, 0.1)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '1px',
                        background: 'rgba(0, 184, 212, 0.1)',
                        animation: `wave ${3 + i}s infinite ease-in-out`,
                      },
                      '@keyframes wave': {
                        '0%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(5px)' },
                        '100%': { transform: 'translateY(0)' },
                      },
                    }}
                  />
                ))}
                
                {/* Float markers */}
                {[
                  { x: 30, y: 40 }, 
                  { x: 50, y: 60 }, 
                  { x: 70, y: 35 }, 
                  { x: 40, y: 70 },
                  { x: 65, y: 55 }
                ].map((pos, i) => (
                  <Box
                    key={i}
                    sx={{
                      position: 'absolute',
                      top: `${pos.y}%`,
                      left: `${pos.x}%`,
                      width: i === 2 ? '12px' : '8px',
                      height: i === 2 ? '12px' : '8px',
                      borderRadius: '50%',
                      background: i === 2 
                        ? theme.palette.secondary.main 
                        : theme.palette.primary.main,
                      boxShadow: i === 2 
                        ? `0 0 10px ${theme.palette.secondary.main}` 
                        : `0 0 6px ${theme.palette.primary.main}`,
                      '&::after': i === 2 ? {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: `2px solid ${theme.palette.secondary.main}`,
                        animation: 'pulse 1.5s infinite',
                      } : {},
                      '@keyframes pulse': {
                        '0%': { transform: 'translate(-50%, -50%) scale(0.6)', opacity: 1 },
                        '100%': { transform: 'translate(-50%, -50%) scale(1.5)', opacity: 0 },
                      },
                    }}
                  />
                ))}
                
                {/* You are here marker */}
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  <LocationOn sx={{ color: '#ff4757', fontSize: '28px' }} />
                  <Typography variant="caption" sx={{ 
                    fontSize: '0.7rem', 
                    bgcolor: 'rgba(0,0,0,0.5)',
                    px: 1,
                    borderRadius: 1
                  }}>
                    Your location
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              pt: 1,
            }}>
              <Chip 
                label="5 floats found" 
                size="small" 
                sx={{ bgcolor: 'rgba(0, 184, 212, 0.2)', color: theme.palette.primary.light }}
              />
              <Chip 
                label="Radius: 100km" 
                size="small" 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
              />
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          backdropFilter: 'blur(8px)',
          background: 'rgba(0, 15, 30, 0.6)',
          border: '1px solid rgba(30, 136, 229, 0.2)',
        }}
      >
        <Box sx={{ mb: 3 }}>
          {renderVisual()}
        </Box>
        
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderRadius: 2,
          background: 'rgba(0, 10, 20, 0.5)',
          border: '1px solid rgba(30, 136, 229, 0.15)',
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.text.secondary,
              fontStyle: 'italic',
              flexGrow: 1
            }}
          >
            Ask FloatChat a question about oceanographic data...
          </Typography>
          <IconButton
            size="small"
            sx={{
              background: theme.palette.gradient.blue,
              color: 'white',
              '&:hover': {
                background: theme.palette.gradient.mixed,
              },
            }}
          >
            <Send fontSize="small" />
          </IconButton>
        </Box>
      </Paper>
    </motion.div>
  );
};

const QueryExamples = () => {
  const theme = useTheme();
  const [activeQuery, setActiveQuery] = useState(0);
  
  const queries = [
    {
      query: "Show me salinity profiles near the equator in March 2023",
      description: "Retrieves and visualizes salinity data from specific location and time",
      icon: <WaterfallChart sx={{ color: activeQuery === 0 ? '#fff' : theme.palette.text.secondary }} />,
    },
    {
      query: "Compare BGC parameters in the Arabian Sea for the last 6 months",
      description: "Compares biogeochemical data over time in a specific region",
      icon: <CompareArrows sx={{ color: activeQuery === 1 ? '#fff' : theme.palette.text.secondary }} />,
    },
    {
      query: "What are the nearest ARGO floats to this location?",
      description: "Finds and maps nearby floats based on coordinates",
      icon: <LocationOn sx={{ color: activeQuery === 2 ? '#fff' : theme.palette.text.secondary }} />,
    },
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
            Natural Language Queries
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
            Ask questions in plain language and get interactive visualizations instantly
          </Typography>
        </motion.div>
        
        <Grid container spacing={4}>
          <Grid xs={12} md={5}>
            <Box>
              {queries.map((query, index) => (
                <QueryExample 
                  key={index}
                  query={query.query}
                  description={query.description}
                  icon={query.icon}
                  delay={0.1 * index}
                  active={activeQuery === index}
                  onClick={() => setActiveQuery(index)}
                />
              ))}
            </Box>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.text.secondary, 
                  mt: 2, 
                  p: 2,
                  borderLeft: `3px solid ${theme.palette.primary.main}`,
                  bgcolor: 'rgba(30, 136, 229, 0.05)',
                }}
              >
                FloatChat understands complex queries about oceanographic data and provides meaningful visualizations to help researchers and policy makers make informed decisions.
              </Typography>
            </motion.div>
          </Grid>
          
          <Grid xs={12} md={7}>
            <ResponseVisual activeQuery={activeQuery} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Styled Grid component for responsive layouts
const Grid = ({ container, spacing, xs, md, lg, children, ...props }) => {
  const theme = useTheme();
  
  if (container) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: spacing ? `-${spacing * 4}px` : 0,
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
        padding: spacing ? `${spacing * 4}px` : 0,
        width: {
          xs: xs ? `${(xs / 12) * 100}%` : '100%',
          md: md ? `${(md / 12) * 100}%` : (xs ? `${(xs / 12) * 100}%` : '100%'),
          lg: lg ? `${(lg / 12) * 100}%` : (md ? `${(md / 12) * 100}%` : (xs ? `${(xs / 12) * 100}%` : '100%')),
        },
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default QueryExamples;
