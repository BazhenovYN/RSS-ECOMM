import { useState, ReactNode, SyntheticEvent, useContext } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import AppContext from 'context';
import UserAddresses from './UserAddresses';
import UserInformation from './UserInformation';
import UserPassword from './UserPassword';

interface ITabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel({ children, value, index, ...other }: ITabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function UserProfilePage() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const appContext = useContext(AppContext);
  const user = appContext?.user;
  const setUser = appContext?.setUser;

  return user && setUser ? (
    <Box sx={{ width: '100%' }}>
      <Typography component="h2" variant="h2" mb={2}>
        User Profile
      </Typography>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="tabs" centered>
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Password" {...a11yProps(1)} />
          <Tab label="Addresses" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <UserInformation user={user} setUser={setUser} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <UserPassword user={user} setUser={setUser} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <UserAddresses user={user} setUser={setUser} />
      </CustomTabPanel>
    </Box>
  ) : (
    <div>User not found</div>
  );
}

export default UserProfilePage;
