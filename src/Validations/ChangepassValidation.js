import * as Yup from 'yup';

export const changepassValidationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required').min(8, 'Old Password must be at least 8 characters'),
    newPassword: Yup.string().required('New Password is required').min(8, 'New Password must be at least 8 characters'),
    confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});