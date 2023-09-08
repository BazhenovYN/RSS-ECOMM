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
  user: Customer;
  setUser: Dispatch<SetStateAction<Customer>>;
}

function UserPassword({ user, setUser }: IProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<PasswordUpdate>({ mode: 'all' });

  const appContext = useContext(AppContext);
  const setMessage = appContext?.setMessage;

  const [editMode, setEditMode] = useState(false);

  const onSubmit = async (data: PasswordUpdate): Promise<void> => {
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
          {!editMode && (
            <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setEditMode(true)}>
              Edit
            </Button>
          )}
          {editMode && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => {
                setEditMode(false);
                reset();
              }}>
              Cancel
            </Button>
          )}
          {editMode && (
            <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Save
            </Button>
          )}
        </Stack>
      </Box>
    </Container>
  );
}

export default UserPassword;
