import * as Yup from 'yup';

export const SetNameValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
})