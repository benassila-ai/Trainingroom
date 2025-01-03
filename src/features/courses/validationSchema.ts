import * as Yup from "yup";
import i18next from 'i18next';

const validationSchema = Yup.object().shape({
  duration: Yup.number().required(i18next.t("emailRequiredField")).positive().integer(),
  title: Yup.string()
		.required(i18next.t("titleRequiredField")),
	description: Yup.string(),
	level: Yup.string()
		.required(i18next.t("levelRequiredField")),
	maxEnrollment: Yup.number().required(i18next.t("maxEnrollmentRequiredField")).positive().integer(),
	category: Yup.string()
		.required(i18next.t("categoryRequiredField")),
	price: Yup.number().required(i18next.t("priceRequiredField")).positive().integer(),
});

export default validationSchema;
