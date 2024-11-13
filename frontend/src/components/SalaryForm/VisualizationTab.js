import React from 'react';
import { Box, Grid, Paper, Typography, Fade } from '@mui/material';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { chartOptions, genderPayGapColors } from './/chartConfigs';

const VisualizationTab = ({ analysis, formData }) => {
  // Salary Comparison Bar Chart
  const salaryComparisonData = {
    labels: ['Your Salary', 'Industry Average', 'Gender Average'],
    datasets: [{
      label: 'Salary Comparison',
      data: [
        formData.salary,  // Direct access to form data
        formData.salary * 1.1,
        formData.salary * (formData.gender === 'female' ? 0.95 : 1.05)
      ],
      backgroundColor: [
        genderPayGapColors.female,
        genderPayGapColors.average,
        genderPayGapColors.male
      ],
    }]
  };

  // Pay Gap Distribution Pie Chart
  const payGapData = {
    labels: ['Your Salary', 'Pay Gap'],
    datasets: [{
      data: [100 - analysis?.pay_gap, analysis?.pay_gap],
      backgroundColor: [genderPayGapColors.female, '#FF9800'],
      borderWidth: 1,
    }]
  };

  // Experience vs Salary Line Chart
  const experienceData = {
    labels: ['Entry Level', 'Mid Level', 'Senior Level', 'Executive Level'],
    datasets: [
      {
        label: 'Industry Trend',
        data: [
          formData.salary * 0.7,  // Entry level
          formData.salary,        // Current level
          formData.salary * 1.3,  // Senior level
          formData.salary * 1.6   // Executive level
        ],
        borderColor: genderPayGapColors.average,
        tension: 0.4,
      },
      {
        label: 'Your Trajectory',
        data: [
          formData.salary * 0.65,
          formData.salary * 0.95,
          formData.salary * 1.25,
          formData.salary * 1.7
        ],
        borderColor: genderPayGapColors.female,
        tension: 0.4,
      }
    ]
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};
  const growthPotential = formData.salary * 0.3;  // 30% growth potential


  return (
    <Fade in={true}>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Salary Comparison Chart */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Salary Comparison Analysis
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar data={salaryComparisonData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>

          {/* Pay Gap Distribution */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Pay Gap Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <Pie 
                  data={payGapData} 
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      tooltip: {
                        callbacks: {
                          label: (context) => `${context.parsed}%`
                        }
                      }
                    }
                  }} 
                />
              </Box>
            </Paper>
          </Grid>

          {/* Experience vs Salary Trend */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Experience vs Salary Trend
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line 
                  data={experienceData} 
                  options={{
                    ...chartOptions,
                    scales: {
                      ...chartOptions.scales,
                      y: {
                        ...chartOptions.scales.y,
                        title: {
                          display: true,
                          text: 'Salary ($)'
                        }
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Experience Level'
                        }
                      }
                    }
                  }} 
                />
              </Box>
            </Paper>
          </Grid>

          {/* Key Insights */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Key Insights
              </Typography>
              <Typography variant="body1">
                • Your current salary is {analysis?.pay_gap > 0 ? 'below' : 'above'} the industry average by {Math.abs(analysis?.pay_gap)}%
              </Typography>
              <Typography variant="body1">
                • Based on experience level, there's potential for {formatCurrency(growthPotential)} growth in the next 2 years
              </Typography>
              <Typography variant="body1">
                • The gender pay gap in your industry shows room for improvement through negotiation
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default VisualizationTab;
