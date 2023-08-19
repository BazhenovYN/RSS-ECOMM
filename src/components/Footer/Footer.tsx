import { AUTHORS, YEAR_OF_CREATION } from 'constants/const';
import { Box, Link, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { ReactComponent as RssLogo } from 'assets/svg/rss.svg';
import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

function Footer() {
  const cn = classNames.bind(styles);
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        py: 2,
      }}>
      <Link href="https://github.com/BazhenovYN/RSS-ECOMM/">
        <GitHubIcon className={cn('logo')} fontSize="large" />
      </Link>
      <Typography variant="body1">
        © {YEAR_OF_CREATION} {AUTHORS}
      </Typography>
      <Link href="https://rs.school/js/">
        <RssLogo className={cn('logo', 'rss')} />
      </Link>
    </Box>
  );
}

export default Footer;
