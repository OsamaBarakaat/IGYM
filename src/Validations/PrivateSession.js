import * as Yup from "yup";

export const psValidationSchema = Yup.object().shape({
  cost: Yup.number()
    .required("Cost is required")
    .positive("Cost must be a positive number")
    .min(1, "Cost must be at least 1"),
  sessions: Yup.number()
    .required("Sessions Number is required")
    .positive("Sessions Number must be a positive number")
    .min(1, "Sessions Number must be at least 1"),
  expireIn: Yup.number()
    .required("Expire In is required")
    .positive("Expire In must be a positive number")
    .min(1, "Expire In must be at least 1"),
  durationType: Yup.string().required("Duration Type is required"),
});



export const psOfferValidationSchema = Yup.object().shape({
  cost: Yup.number()
    .required("Cost is required")
    .positive("Cost must be a positive number")
    .min(1, "Cost must be at least 1"),
  sessions: Yup.number()
    .required("Sessions is required")
    .positive("Sessions must be a positive number")
    .min(1, "Sessions must be at least 1"),
  expireAt: Yup.date()
    .required("Expiration date is required")
    .min(new Date(), "Expiration date cannot be in the past"),
});