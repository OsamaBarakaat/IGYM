import * as Yup from "yup";

export const classValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  cost: Yup.number()
    .required("Cost is required")
    .positive("Cost must be a positive number")
    .min(1, "Cost must be at least 1"),
  duration: Yup.number()
    .required("Duration is required")
    .positive("Duration must be a positive number")
    .min(1, "Duration must be at least 1"),
  capacity: Yup.number()
    .required("Capacity is required")
    .positive("Capacity must be a positive number")
    .min(1, "Capacity must be at least 1"),
  plan: Yup.string().required("Name is required"),
  repeatType: Yup.string().required("Type is required"),
  repeatTime: Yup.string().required("Time is required"),
  repeatDay: Yup.string(),
});
