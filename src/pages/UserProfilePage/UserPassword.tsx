import validationSchemes from 'constants/validationSchemes';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Customer } from '@commercetools/platform-sdk';
import { Box, Button, Container, Stack } from '@mui/material';
import PasswordField from 'components/PasswordField';
import AppContext from 'context';
import { updateUserPassword } from 'services/sdk/customer';
import { PasswordUpdate } from 'types/types';

interface IProps {
  user: Customer | undefined;
  setUser: Dispatch<SetStateAction<Customer | undefined>>;
}

function UserPassword({ user, setUser }: IProps) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PasswordUpdate>({ mode: 'all' });

  const appContext = useContext(AppContext);
  const setMessage = appContext?.setMessage;

  const [editMode, setEditMode] = useState(false);

  const onSubmit = async (data: PasswordUpdate): Promise<void> => {
    if (!user?.email || !user?.version) {
      if (setMessage) setMessage({ severity: 'error', text: 'User data not found' });
      return;
    }
    try {
      const updatedUser = await updateUserPassword(user.email, data, user.version);
      setUser(updatedUser);
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
            {...register('confirmNewPassword', {
              ...validationSchemes.password,
              validate: (value) => {
                const newPassword = getValues('newPassword');
                return newPassword === value || `Password not matching`;
              },
            })}
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
