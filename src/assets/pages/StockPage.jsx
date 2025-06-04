import React, { useEffect, useState } from 'react';
import { fetchStockList, fetchStockPrices } from "../services/stockAPI";

import {
  Box, FormControl, InputLabel, MenuItem, Select, Typography, CircularProgress
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function StockPage() {
  const [stocks, setStocks] = useState({});
  const [ticker, setTicker] = useState('');
  const [minutes, setMinutes] = useState(50);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStockList().then(res => setStocks(res.stocks));
  }, []);

  useEffect(() => {
    if (ticker) {
      setLoading(true);
      fetchStockPrices(ticker, minutes).then(res => {
        setData(res);
        setLoading(false);
      });
    }
  }, [ticker, minutes]);

  const chartData = {
    labels: data.map(d => new Date(d.lastUpdatedAt).toLocaleTimeString()),
    datasets: [
      {
        label: `${ticker} Price`,
        data: data.map(d => d.price),
        fill: false,
        borderColor: 'blue',
        tension: 0.1
      }
    ]
  };

  return (
    <Box>
      <Typography variant="h6">Stock Chart</Typography>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Select Ticker</InputLabel>
        <Select value={ticker} label="Select Ticker" onChange={e => setTicker(e.target.value)}>
          {Object.entries(stocks).map(([name, code]) => (
            <MenuItem key={code} value={code}>{name} ({code})</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Minutes</InputLabel>
        <Select value={minutes} label="Minutes" onChange={e => setMinutes(e.target.value)}>
          {[10, 20, 30, 50, 100].map(m => (
            <MenuItem key={m} value={m}>{m} Minutes</MenuItem>
          ))}
        </Select>
      </FormControl>
      {loading ? <CircularProgress sx={{ mt: 4 }} /> : (
        <Box sx={{ mt: 4 }}>
          <Line data={chartData} />
        </Box>
      )}
    </Box>
  );
}