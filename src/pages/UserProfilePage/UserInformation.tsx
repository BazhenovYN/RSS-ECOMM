import validationSchemes from 'constants/validationSchemes';
import { useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Container, Grid, TextField } from '@mui/material';
import type { Customer } from '@commercetools/platform-sdk';
import dayjs from 'dayjs';
import AppContext from 'context';
import DateOfBirthField from 'components/DateOfBirthField';

interface IProps {
  user: Customer | undefined;
}

interface UserInformationFormData {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: dayjs.Dayjs;
}

function UserInformation({ user }: IProps) {
  const methods = useForm<UserInformationFormData>({ mode: 'all' });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;
  const appContext = useContext(AppContext);
  const setMessage = appContext?.setMessage;

  const [editMode, setEditMode] = useState(false);

  const onSubmit = async (data: UserInformationFormData) => {
    // eslint-disable-next-line no-console
    console.log(data);
    try {
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
            data-testid="registration-form"
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
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
}

export default UserInformation;
