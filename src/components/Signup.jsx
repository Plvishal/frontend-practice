import { useFormik, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
function Signup() {
  const signupSchema = Yup.object({
    userName: Yup.string()
      .matches(
        /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/,
        'User name should be start with capital letter'
      )
      .min(4, 'User name aleast 4 character')
      .max(15, 'User name should not be greater than 14 chracter')
      .required('User name shuld not be blank'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email should not be empty'),
    password: Yup.string()
      .required('Password is required field')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Passowrd must contain at least one nuber')
      .matches(
        /[@!#$%&]/,
        'Passowrd must contain at least one special character'
      )
      .min(8, 'Passord must be at least 8 character'),
    confirm_password: Yup.string()
      .required('Conform is required field')
      .oneOf([Yup.ref('password')], "Your password does't match"),
  });
  const initialState = {
    userName: '',
    email: '',
    password: '',
    confirm_password: '',
  };
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialState,
      validationSchema: signupSchema,
      onSubmit: (value, { resetForm }) => {
        console.log(value);
        resetForm();
      },
    });

  return (
    <div className="w-[40%] flex justify-center items-center">
      <Formik>
        <Form
          onSubmit={handleSubmit}
          className=" w-full shadow-2xl p-3 rounded-md"
        >
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <Field
                name="userName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userName}
                placeholder=" User Name"
                className="bg-[#FFF] outline-none focus:ring-rose-100 p-2 rounded-lg w-full"
              />
              {errors.userName && touched.userName && (
                <div className="text-red-600 ml-3 text-sm">
                  {errors.userName}
                </div>
              )}
            </div>
            <div>
              <Field
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                onSubmit={handleSubmit}
                value={values.email}
                placeholder="Email Id"
                className="bg-[#FFF] outline-none focus:ring-rose-100 p-2 rounded-lg w-full"
              />
              {errors.email && touched.email && (
                <div className="text-red-600 ml-3 text-sm">{errors.email}</div>
              )}
            </div>
            <div>
              <Field
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                onSubmit={handleSubmit}
                value={values.password}
                placeholder="Password"
                className="bg-[#FFF] outline-none focus:ring-rose-100 p-2 rounded-lg w-full"
              />
              {errors.password && touched.password && (
                <div className="text-red-600 ml-3 text-sm">
                  {errors.password}
                </div>
              )}
            </div>
            <div>
              <Field
                name="confirm_password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                onSubmit={handleSubmit}
                value={values.confirm_password}
                placeholder="Confirm Password"
                className="bg-[#FFF] outline-none focus:ring-rose-100 p-2 rounded-lg w-full"
              />
              {errors.confirm_password && touched.confirm_password && (
                <div className="text-red-600 ml-3 text-sm">
                  {errors.confirm_password}
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-tr from-pink-400 via-blue-400 to-red-400 py-2 px-6 rounded-lg mt-10 m-auto"
          >
            submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Signup;
