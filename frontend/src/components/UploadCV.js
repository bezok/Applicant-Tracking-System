import React, { useState } from 'react';
import { uploadCVs } from '../api/cvApi';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  CircularProgress,
  Typography,
  Input,
  Card,
  CardContent,
  List,
  ListItem,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

function UploadCV() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // for navigation on close

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please select at least one PDF file.');
      return;
    }

    setLoading(true);
    try {
      const res = await uploadCVs(files);
      setResults(res.results);
    } catch (err) {
      alert('Upload failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setResults(null); // reset previous results
  };

  

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Upload CVs
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => navigate('/query')} // Customize this
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box className="upload-container" sx={{ mt: 4}}>
        <Card className="upload-card" sx={{ maxWidth: 600, mx: 'auto' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Upload Multiple CVs (PDF)
            </Typography>

            <Input
              type="file"
              inputProps={{ multiple: true, accept: 'application/pdf' }}
              onChange={handleFileChange}
              disabled={loading}
              fullWidth
              sx={{ mt: 2, mb: 2 }}
            />

            {files.length > 0 && (
              <List dense>
                {files.map((file, idx) => (
                  <ListItem key={idx}>{file.name}</ListItem>
                ))}
              </List>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={loading}
              fullWidth
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload'}
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Box mt={4} sx={{ maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Upload Results
            </Typography>
            {results.map((res, idx) => (
              <Alert
                key={idx}
                severity={res.status === 'success' ? 'success' : 'error'}
                sx={{ mb: 1 }}
              >
                <strong>{res.filename}</strong> - {res.status}
              </Alert>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}

export default UploadCV;
