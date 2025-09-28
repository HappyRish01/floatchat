import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  IconButton, 
  Divider, 
  InputBase,
  Button
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Add as AddIcon,
  History as HistoryIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Ocean temperature analysis', date: '2 hours ago' },
    { id: 2, title: 'Marine ecosystem queries', date: '1 day ago' },
    { id: 3, title: 'Deep sea exploration data', date: '3 days ago' },
  ]);

  return (
    <motion.div
      initial={{ width: 280 }}
      animate={{ width: expanded ? 280 : 60 }}
      transition={{ duration: 0.3 }}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRight: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
      }}
      className="glass-effect"
    >
      {/* Header */}
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: expanded ? 'space-between' : 'center'
        }}
      >
        {expanded && (
          <Typography
            variant="h6"
            className="gradient-text"
            sx={{ fontWeight: 600, flexGrow: 1 }}
          >
            FloatChat
          </Typography>
        )}
        
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{ color: theme.palette.primary.main }}
        >
          {expanded ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
      
      {/* New Chat Button */}
      {/* Home Button */}
      <Box sx={{ p: expanded ? 2 : 1, textAlign: expanded ? 'left' : 'center' }}>
        <Button
          variant="outlined"
          startIcon={expanded && <HomeIcon />}
          sx={{
            width: expanded ? '100%' : '40px',
            height: expanded ? 'auto' : '40px',
            minWidth: 'unset',
            p: expanded ? undefined : 0,
            borderRadius: '8px',
            mb: 1,
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            '&:hover': {
              borderColor: theme.palette.primary.light,
              backgroundColor: 'rgba(30, 136, 229, 0.1)',
            }
          }}
          onClick={() => navigate('/')}
        >
          {expanded ? "Home" : <HomeIcon />}
        </Button>
      </Box>
      
      {/* New Chat Button */}
      <Box sx={{ p: expanded ? 2 : 1, textAlign: expanded ? 'left' : 'center' }}>
        <Button
          variant="contained"
          startIcon={expanded && <AddIcon />}
          sx={{
            width: expanded ? '100%' : '40px',
            height: expanded ? 'auto' : '40px',
            minWidth: 'unset',
            p: expanded ? undefined : 0,
            borderRadius: '8px',
            background: theme.palette.gradient.blue,
            '&:hover': {
              background: theme.palette.gradient.mixed,
            }
          }}
        >
          {expanded ? "New Chat" : <AddIcon />}
        </Button>
      </Box>
      
      {/* Search Box */}
      {expanded && (
        <Box sx={{ px: 2, py: 1 }}>
          <Box
            sx={{
              p: '2px 8px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 1,
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' },
            }}
          >
            <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />
            <InputBase
              placeholder="Search conversations"
              inputProps={{ 'aria-label': 'search conversations' }}
              sx={{ color: theme.palette.text.primary, ml: 1, flex: 1 }}
            />
          </Box>
        </Box>
      )}
      
      {/* Chat History */}
      <Box sx={{ flex: 1, overflow: 'auto', mt: 1 }}>
        {expanded ? (
          <List sx={{ py: 0 }}>
            {conversations.map((conv) => (
              <ListItem
                key={conv.id}
                button
                sx={{
                  py: 1.5,
                  px: 2,
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <HistoryIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={conv.title}
                  secondary={conv.date}
                  primaryTypographyProps={{
                    variant: 'body2',
                    sx: { fontWeight: 500, color: theme.palette.text.primary }
                  }}
                  secondaryTypographyProps={{
                    variant: 'caption',
                    sx: { color: theme.palette.text.secondary }
                  }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <IconButton sx={{ color: theme.palette.primary.main, mb: 2 }}>
              <ChatIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
      
      {/* Footer */}
      <Box
        sx={{
          p: expanded ? 2 : 1,
          display: 'flex',
          justifyContent: expanded ? 'space-between' : 'center',
          alignItems: 'center',
        }}
      >
        {expanded ? (
          <>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              FloatChat v0.1.0
            </Typography>
            <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
              <SettingsIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
            <SettingsIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </motion.div>
  );
};

export default Sidebar;
