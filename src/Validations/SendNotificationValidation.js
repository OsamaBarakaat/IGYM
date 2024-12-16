import * as Yup from 'yup';

export const SendNotificationValidation = Yup.object().shape({
    phone: Yup.string()
        .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Phone number is not valid')
        .required('Required'),
    message: Yup.string()
        .required('Required'),
});


export const SendNotificationAllValidation = Yup.object().shape({
  message: Yup.string().required("Required"),
});