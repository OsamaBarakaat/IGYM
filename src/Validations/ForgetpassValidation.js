import * as Yup from 'yup';

export const forgetpassValidationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email'),
});

export const resetpassValidationSchema = Yup.object().shape({
    newPassword: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});