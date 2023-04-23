import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required!"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 characters minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character!"
    )
    .required("Required!"),
});

const handleSubmit = (values, { setSubmitting }) => {
  console.log(values);

  setSubmitting(false);
};

const LoginForm = () => {
  return (
    <div className="login-card">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, isSubmitting, touched }) => (
          <Form className="form">
            <div className="form-control">
              <Field type="email" name="email" placeholder="Email" />
              {errors.email && touched.email ? (
                <div className="error-message">
                  <ErrorMessage name="email" className="error-message" />
                </div>
              ) : null}
            </div>
            <div className="form-control">
              <Field type="password" name="password" placeholder="Password" />
              {errors.password && touched.password ? (
                <div className="error-message">
                  <ErrorMessage name="password" />
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="login-button"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
