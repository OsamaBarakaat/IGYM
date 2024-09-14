import * as Yup from 'yup';


export const planValidationSchema = Yup.object().shape({
  name: Yup.string().required("Plan Name is required"),
  cost: Yup.number()
    .required("Cost is required")
    .positive("Cost must be a positive number")
    .min(1, "Cost must be at least 1"),
  duration: Yup.number()
    .required("Duration is required")
    .positive("Duration must be a positive number")
    .min(1, "Duration must be at least 1"),
  description: Yup.string(),
  freezeDays: Yup.number()
    .required("freezeDays is required")
    .min(0, "freezeDays must be at least 0"),
  minFreezeDays: Yup.number()
    .required("minFreezeDays is required")
    .min(0, "minFreezeDays must be at least 0"),
  invitationsNumber: Yup.number()
    .required("invitationsNumber is required")
    .min(0, "invitationsNumber must be at least 0"),
  privateSessionsNumber: Yup.number()
    .required("privateSessionsNumber is required")
    .min(0, "privateSessionsNumber must be at least 0"),
  nutritionSessionsNumber: Yup.number()
    .required("nutritionSessionsNumber is required")
    .min(0, "nutritionSessionsNumber must be at least 0"),
    inBody: Yup.number()
    .required("inBody is required")
    .min(0, "inBody must be at least 0"),
});


export const offerValidationSchema = Yup.object().shape({
  cost: Yup.number()
    .required("Cost is required")
    .positive("Cost must be a positive number")
    .min(1, "Cost must be at least 1"),
  duration: Yup.number()
    .required("Duration is required")
    .positive("Duration must be a positive number")
    .min(1, "Duration must be at least 1"),
  expireAt: Yup.date()
    .required("Expiration date is required")
    .min(new Date(), "Expiration date cannot be in the past"),
});