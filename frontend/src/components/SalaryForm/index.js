import React, { useState } from 'react';
import { Tabs, Tab, Box, Container, Typography } from '@mui/material';
import FormTab from './/FormTab';
//import AnalysisTab from './/AnalysisTab';
import VisualizationTab from './/VisualizationTab';
import RecommendationsTab from './/RecommendationsTab';
import { Chart as ChartJS } from 'chart.js';
import { chartOptions, genderPayGapColors } from './/chartConfigs';
import '../style.css';

const SalaryForm = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    job_title: '',
    location: '',
    industry: '',
    experience: '',
    salary: '',
    gender: ''
  });
  const [analysis, setAnalysis] = useState({
    salary: 0,
    average_salary: 0,
    pay_gap: 0,
    gender_average: 0,
    recommendations: [],
    industry_data: {},
    experience_data: {}
  });
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/salary/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setAnalysis(data);
      setCurrentTab(1); // Switch to analysis tab after submission
    } catch (error) {
      console.error('Error during analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" className="salary-analyzer-container">
      <Typography variant="h3" className="main-title">
        FemFinance Analyzer 
      </Typography>
      <Typography variant="subtitle1" className="subtitle">
        Empowering women through salary transparency and analysis
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          variant="fullWidth"
          className="navigation-tabs"
        >
          <Tab label="Input Details" />
          <Tab label="Analysis" disabled={!analysis} />
          <Tab label="Recommendations" disabled={!analysis} />
        </Tabs>
      </Box>

      <div className="tab-content">
        {currentTab === 0 && (
          <FormTab 
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        )}
        {currentTab === 1 && <VisualizationTab analysis={analysis} formData={formData} />}
        {currentTab === 2 && <RecommendationsTab analysis={analysis} />}
      </div>
    </Container>
  );
};

export default SalaryForm;
