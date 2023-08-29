import validationSchemes from 'constants/validationSchemes';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Customer } from '@commercetools/platform-sdk';
import { Box, Button, Container, Stack } from '@mui/material';
import PasswordField from 'components/PasswordField';
import AppContext from 'context';

interface IProps {
  user: Customer | undefined;
}

interface IFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function UserPassword({ user }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'all' });

  const appContext = useContext(AppContext);
  const setMessage = appContext?.setMessage;

  const [editMode, setEditMode] = useState(false);

  const onSubmit = async (data: IFormValues): Promise<void> => {
    // eslint-disable-next-line no-console
    console.log(data);
    try {
      setEditMode(false);
      if (setMessage) setMessage({ severity: 'success', text: 'The password was successfully updated' });
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        data-testid="change-user-password-form"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
        my={8}
        sx={{ width: 1 }}>
        <Stack spacing={2}>
          <PasswordField
            id="currentPassword"
            label="Current password"
            disabled={!editMode}
            {...register('currentPassword', validationSchemes.password)}
            isError={!!errors.currentPassword}
            errorMessage={errors.currentPassword?.message}
          />
          <PasswordField
            id="newPassword"
            label="New password"
            disabled={!editMode}
            {...register('newPassword', validationSchemes.password)}
            isError={!!errors.newPassword}
            errorMessage={errors.newPassword?.message}
          />
          <PasswordField
            id="confirmNewPassword"
            label="Confirm new password"
            disabled={!editMode}
            {...register('confirmNewPassword', validationSchemes.password)}
            isError={!!errors.confirmNewPassword}
            errorMessage={errors.confirmNewPassword?.message}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={editMode}
            onClick={() => setEditMode(true)}>
            Edit
          </Button>
          <Button disabled={!editMode} fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Save
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default UserPassword;
