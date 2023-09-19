import { useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import { DiscountCode } from '@commercetools/platform-sdk';
import ContentLoaderWrapper from 'components/ContentLoaderWrapper';
import { getDiscountCodes } from 'services/sdk/cart';
import PromoCodeCard from './PromoCodeCard';

function PromoCodeList() {
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);

  const getPromoCodes = useMemo(() => {
    return async () => {
      const promoCodes = await getDiscountCodes();
      setDiscountCodes(promoCodes);
    };
  }, []);

  return (
    <ContentLoaderWrapper loadingLogic={getPromoCodes}>
      <Grid container spacing={3} data-testid="promo-code-list" sx={{ mb: 4 }}>
        {discountCodes.map((discountCode) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={discountCode.id}>
            <PromoCodeCard discountCode={discountCode} />
          </Grid>
        ))}
      </Grid>
    </ContentLoaderWrapper>
  );
}

export default PromoCodeList;
