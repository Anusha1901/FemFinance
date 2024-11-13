import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Fade } from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const RecommendationsTab = ({ analysis }) => {
  const recommendations = Array.isArray(analysis?.recommendations) 
      ? analysis.recommendations 
      : [];

  return (
      <Box sx={{ p: 3 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                  Career Recommendations
              </Typography>
              <List>
                  {recommendations.map((recommendation, index) => (
                      <ListItem key={index}>
                          <ListItemText primary={recommendation} />
                      </ListItem>
                  ))}
              </List>
          </Paper>
      </Box>
  );
};

export default RecommendationsTab;
