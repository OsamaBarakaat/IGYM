import * as Yup from 'yup';

export const signinValidationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});
