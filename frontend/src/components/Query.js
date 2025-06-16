import React, { useState } from 'react';
import { queryCVs } from '../api/cvApi';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PromptIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import Filters from './filters';
import UploadCVCard from './UploadCVcard';

import {
  Box,
  Drawer,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CssBaseline,
  Toolbar,
  IconButton,
  AppBar,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  Backdrop
} from '@mui/material';
import { blue } from '@mui/material/colors';

const drawerWidth = 320;

function QueryCV() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [inputMode, setInputMode] = useState('prompt');
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState(null); // ✅ Track filter input
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };


  const handleSearch = async () => {
    setLoading(true);

    try {
      if (inputMode === 'prompt') {
        const res = await queryCVs(query);
        setResults(res.results || []);
      } else if (inputMode === 'filters' && filterValues) {
        // Convert filters into readable query
        const filterQuery = `
          Find applicants with hard skills: ${filterValues.hardSkills.join(', ')}, 
          soft skills: ${filterValues.softSkills.join(', ')}, 
          location: ${filterValues.location.join(', ')}, 
          at least ${filterValues.yearsExp} years of experience, 
          score greater than ${filterValues.score}, 
        `;
        console.log("query:", filterQuery);

        const res = await queryCVs(filterQuery); //  Send to backend
        setResults(res.results || []);
      }
    } catch (err) {
      console.error('Search failed:', err);
    }

    setLoading(false);
  };

  const handleFilterSearch = (filters) => {
    setFilterValues(filters); // ✅ Receive filters from Filters.js
  };

  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            Applicant Tracking System
          </Typography>

          <Box>
            <ToggleButtonGroup
              value={inputMode}
              exclusive
              onChange={(e, val) => val && !loading && setInputMode(val)}
              size="small"
              sx={{ mr: 2, bgcolor: 'white', borderRadius: 1 }}
              disabled={loading}
            >
              <ToggleButton value="prompt">
                <PromptIcon fontSize="small" /> &nbsp; Prompt
              </ToggleButton>
              <ToggleButton value="filters">
                <FilterAltIcon fontSize="small" /> &nbsp; Filters
              </ToggleButton>
            </ToggleButtonGroup>

            <IconButton color="inherit" edge="end" onClick={handleOpen} disabled={open}>  
              <CloudUploadIcon />
            </IconButton>
            <Backdrop
                  sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                  open={open}
                  onClick={handleClose}
                  >
                <Box
                  sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  width: '100%',
                  }}
                >
                  <Box onClick={(e) => e.stopPropagation()}>
                    <UploadCVCard/> {/* ← shown inside Backdrop */}
                  </Box>
                  
                </Box>
            </Backdrop>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', padding: 2 }
        }}
      >
        <Toolbar />
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            {inputMode === 'prompt' ? 'Search Applicants' : 'Filters'}
          </Typography>

          {inputMode === 'prompt' ? (
            <>
              <TextField
                label="Enter Job Query"
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }}
                disabled={loading}
              />
              <Button variant="contained" color="primary" onClick={handleSearch} fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
              </Button>
            </>
          ) : (
            <>
              <Filters onSearch={handleFilterSearch} /> {/* ✅ Pass callback */}
              <Button variant="contained" color="primary" onClick={handleSearch} fullWidth disabled={loading} sx={{ mt: 2 }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
              </Button>
            </>
          )}
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h5" gutterBottom>
          Applicant Results
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2, mt: 0.5 }}>
              Searching applicants...
            </Typography>
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((applicant, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{applicant.name}</TableCell>
                    <TableCell>{applicant.email}</TableCell>
                    <TableCell>{applicant.contact}</TableCell>
                    <TableCell>{applicant.experience}</TableCell>
                    <TableCell>{applicant.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}

export default QueryCV;
