import React from 'react';
import { Box, Typography } from '@mui/material';

export default function CorrelationPage() {
  return (
    <Box>
      <Typography variant="h6">Correlation Heatmap</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        (Coming Soon) — This page will show a heatmap of Pearson correlation coefficients between selected stocks.
      </Typography>
    </Box>
  );
}