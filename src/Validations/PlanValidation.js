import * as Yup from 'yup';


export const planValidationSchema = Yup.object().shape({
    name: Yup.string().required('Plan Name is required'),
    maxTrainees: Yup.number()
        .required('Max Trainees is required')
        .positive('Max Trainees must be a positive number')
        .min(1, 'Max Trainees must be at least 1'),
    cost: Yup.number()
        .required('Cost is required')
        .positive('Cost must be a positive number')
        .min(1, 'Cost must be at least 1'),
    duration: Yup.number().required('Duration is required').positive('Duration must be a positive number').min(1, 'Duration must be at least 1'),
    branches: Yup.number().required('Branch is required').positive('Branch must be a positive number').min(1, 'Branch must be at least 1'),
    description: Yup.string(),
});

