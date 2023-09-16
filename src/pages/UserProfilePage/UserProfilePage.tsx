import { useState, ReactNode, SyntheticEvent, useCallback } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import type { Customer } from '@commercetools/platform-sdk';
import ContentLoaderWrapper from 'components/ContentLoaderWrapper';
import { getUserCustomer } from 'services/sdk/customer';
import UserAddresses from './UserAddresses';
import UserInformation from './UserInformation';
import UserPassword from './UserPassword';

interface ITabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const defaultCustomer: Customer = {
  id: '',
  version: 0,
  createdAt: '',
  lastModifiedAt: '',
  email: '',
  addresses: [],
  isEmailVerified: false,
  authenticationMode: '',
};

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

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [user, setUser] = useState<Customer>(defaultCustomer);

  const getUser = useCallback(async () => {
    const data = await getUserCustomer();
    setUser(data);
  }, []);

  return (
    <ContentLoaderWrapper loadingLogic={getUser}>
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
    </ContentLoaderWrapper>
  );
}

export default UserProfilePage;
