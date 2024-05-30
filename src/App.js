import React, { useState } from 'react';
import { Button, Typography, Paper, TextField, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useRecoilState, atom, RecoilRoot } from 'recoil';
import { countries } from 'countries-list';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const RootPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.spacing(2),
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  maxWidth: 600,
  margin: '0 auto',
}));

const Container = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("https://www.toptal.com/designers/subtlepatterns/patterns/double-bubble-dark.png")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(3),
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0A192F',
    zIndex: -1,
  },
}));

const Header = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: 'center',
}));

const Footer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Input = styled('input')({
  display: 'none',
});

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  marginTop: '16px',
});

const StyledButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 25,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  margin: '10px 0',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
  },
});

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(2),
  textAlign: 'center',
}));

const imageState = atom({
  key: 'imageState',
  default: null,
});

const secondImageState = atom({
  key: 'secondImageState',
  default: null,
});

const documentSizes = {
  USA: { passport: [51, 51], visa: [51, 51], license: [51, 51], id: [51, 51] },
  Canada: { passport: [50, 70], visa: [35, 45], license: [50, 70], id: [50, 70] },
  UK: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  EU: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Australia: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  India: { passport: [35, 45], visa: [50, 50], license: [35, 45], id: [35, 45] },
  China: { passport: [33, 48], visa: [33, 48], license: [22, 32], id: [33, 48] },
  Japan: { passport: [35, 45], visa: [45, 45], license: [24, 30], id: [35, 45] },
  Russia: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Albania: { passport: [40, 50], visa: [40, 40], license: [35, 45], id: [35, 45] },
  Argentina: { passport: [40, 40], visa: [40, 40], license: [35, 45], id: [35, 45] },
  Belgium: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Brazil: { passport: [50, 70], visa: [50, 70], license: [50, 70], id: [50, 70] },
  Denmark: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Egypt: { passport: [40, 60], visa: [40, 60], license: [40, 60], id: [40, 60] },
  France: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Germany: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Greece: { passport: [40, 60], visa: [40, 60], license: [40, 60], id: [40, 60] },
  HongKong: { passport: [40, 50], visa: [40, 50], license: [40, 50], id: [40, 50] },
  Indonesia: { passport: [40, 60], visa: [40, 60], license: [40, 60], id: [40, 60] },
  Ireland: { passport: [35, 38], visa: [35, 38], license: [35, 38], id: [35, 38] },
  Israel: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Italy: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Jamaica: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Kenya: { passport: [51, 51], visa: [51, 51], license: [51, 51], id: [51, 51] },
  Malaysia: { passport: [35, 50], visa: [35, 50], license: [35, 50], id: [35, 50] },
  Mauritius: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Mexico: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Nepal: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Netherlands: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  NewZealand: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Nigeria: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Pakistan: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Philippines: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Poland: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Portugal: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  Romania: { passport: [35, 45], visa: [35, 45], license: [35, 45], id: [35, 45] },
  SaudiArabia: { passport: [40, 60], visa: [40, 60], license: [40, 60], id: [40, 60] },
  default: { passport: [51, 51], visa: [51, 51], license: [51, 51], id: [51, 51] },
};

const UploadPhoto = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useRecoilState(imageState);
  const [secondImageURL, setSecondImageURL] = useRecoilState(secondImageState);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [country, setCountry] = useState('');
  const [documentType, setDocumentType] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !country || !documentType) return;

    setUploading(true);
    setError(null);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = async () => {
      const base64Image = reader.result.split(',')[1]; // Extract base64 string
      const size = documentSizes[country]?.[documentType] || documentSizes.default[documentType];

      const apikey = '3ad14e6d3c7a49b394cc74e3be7b438d'; // Your API key
      const url = 'https://www.cutout.pro/api/v1/idphoto/printLayout';

      const data = {
        base64: base64Image,
        bgColor: 'FFFFFF',
        dpi: 300,
        mmHeight: size[1],
        mmWidth: size[0],
        printBgColor: 'FFFFFF',
        printMmHeight: 210,
        printMmWidth: 150,
      };

      try {
        const response = await axios.post(url, data, {
          headers: {
            APIKEY: apikey,
            'Content-Type': 'application/json',
          },
        });

        console.log(response.data); // Log the API response to the console
        setImageURL(response.data.data.idPhotoImage);
        setSecondImageURL(response.data.data.printLayoutImage);
        setError(null);
      } catch (error) {
        console.error('Error:', error);
        setImageURL(null);
        setSecondImageURL(null);
        setError('Error uploading photo. Please try again.');
      } finally {
        setUploading(false);
      }
    };

    reader.onerror = (error) => {
      console.error('Error converting file to base64:', error);
      setError('Error converting file to base64. Please try again.');
      setUploading(false);
    };
  };

  return (
    <Container>
      <RootPaper>
        <Header>
          <Typography variant="h4" gutterBottom>
            Passport Photo
          </Typography>
        </Header>
        <div>
          <Typography variant="h5" gutterBottom>
            Upload Your Photo
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="country-select-label">Choose a Country</InputLabel>
            <Select
              labelId="country-select-label"
              id="country-select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              label="Choose a Country"
            >
              {Object.keys(documentSizes).map((countryKey) => (
                <MenuItem key={countryKey} value={countryKey}>
                  {countries[countryKey]?.emoji || ''} {countries[countryKey]?.name || countryKey}
                </MenuItem>
              ))}
              <MenuItem key="default" value="default">
                {countries['default']?.emoji || ''} Other
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="document-select-label">Choose a Document Type</InputLabel>
            <Select
              labelId="document-select-label"
              id="document-select"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              label="Choose a Document Type"
            >
              {country &&
                Object.keys(documentSizes[country] || documentSizes.default).map((docType) => (
                  <MenuItem key={docType} value={docType}>
                    {docType.charAt(0).toUpperCase() + docType.slice(1)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-button-file">
            <StyledButton variant="contained" color="primary" component="span">
              Choose File
            </StyledButton>
          </label>
          {selectedFile && (
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              disabled
              value={selectedFile ? selectedFile.name : ''}
              label="Selected File"
            />
          )}
        </div>
        <Footer>
          <ButtonContainer>
            <StyledButton
              variant="contained"
              color="secondary"
              onClick={handleUpload}
              disabled={!selectedFile || !country || !documentType || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </StyledButton>
          </ButtonContainer>
        </Footer>
        {error && (
          <ErrorMessage variant="body1" gutterBottom>
            {error}
          </ErrorMessage>
        )}
        {imageURL && (
          <div>
            <Typography variant="h6" gutterBottom>
              Result
            </Typography>
            <img src={imageURL} alt="Uploaded Photo" style={{ width: '100%', maxWidth: '500px', marginBottom: '16px' }} />
            <a href={imageURL} target="_blank" rel="noopener noreferrer">
              View Uploaded Photo
            </a>
          </div>
        )}
        {secondImageURL && (
          <div>
            <Typography variant="h6" gutterBottom>
              Print Layout
            </Typography>
            <img src={secondImageURL} alt="Print Layout" style={{ width: '100%', maxWidth: '500px', marginBottom: '16px' }} />
            <a href={secondImageURL} target="_blank" rel="noopener noreferrer">
              View Print Layout
            </a>
          </div>
        )}
      </RootPaper>
    </Container>
  );
};

const App = () => (
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <UploadPhoto />
    </RecoilRoot>
  </ThemeProvider>
);

export default App;
