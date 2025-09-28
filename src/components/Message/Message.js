import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const OceanDataMessage = ({ message }) => {
  // Check for raw data reference
  const rawDataMatch = message.content.match(/\[RAW_DATA_KEY:(.*?)\]/);
  
  // Get clean text without the special markers
  let cleanText = message.content
    .replace(/<<PLOTLY_JSON_BEGIN>>[\s\S]*?<<PLOTLY_JSON_END>>/g, '')
    .replace(/<<MARKDOWN_TABLE_BEGIN>>[\s\S]*?<<MARKDOWN_TABLE_END>>/g, '')
    .replace(/\[RAW_DATA_KEY:(.*?)\]/g, '')
    .trim();
  
  return (
    <Box>
      {/* Regular text content */}
      {cleanText && (
        <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.5, mb: rawDataMatch ? 2 : 0 }}>
          {cleanText}
        </Typography>
      )}
      
      {/* Raw data reference if present */}
      {rawDataMatch && (
        <Box 
          sx={{ 
            p: 2, 
            backgroundColor: '#1E1E1E', 
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 2
          }}
        >
          <Typography sx={{ color: '#4E4FEB' }}>
            Raw Data Key: {rawDataMatch[1]}
          </Typography>
          <Button 
            variant="outlined" 
            size="small"
            sx={{ 
              color: '#4E4FEB', 
              borderColor: '#4E4FEB',
              '&:hover': { borderColor: '#5758F5', backgroundColor: 'rgba(78, 79, 235, 0.1)' }
            }}
          >
            View Data
          </Button>
        </Box>
      )}
    </Box>
  );
};

const Message = ({ message }) => {
  const isBot = message.sender === 'bot';
  const hasSpecialContent = 
    isBot && (
      message.content.includes('[RAW_DATA_KEY:')
    );
  
  return (
    <Box
      sx={{
        display: 'flex',
        mb: 3,
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        alignItems: 'flex-start',
        gap: 1
      }}
    >
      {/* Bot Avatar */}
      {isBot && (
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: 'rgba(77, 171, 247, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            mt: 0.5,
            p: 0.5
          }}
        >
          <img 
            src="/FloatLogo.png" 
            alt="FloatChat Logo"
            style={{ 
              width: '20px', 
              height: '20px',
              objectFit: 'contain'
            }}
          />
        </Box>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ 
          maxWidth: hasSpecialContent ? '85%' : '75%',
          width: hasSpecialContent ? '100%' : 'auto'
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
            borderRadius: '25px',
            backgroundColor: isBot 
              ? 'rgba(255, 255, 255, 0.08)' 
              : '#4dabf7',
            color: '#FFFFFF',
            border: isBot ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
            boxShadow: isBot 
              ? '0 2px 12px rgba(0, 0, 0, 0.15)' 
              : '0 2px 16px rgba(77, 171, 247, 0.4)',
            backdropFilter: isBot ? 'blur(10px)' : 'none',
            maxWidth: 'fit-content',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {hasSpecialContent ? (
            <OceanDataMessage message={message} />
          ) : (
            <Typography 
              sx={{ 
                fontSize: '15px', 
                lineHeight: 1.5,
                color: isBot ? 'rgba(255, 255, 255, 0.9)' : '#ffffff',
                fontWeight: isBot ? 400 : 500
              }}
            >
              {message.content}
            </Typography>
          )}
        </Box>
      </motion.div>
      
    </Box>
  );
};

export default Message;
