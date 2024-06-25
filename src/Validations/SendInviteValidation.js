import * as Yup from 'yup';

export const SendInviteValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('email is required'),
    role: Yup.string().required('Required'),
})

