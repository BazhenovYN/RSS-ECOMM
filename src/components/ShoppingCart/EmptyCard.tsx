import { Box, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import LinkButton from 'components/LinkButton';
import img from 'assets/img/orange-slices.jpg';

function EmptyCard() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography variant="h4">Your basket is empty</Typography>
      <Typography variant="body1" mb={2} fontWeight="fontWeightMedium" color={orange[700]}>
        Do you want some fruit?
      </Typography>
      <LinkButton title="Go to catalog" link="/catalog" />
      <Box component="img" sx={{ maxWidth: '50vw' }} src={img} />
    </Box>
  );
}

export default EmptyCard;
