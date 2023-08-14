import { Box, Link, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Link href="https://github.com/BazhenovYN/RSS-ECOMM/tree/develop">GitHub</Link>
      <Typography>©2023</Typography>
      <Link href="https://rs.school/index.html">RSSchool</Link>
    </Box>
  );
}

export default Footer;
