import * as Yup from "yup";
import i18next from 'i18next';

const validationSchema = Yup.object().shape({
  email: Yup.string()
            .required(i18next.t("emailRequiredField"))
            .email(i18next.t('invalidEmailFormat')),
  password: Yup.string()
               .required(i18next.t("passwordRequiredField"))
               .min(8, i18next.t('passwordAtLeast8Characters')),
});

export default validationSchema;
