import React from 'react';
import { Container, Tabs, Tab, Box } from '@mui/material';
import StockPage from './assets/pages/StockPage';
import CorrelationPage from './assets/pages/CorrelationPage';

export default function App() {
  const [tab, setTab] = React.useState(0);

  return (
    <Container maxWidth="lg">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', my: 2 }}>
        <Tabs value={tab} onChange={(_, val) => setTab(val)}>
          <Tab label="Stock Chart" />
          <Tab label="Correlation Heatmap" />
        </Tabs>
      </Box>
      {tab === 0 && <StockPage />}
      {tab === 1 && <CorrelationPage />}
    </Container>
  );
}