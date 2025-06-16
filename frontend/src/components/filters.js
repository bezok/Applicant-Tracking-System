import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  TextField,
  Button,
  Chip,
  Autocomplete
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Option lists for dropdowns
const hardSkillOptions = [
  'GitHub', 'AWS', 'Rust', 'Flutter', 'SQL',
  'Hadoop', 'GenAI', 'RedShift', 'Docker', 'Kubernetes'
];

const softSkillOptions = [
  'Problem-Solving', 'Leadership', 'Communication', 'Teamwork', 'Adaptability'
];

const locationOptions = [
  'Bangalore', 'California', 'New York', 'Berlin', 'London'
];

const Filters = ({ onSearch }) => {
  const [hardSkills, setHardSkills] = useState(['GitHub', 'AWS']);
  const [softSkills, setSoftSkills] = useState(['Problem-Solving']);
  const [location, setLocation] = useState(['Bangalore']);
  const [yearsExp, setYearsExp] = useState(4);
  const [score, setScore] = useState(50);

  const handleSearch = () => {
    const filters = {
      hardSkills,
      softSkills,
      location,
      yearsExp,
      score,
    };
    onSearch(filters);
  };

  return (
    <Box>
      {/* Hard Skills */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Hard Skills</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Autocomplete
            multiple
            options={hardSkillOptions}
            value={hardSkills}
            onChange={(e, newValue) => setHardSkills(newValue)}
            renderValue={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} key={index} sx={{ m: 0.5 }} />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Hard Skills" variant="outlined"
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        border: 'none',
                    },
                    '&:hover fieldset': {
                        border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                        border: 'none',
                    },
                    }
                }}/>
            )}
          />
        </AccordionDetails>
      </Accordion>

      {/* Soft Skills */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Soft Skills</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Autocomplete
            multiple
            options={softSkillOptions}
            value={softSkills}
            onChange={(e, newValue) => setSoftSkills(newValue)}
            renderValue={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} key={index} sx={{ m: 0.5 }} />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Soft Skills" variant="outlined"
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        border: 'none',
                    },
                    '&:hover fieldset': {
                        border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                        border: 'none',
                    },
                    }
                }}/>
            )}
          />
        </AccordionDetails>
      </Accordion>

      {/* Years of Experience */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Years of Experience</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            type="number"
            label="Years"
            variant="outlined"
            value={yearsExp}
            onChange={(e) => setYearsExp(Number(e.target.value))}
            fullWidth
          />
        </AccordionDetails>
      </Accordion>

      {/* Location */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Location</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Autocomplete
            multiple
            options={locationOptions}
            value={location}
            onChange={(e, newValue) => setLocation(newValue)}
            renderValue={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} key={index} sx={{ m: 0.5 }} />
              ))
            }
            renderInput={(params) => (
                <TextField {...params} label="Select Locations" variant="outlined"
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        border: 'none',
                    },
                    '&:hover fieldset': {
                        border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                        border: 'none',
                    },
                    }
                }}/>

            )}
          />
        </AccordionDetails>
      </Accordion>

      {/* Score */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Score</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            type="number"
            label="Score"
            variant="outlined"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            fullWidth
          />
        </AccordionDetails>
      </Accordion>

      {/* Search Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSearch}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

export default Filters;
