import { ReactNode, useContext, useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import AppContext from 'context';

interface ContentLoaderWrapperProps {
  loadingLogic: () => Promise<void>;
  children: ReactNode;
}

function ContentLoaderWrapper({ loadingLogic, children }: ContentLoaderWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  const appContext = useContext(AppContext);
  const setMessage = appContext?.setMessage;

  useEffect(() => {
    setIsLoading(true);
    loadingLogic()
      .catch((error) => {
        if (setMessage)
          setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
      })
      .finally(() => setIsLoading(false));
  }, [loadingLogic, setMessage]);

  return isLoading ? (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <CircularProgress />
    </Box>
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
}

export default ContentLoaderWrapper;
