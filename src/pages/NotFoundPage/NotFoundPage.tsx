import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import img from 'assets/img/orange.jpg';

function NotFoundPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: { xs: '100px', sm: '200px' },
      }}>
      <Container maxWidth="md">
        <Grid
          container
          spacing={2}
          columns={{ xs: 6, sm: 12 }}
          alignItems="center"
          textAlign={{ xs: 'center', sm: 'left' }}>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Typography component="h1" variant="h1" fontWeight="fontWeightRegular">
                404
              </Typography>
              <Typography component="h4" variant="h4" fontWeight="fontWeightMedium" color={orange[700]}>
                Something is wrong :(
              </Typography>
            </Stack>
            <Stack mt={2} mb={2}>
              <Typography variant="body1">Sorry, we cannot find the page you are looking for.</Typography>
              <Typography variant="body1">But we found an orange for you.</Typography>
            </Stack>
            <Button variant="contained">Back Home</Button>
          </Grid>
          <Grid item xs={6}>
            <Box component="img" sx={{ width: '100%' }} src={img} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default NotFoundPage;
