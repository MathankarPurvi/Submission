import { Typography, Slider } from '@mui/material';

const TimeSelector = ({ minutes, setMinutes }) => {
  return (
    <>
      <Typography variant="subtitle1">Select Time (in minutes)</Typography>
      <Slider
        value={minutes}
        onChange={(e, val) => setMinutes(val)}
        valueLabelDisplay="auto"
        min={10}
        max={120}
        step={10}
      />
    </>
  );
};

export default TimeSelector;
