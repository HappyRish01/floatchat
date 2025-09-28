import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
// NOTE: You'll need to install these packages:
// npm install plotly.js react-plotly.js react-markdown remark-gfm
import Plot from 'react-plotly.js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Component to render Plotly visualizations
const PlotlyVisualization = ({ plotData }) => {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: '400px', 
        my: 2,
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Plot
        data={plotData.data}
        layout={{
          ...plotData.layout,
          autosize: true,
          paper_bgcolor: '#1E1E1E',
          plot_bgcolor: '#1E1E1E',
          font: { color: '#FFFFFF' },
          margin: { l: 50, r: 20, t: 30, b: 50 },
          xaxis: {
            ...(plotData.layout?.xaxis || {}),
            gridcolor: 'rgba(255, 255, 255, 0.1)',
            zerolinecolor: 'rgba(255, 255, 255, 0.2)'
          },
          yaxis: {
            ...(plotData.layout?.yaxis || {}),
            gridcolor: 'rgba(255, 255, 255, 0.1)',
            zerolinecolor: 'rgba(255, 255, 255, 0.2)'
          }
        }}
        config={{ 
          responsive: true,
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToRemove: ['lasso2d', 'select2d']
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  );
};

// Component to render Markdown content (tables and general markdown)
const MarkdownRenderer = ({ markdown, isTable = false }) => {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        my: 2,
        backgroundColor: isTable ? '#1E1E1E' : 'transparent',
        borderRadius: isTable ? '8px' : '0px',
        p: isTable ? 2 : 0,
        overflow: 'auto',
        border: isTable ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
      }}
    >
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Table components
          table: ({ node, ...props }) => (
            <Box sx={{ overflowX: 'auto', width: '100%' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                color: '#FFFFFF'
              }} {...props} />
            </Box>
          ),
          thead: ({ node, ...props }) => (
            <thead style={{ borderBottom: '2px solid #4E4FEB' }} {...props} />
          ),
          th: ({ node, ...props }) => (
            <th style={{ 
              padding: '8px', 
              textAlign: 'left', 
              fontWeight: 'bold',
              color: '#FFFFFF'
            }} {...props} />
          ),
          td: ({ node, ...props }) => (
            <td style={{ 
              padding: '8px', 
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF'
            }} {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr style={{ 
              '&:nth-of-type(even)': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }
            }} {...props} />
          ),
          // General markdown components
          h1: ({ node, ...props }) => (
            <Typography variant="h4" sx={{ color: '#4dabf7', fontWeight: 'bold', mb: 2, mt: 3 }} {...props} />
          ),
          h2: ({ node, ...props }) => (
            <Typography variant="h5" sx={{ color: '#4dabf7', fontWeight: 'bold', mb: 1.5, mt: 2.5 }} {...props} />
          ),
          h3: ({ node, ...props }) => (
            <Typography variant="h6" sx={{ color: '#4dabf7', fontWeight: 'bold', mb: 1, mt: 2 }} {...props} />
          ),
          p: ({ node, ...props }) => (
            <Typography sx={{ color: '#FFFFFF', mb: 1.5, lineHeight: 1.6 }} {...props} />
          ),
          ul: ({ node, ...props }) => (
            <Box component="ul" sx={{ color: '#FFFFFF', pl: 2, mb: 1.5 }} {...props} />
          ),
          ol: ({ node, ...props }) => (
            <Box component="ol" sx={{ color: '#FFFFFF', pl: 2, mb: 1.5 }} {...props} />
          ),
          li: ({ node, ...props }) => (
            <Typography component="li" sx={{ color: '#FFFFFF', mb: 0.5 }} {...props} />
          ),
          strong: ({ node, ...props }) => (
            <Box component="strong" sx={{ color: '#4dabf7', fontWeight: 'bold' }} {...props} />
          ),
          em: ({ node, ...props }) => (
            <Box component="em" sx={{ color: '#ff6b35', fontStyle: 'italic' }} {...props} />
          ),
          code: ({ node, inline, ...props }) => 
            inline ? (
              <Box 
                component="code" 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  color: '#51cf66',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  fontSize: '0.9em'
                }} 
                {...props} 
              />
            ) : (
              <Box 
                component="pre"
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                  color: '#51cf66',
                  padding: 2,
                  borderRadius: '8px',
                  overflow: 'auto',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  my: 2
                }}
              >
                <code {...props} />
              </Box>
            ),
          blockquote: ({ node, ...props }) => (
            <Box 
              sx={{ 
                borderLeft: '4px solid #4dabf7',
                pl: 2,
                py: 1,
                backgroundColor: 'rgba(77, 171, 247, 0.1)',
                borderRadius: '0 8px 8px 0',
                my: 2
              }}
            >
              <Typography sx={{ color: '#FFFFFF', fontStyle: 'italic' }} {...props} />
            </Box>
          )
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Box>
  );
};

const OceanDataMessage = ({ message }) => {
  const [plotlyData, setPlotlyData] = useState(null);
  const [markdownTable, setMarkdownTable] = useState(null);
  const [generalMarkdown, setGeneralMarkdown] = useState(null);
  
  useEffect(() => {
    // Check for Plotly JSON in the message
    const plotlyMatch = message.content.match(/<<PLOTLY_JSON_BEGIN>>\s*([\s\S]*?)\s*<<PLOTLY_JSON_END>>/i);
    if (plotlyMatch && plotlyMatch[1]) {
      try {
        const plotData = JSON.parse(plotlyMatch[1]);
        setPlotlyData(plotData);
      } catch (error) {
        console.error("Failed to parse Plotly JSON:", error);
      }
    }
    
    // Check for Markdown table in the message
    const markdownMatch = message.content.match(/<<MARKDOWN_TABLE_BEGIN>>\s*([\s\S]*?)\s*<<MARKDOWN_TABLE_END>>/i);
    if (markdownMatch && markdownMatch[1]) {
      setMarkdownTable(markdownMatch[1]);
    }
    
    // Get clean text without the special markers
    let cleanText = message.content
      .replace(/<<PLOTLY_JSON_BEGIN>>[\s\S]*?<<PLOTLY_JSON_END>>/g, '')
      .replace(/<<MARKDOWN_TABLE_BEGIN>>[\s\S]*?<<MARKDOWN_TABLE_END>>/g, '')
      .replace(/\[RAW_DATA_KEY:(.*?)\]/g, '')
      .trim();
    
    // Check if the clean text contains markdown formatting (headers, lists, etc.)
    const hasMarkdownFormatting = cleanText.includes('#') || cleanText.includes('**') || 
                                  cleanText.includes('*') || cleanText.includes('-') ||
                                  cleanText.includes('`') || cleanText.includes('>');
    
    if (hasMarkdownFormatting && cleanText) {
      setGeneralMarkdown(cleanText);
    } else if (cleanText) {
      setGeneralMarkdown(null);
    }
  }, [message.content]);

  // Check for raw data reference
  const rawDataMatch = message.content.match(/\[RAW_DATA_KEY:(.*?)\]/);
  
  // Get clean text without special markers for plain text display
  let plainText = message.content
    .replace(/<<PLOTLY_JSON_BEGIN>>[\s\S]*?<<PLOTLY_JSON_END>>/g, '')
    .replace(/<<MARKDOWN_TABLE_BEGIN>>[\s\S]*?<<MARKDOWN_TABLE_END>>/g, '')
    .replace(/\[RAW_DATA_KEY:(.*?)\]/g, '')
    .trim();
  
  // Don't show plain text if we're rendering it as markdown
  const showPlainText = plainText && !generalMarkdown;
  
  return (
    <Box>
      {/* Plain text content (when no markdown formatting detected) */}
      {showPlainText && (
        <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.5, mb: plotlyData || markdownTable ? 2 : 0 }}>
          {plainText}
        </Typography>
      )}
      
      {/* General markdown content (when markdown formatting detected) */}
      {generalMarkdown && (
        <MarkdownRenderer markdown={generalMarkdown} isTable={false} />
      )}
      
      {/* Plotly visualization if present */}
      {plotlyData && (
        <PlotlyVisualization plotData={plotlyData} />
      )}
      
      {/* Markdown table if present */}
      {markdownTable && (
        <MarkdownRenderer markdown={markdownTable} isTable={true} />
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
  
  // Check for special content markers or general markdown formatting
  const hasSpecialMarkers = 
    message.content.includes('<<PLOTLY_JSON_BEGIN>>') || 
    message.content.includes('<<MARKDOWN_TABLE_BEGIN>>') || 
    message.content.includes('[RAW_DATA_KEY:');
    
  const hasMarkdownFormatting = 
    message.content.includes('#') || message.content.includes('**') || 
    message.content.includes('*') || message.content.includes('-') ||
    message.content.includes('`') || message.content.includes('>');
  
  const hasSpecialContent = isBot && (hasSpecialMarkers || hasMarkdownFormatting);
  
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
        
        {/* Timestamp */}
        <Typography 
          sx={{ 
            fontSize: '11px', 
            color: 'rgba(255, 255, 255, 0.4)',
            mt: 0.5,
            ml: isBot ? 0 : 'auto',
            textAlign: isBot ? 'left' : 'right',
            maxWidth: 'fit-content'
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Typography>
      </motion.div>
      
    </Box>
  );
};

export default Message;
