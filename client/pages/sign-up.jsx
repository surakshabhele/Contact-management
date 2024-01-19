import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
// import async from "react-select/dist/declarations/src/async";
import * as Yup from "yup";
import { userRegister } from "../services/api.service";
import { useMutation, useQuery } from "react-query";
import { useAuthStore } from "../services/store.service";
function SignUp() {
  const [regi, setRegi] = useState();
  const [sign, setSign] = useState(false);
  const [enablUser, setEnableUser] = useState(false);
  // const setUser = useAuthStore((state) => state.setUser);
  // const setAuthToken = useAuthStore((state) => state.setAuthToken);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        // .max(8, "Must be 8 characters or less")
        .min(6)
        .required("Required"),

      password_confirmation: Yup.string().when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
    }),
    // const registerMut = useMutation(userRegister, {
    //   onSuccess: (data) => {
    //     if (data) {
    //       setAuthToken(data.token);
    //       setEnableUser(true);
    //     }
    //   },
    onSubmit: async (values) => {
     
      alert(JSON.stringify(values, null, 2));
      console.log(values, ".....values");
      const register = await userRegister(values);
      const data = await register;
      localStorage.setItem('token', data.token)
      // setRegi(register)
      formik.resetForm();
      // registerMut.mutate(values)
    },
  });
  return (
    <div className="login-outer-page">
      <div className="login-inner-page">
        <div className="logo-title">Logo</div>
        <div className="credentials-title">Create New Account</div>
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <div className="mail-wrap">
            <input
              className="mailid"
              placeholder="Mail ID"
              name="email"
              type="email"
              id="email"
              onChange={formik.handleChange}
              values={formik.values.email}
            />
            <span className="error" style={{ color: "red" }}>
              {formik.errors.email}
            </span>
          </div>
          <div className="password-wrap">
            <input
              className="password"
              placeholder="Password"
              name="password"
              type="password"
              id="password"
              onChange={formik.handleChange}
              values={formik.values.password}
            />
            <span className="error" style={{ color: "red" }}>
              {formik.errors.password}
            </span>
          </div>
          <div className="confirm-password">
            <input
              className="confirm-password"
              name="password_confirmation"
              placeholder="Confirm Password"
              type=" password"
              // id="confirm password"
              onChange={formik.handleChange}
              values={formik.values.password_confirmation}
            />
            <span className="error" style={{ color: "red" }}>
              {formik.errors.password_confirmation}
            </span>
          </div>
          <button
            type="submit"
            className="Signup"
            onClick={() => router.push("/")}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
