import { DEFAULT_LANGUAGE } from 'constants/const';
import { useContext } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { yellow } from '@mui/material/colors';
import type { DiscountCode } from '@commercetools/platform-sdk';
import AppContext from 'context';
import welcomeImage from 'assets/img/welcome.jpg';
import fishImage from 'assets/img/grilled-salmon-fish.jpg';
import orangeImage from 'assets/img/many-round-orange-slices.jpg';

interface IProps {
  discountCode: DiscountCode;
}

const getPromoCodeLogo = (code: string): string => {
  if (code === 'FIRST30') {
    return welcomeImage;
  }
  if (code === 'FISH10') {
    return fishImage;
  }
  if (code === 'ORANGE') {
    return orangeImage;
  }
  return '';
};

function PromoCodeCard({ discountCode }: IProps) {
  const appContext = useContext(AppContext);
  const language = appContext?.language ?? DEFAULT_LANGUAGE;
  return (
    <Card sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100px',
          height: '48px',
          backgroundColor: yellow[600],
          padding: '8px',
          boxShadow: '0px 0px 14px 5px rgba(0,0,0,0.75)',
        }}>
        <Typography variant="h5">PROMO</Typography>
      </Box>
      <CardMedia component="img" height="200" image={getPromoCodeLogo(discountCode.code)} />
      <CardContent>
        {discountCode.description && <Typography>{discountCode.description[language]}</Typography>}
        <Typography variant="h5">{discountCode.code}</Typography>
      </CardContent>
    </Card>
  );
}

export default PromoCodeCard;
