import { useRouter } from "next/router";
import EyeClosed from "../components/eye-hide";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import EyeOpen from "../components/eye-open";
import { authLogin, getUserApi } from "../services/api.service";
import SignUp from "./sign-up";
// import TotalContacts from "../components/total-contacts";

function ContactManagement() {
  // const [sign, setSign] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signup, setSignUp] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        // .max(8, "Must be 8 characters or less")
        .min(6)
        .required("Required"),
    }),
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      const token = await authLogin(values);

      localStorage.setItem("authToken", token.token);

      const user = await getUserApi();
      const userData = JSON.stringify(user)
      localStorage.setItem("user", userData);
      router.push("/total-contacts");
    },
  });
  return (
    <div className="login-outer-page">
      {signup ? (
        <div className="showsignup">
          <SignUp />
        </div>
      ) : (
        <div className="login-inner-page">
          <div className="logo-title">Logo</div>
          <div className="credentials-title">
            Enter your credentials to access your account
          </div>
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <div className="email">
              <input
                id="email"
                className="mail-id"
                type="email"
                placeholder="Mail ID"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <span className="error" style={{ color: "red" }}>
                {formik.errors.email}
              </span>
            </div>

            <div className="password-eye-error">
              <div className="password-eye">
                <input
                  id="password"
                  className="password"
                  // type='password'
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type={showPassword ? "text" : "password"}
                />
                {/* <label onClick={()=>setShowPassword(!showPassword)}> {showPassword?'hide':'show'}</label> */}
                <label onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOpen /> : <EyeClosed />}
                </label>
              </div>
              <span className="error" style={{ color: "red" }}>
                {formik.errors.password}
              </span>
            </div>
            <button
              type="submit"
              className="Sign-in"
              // onClick={() => router.push("/total-contacts")}
            >
              Sign In
            </button>
            <button
              type="button"
              className="Sign-up"
              onClick={() => setSignUp(true)}
              // onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ContactManagement;

// import { useRouter } from "next/router";
// import EyeClosed from "../components/eye-hide";
// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import EyeOpen from "../components/eye-open";
// import { authLogin } from "../services/api.service";
// // import TotalContacts from "../components/total-contacts";
// function ContactManagement() {
//   // const [sign, setSign] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     onSubmit: async (values) => {
//       alert(JSON.stringify(values, null, 2));
//       // formik.resetForm();
//       const loginpass = await authLogin(values);
//       const getdata = await loginpass;
//       console.log(getdata, "ss");
//     },
//     // let regularExpression  = /^[a-zA-Z0-9!@#$%^&*]/,

//     validationSchema: Yup.object({
//       email: Yup.string().email("Invalid email address").required("Required"),
//       password: Yup.string()
//         .max(8, "Must be 8 characters or less")
//         .min(6)
//         .required("Required"),
//     }),
//   });
//   return (
//     <div className="login-outer-page">
//       <div className="login-inner-page">
//         <div className="logo-title">Logo</div>
//         <div className="credentials-title">
//           Enter your credentials to access your account
//         </div>
//         <form className="login-form" onSubmit={formik.handleSubmit}>
//           <div className="email">
//             <input
//               id="email"
//               className="mail-id"
//               type="email"
//               placeholder="Mail ID"
//               onChange={formik.handleChange}
//               value={formik.values.email}
//             />
//             <span className="error" style={{ color: "red" }}>
//               {formik.errors.email}
//             </span>
//           </div>

//           <div className="password-eye-error">
//             <div className="password-eye">
//               <input
//                 id="password"
//                 className="password"
//                 // type='password'
//                 placeholder="Password"
//                 onChange={formik.handleChange}
//                 value={formik.values.password}
//                 type={showPassword ? "text" : "password"}
//               />
//               {/* <label onClick={()=>setShowPassword(!showPassword)}> {showPassword?'hide':'show'}</label> */}
//               <label onClick={() => setShowPassword(!showPassword)}>
//                 {" "}
//                 {showPassword ? <EyeOpen /> : <EyeClosed />}
//               </label>
//             </div>
//             <span className="error" style={{ color: "red" }}>
//               {formik.errors.password}
//             </span>
//           </div>
//           <button
//             type="submit"
//             className="Sign-in"
//             onClick={() => router.push("/total-contacts")}
//           >
//             Sign In
//           </button>
//           <button
//             type="button"
//             className="Sign-up"
//             onClick={() => router.push("/sign-up")}
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ContactManagement;
