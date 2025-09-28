import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const OceanBackground = () => {
  const canvasRef = useRef(null);
  const theme = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let waves = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initWaves();
    };

    window.addEventListener('resize', resize);
    resize();
    
    function initWaves() {
      waves = [];
      
      // Create ocean waves with varying properties
      for (let i = 0; i < 6; i++) {
        waves.push({
          y: canvas.height * (0.5 + (i * 0.08)), // Position waves in the lower half
          amplitude: 5 + (i * 2),  // How high the wave goes
          frequency: 0.005 + (i * 0.002), // How many waves fit in the screen
          speed: 0.05 - (i * 0.005), // How fast the wave moves
          color: `rgba(0, 164, 214, ${0.04 + (i * 0.015)})`, // Ocean blue with increasing opacity
          phase: Math.random() * Math.PI * 2 // Random starting position
        });
      }
    }
    
    function drawWaves(time) {
      // Clear canvas with a dark/black gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 0, 5, 1)'); // Almost black at top
      gradient.addColorStop(0.7, 'rgba(0, 10, 20, 1)'); // Very dark blue
      gradient.addColorStop(1, 'rgba(0, 20, 30, 1)'); // Dark ocean blue at bottom
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle stars/particles in the upper part
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.7; // Only in the upper 70%
        const radius = Math.random() * 1.2;
        const opacity = Math.random() * 0.5 + 0.1;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
      
      // Draw waves
      waves.forEach(wave => {
        ctx.beginPath();
        
        // Update phase based on speed
        wave.phase += wave.speed;
        
        // Draw the wave path
        for (let x = 0; x <= canvas.width; x += 5) {
          // Calculate wave height using sine
          const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Complete the wave shape by drawing to the bottom of the canvas
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        ctx.fillStyle = wave.color;
        ctx.fill();
      });
      
      // Add a subtle oceanic glow near the bottom
      const glowGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height * 1.2, 0,
        canvas.width / 2, canvas.height * 1.2, canvas.width * 0.6
      );
      glowGradient.addColorStop(0, 'rgba(0, 194, 255, 0.04)');
      glowGradient.addColorStop(1, 'rgba(0, 194, 255, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    function animate() {
      drawWaves(Date.now() / 1000);
      animationFrameId = window.requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <Box 
      sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0,
        background: 'black', // Fallback color
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }} 
      />
    </Box>
  );
};

export default OceanBackground;
