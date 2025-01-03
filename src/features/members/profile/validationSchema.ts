import * as Yup from "yup";
import i18next from 'i18next';

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
               .required(i18next.t("fullnameRequiredField")),
  email: Yup.string()
            .required(i18next.t("emailRequiredField"))
            .email(i18next.t('invalidEmailFormat')),
  courses: Yup.array()
            .of(Yup.number().integer().positive().required())
            .required(i18next.t("coursesRequiredField"))
            .min(1, i18next.t('selectAtLeastOneCourse')),
  role: Yup.string()
          .required(i18next.t("roleRequiredField")),
  password: Yup.string()
          .required(i18next.t("passwordRequiredField"))
          .min(8, i18next.t('passwordAtLeast8Characters')),
});

export default validationSchema;
