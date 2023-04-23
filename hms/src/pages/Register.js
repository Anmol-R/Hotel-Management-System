import { React, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RegisterForm = () => {
  const [profilePicture, setProfilePicture] = useState("");
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required!"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required!"),
    email: Yup.string().email("Invalid email").required("Required!"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 characters minimum.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]+$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character!"
      )
      .required("Required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required!"),
    dateOfBirth: Yup.date()
      .max(new Date(), "Date of birth must be before current date!")
      .required("Required!"),
    gender: Yup.string().required("Required!"),
    profilePicture: Yup.mixed()
      .test("fileSize", "File size too large", (value) => {
        return !value || (value && value.size <= 1048576); // 1MB
      })
      .test("fileType", "Unsupported file format", (value) => {
        return (
          !value ||
          (value &&
            ["image/jpeg", "image/png", "image/gif"].includes(value.type))
        );
      }),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    profilePicture: "",
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfilePicture(reader.result);
    };
  };

  const radioOptions = [
    { key: "Male", value: "male" },
    { key: "Female", value: "female" },
    { key: "Other", value: "other" },
  ];
  
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };
  return (
    <div className="register-card">
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="form reg-form" style={{marginLeft:"1.5rem"}}>
            <div className="profile-picture">
              <label htmlFor="profilePicture">
                <div className="profile-image">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="profile-image-overlay">
                  <i className="fa fa-camera"></i>
                </div>
                <Field
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/jpeg, image/png, image/gif"
                  onChange={handleProfilePictureChange}
                />
              </label>
              {errors.profilePicture && touched.profilePicture && (
                <div className="error">{errors.profilePicture}</div>
              )}
            </div>
            <div className="form-control">
              <Field
                name="firstName"
                id="firstName"
                placeholder="First Name"
                type="text"
              />
              {errors.firstName && touched.firstName ? (
                <div className="error-message">
                  <ErrorMessage name="firstName" />
                </div>
              ) : null}
            </div>

            <div className="form-control">
              <Field
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                type="text"
              />
              {errors.lastName && touched.lastName ? (
                <div className="error-message">
                  <ErrorMessage name="lastName" />
                </div>
              ) : null}
            </div>

            <div className="form-control">
              <Field name="email" type="email" id="email" placeholder="Email" />
              {errors.email && touched.email ? (
                <div className="error-message">
                  <ErrorMessage name="email" />
                </div>
              ) : null}
            </div>

            <div className="form-control">
              <Field
                name="password"
                type="password"
                id="password"
                placeholder="Password"
              />
              {errors.password && touched.password ? (
                <div className="error-message">
                  <ErrorMessage name="password" />
                </div>
              ) : null}
            </div>
            <div className="form-control">
              <Field
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className="error-message">
                  <ErrorMessage name="confirmPassword" />
                </div>
              ) : null}
            </div>
            <div className="form-control">
              <Field name="gender">
                {({ field, form }) => {
                  return (
                    <div className="radio-control">
                      {radioOptions.map((option) => {
                        return (
                          <div className="radio-option" key={option.value}>
                            <input
                              type="radio"
                              id={option.value}
                              {...field}
                              value={option.value}
                              checked={field.value === option.value}
                              onChange={() => {
                                form.setFieldValue(field.name, option.value);
                              }}
                            />
                            <label htmlFor={option.value}>{option.key}</label>
                          </div>
                        );
                      })}
                      {form.errors[field.name] && form.touched[field.name] && (
                        <div className="error-message">
                          <ErrorMessage name="gender" />
                        </div>
                      )}
                    </div>
                  );
                }}
              </Field>
              {errors.gender && touched.gender ? (
                <div className="error-message">
                  <ErrorMessage name="gender" />
                </div>
              ) : null}
            </div>
            <div className="form-control">
              <Field name="dateOfBirth">
                {({ form, field }) => {
                  const { setFieldValue } = form;
                  const { value } = field;
                  return (
                    <DateView
                      id="dateOfBirth"
                      name="dateOfBirth"
                      selected={value}
                      placeholderText="Date of Birth"
                      onChange={(val) => setFieldValue("dateOfBirth", val)}
                    />
                  );
                }}
              </Field>
              {errors.dateOfBirth && touched.dateOfBirth ? (
                <div className="error-message">
                  <ErrorMessage name="dateOfBirth" />
                </div>
              ) : null}
            </div>
            <button
              className="submit-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
