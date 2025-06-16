// components/UploadCVCard.js
import React, { useState } from 'react';
import { uploadCVs } from '../api/cvApi';
import {
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

function UploadCVCard() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <Card
      sx={{
        width: 500,
        maxWidth: '90vw',
        p: 3,
        boxShadow: 6
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upload CVs (PDF)
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

        {results && (
          <Box mt={2}>
            <Typography variant="body1" gutterBottom>Upload Results</Typography>
            {results.map((res, idx) => (
              <Alert
                key={idx}
                severity={res.status === 'success' ? 'success' : 'error'}
                sx={{ mb: 1 }}
              >
                <strong>{res.filename}</strong> - {res.status}
                {res.status !== 'success' && (
                <>
                  <br />
                  Please try again.
                </>
                )}
              </Alert>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default UploadCVCard;
