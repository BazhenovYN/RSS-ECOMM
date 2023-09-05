import validationSchemes from 'constants/validationSchemes';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Container, Grid, TextField } from '@mui/material';
import type { Customer } from '@commercetools/platform-sdk';
import dayjs from 'dayjs';
import AppContext from 'context';
import DateOfBirthField from 'components/DateOfBirthField';
import { updateUserCustomer } from 'services/sdk/customer';
import type { UserDataUpdate } from 'types/types';

interface IProps {
  user: Customer | undefined;
  setUser: Dispatch<SetStateAction<Customer | undefined>>;
}

function UserInformation({ user, setUser }: IProps) {
  const methods = useForm<UserDataUpdate>({ mode: 'all' });
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = methods;
  const appContext = useContext(AppContext);
  const setMessage = appContext?.setMessage;

  const [editMode, setEditMode] = useState(false);

  const onSubmit = async (data: UserDataUpdate) => {
    if (!user?.version) {
      if (setMessage) setMessage({ severity: 'error', text: 'User data not found' });
      return;
    }
    try {
      const updatedUser = await updateUserCustomer(data, user.version);
      setUser(updatedUser);
      setEditMode(false);
      if (setMessage) setMessage({ severity: 'success', text: 'The account was successfully updated' });
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  useEffect(() => {
    if (user?.firstName) setValue('firstName', user.firstName);
    if (user?.lastName) setValue('lastName', user.lastName);
    if (user?.dateOfBirth) setValue('dateOfBirth', dayjs(user.dateOfBirth));
    if (user?.email) setValue('email', user.email);
  }, [user, setValue]);

  return (
    <Container maxWidth="xs">
      <Box my={8}>
        <FormProvider {...methods}>
          <Box
            data-testid="change-user-information-form"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
            sx={{ width: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  disabled={!editMode}
                  {...register('firstName', validationSchemes.firstName)}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  disabled={!editMode}
                  {...register('lastName', validationSchemes.lastName)}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <DateOfBirthField disabled={!editMode} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  disabled={!editMode}
                  {...register('email', validationSchemes.email)}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
            </Grid>
            {!editMode && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={editMode}
                onClick={() => setEditMode(true)}>
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
                  reset({
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    dateOfBirth: dayjs(user?.dateOfBirth),
                    email: user?.email,
                  });
                }}>
                Cancel
              </Button>
            )}
            {editMode && (
              <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Save
              </Button>
            )}
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
}

export default UserInformation;
