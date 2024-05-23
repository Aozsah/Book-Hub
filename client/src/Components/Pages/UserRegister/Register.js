import * as React from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import RegisterSuccessfulPopup from './RegisterSuccessfulPopup';
import validator from "email-validator";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Register() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState('success');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (!validator.validate(email)) {
      setAlertMessage("Lütfen geçerli bir e-posta adresi girin.");
      setAlertSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage("Girdiğiniz şifreler eşleşmiyor!");
      setAlertSeverity('error');
      setOpenSnackbar(true);
      return;
    }
  
    axios
      .post("http://localhost:3001/register", {
        username,
        email,
        password,
        confirmPassword,
      })
      .then((response) => {
        if (response.status === 201) {
          setShowPopup(true);
        } else {
          setAlertMessage("Registration failed");
          setAlertSeverity('error');
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400 && error.response.data.message) {
          setAlertMessage(error.response.data.message);
          setAlertSeverity('error');
          setOpenSnackbar(true);
        } else {
          console.log(error);
          setAlertMessage("An unexpected error occurred.");
          setAlertSeverity('error');
          setOpenSnackbar(true);
        }
      });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Kaydol
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Kullanıcı adı"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Şifre"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Şifreyi Onayla"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Kayıt Ol
            </Button>
          </Box>
          {showPopup && <RegisterSuccessfulPopup onClose={handleClosePopup} />}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
              {alertMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
