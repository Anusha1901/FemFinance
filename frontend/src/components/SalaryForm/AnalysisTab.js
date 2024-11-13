import React from 'react';
import { 
  Paper, 
  Typography, 
  Box,
  Fade 
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { chartOptions, genderPayGapColors } from './/chartConfigs';
import VisualizationTab from './/VisualizationTab';

const AnalysisTab = ({ analysis }) => {
  const chartData = {
    labels: ['Your Salary', 'Average Salary'],
    datasets: [{
      label: 'Salary Comparison',
      data: [analysis?.salary, analysis?.average_salary],
      backgroundColor: ['#FF69B4', '#4CAF50'],
    }]
  };

  return (
    <Fade in={true}>
      <Box className="analysis-container">
        <Paper elevation={3} className="analysis-card">
          <Typography variant="h5" gutterBottom>
            Salary Analysis Results
          </Typography>
          <Box className="chart-container">
            <Bar data={chartData} options={{ responsive: true }} />
          </Box>
          <Box className="analysis-details">
            <Typography variant="h6" color="error">
              Pay Gap: {analysis?.pay_gap}%
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default AnalysisTab;
