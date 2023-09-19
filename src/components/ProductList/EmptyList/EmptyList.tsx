import { Box, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import LinkButton from 'components/LinkButton';
import img from 'assets/img/berries.jpg';

function EmptyList() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography variant="h4">Your wish list is empty</Typography>
      <Typography variant="body1" mb={2} fontWeight="fontWeightMedium" color={orange[700]}>
        How about some juicy berries?
      </Typography>
      <LinkButton title="Go to catalog" link="/catalog" />
      <Box component="img" sx={{ maxWidth: '40vw' }} src={img} />
    </Box>
  );
}

export default EmptyList;
