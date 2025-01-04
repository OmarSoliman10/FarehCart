
import { useFormik } from "formik";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { UserContext } from "../../Context/UserContext";


export default function Register() {
  let navigate = useNavigate();
  const [apiError, setapiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {setUserLogin} = useContext(UserContext);

  function handleRegister(formValues){
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , formValues)
   .then((response)=>{
    if(response?.data?.message){// console.log(response.data.token);
      localStorage.setItem("userToken" , response.data.token);
      setUserLogin(response.data.token)
      navigate("/")
      setIsLoading(false);
    }

    })
   .catch((response)=> {
     setIsLoading(false);
    setapiError(response?.response?.data?.message);

  })

   console.log(formValues)

  }

  let validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'name minlenght is 3').max(15, 'name maxlenght is 15').required('name is required'),
    email: Yup.string().email('Invalid email address').required('email is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/i,'phone must be valid egyption number').required('phone is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9A-Z@#$%]{8,}$/i,'"The password must start with an uppercase letter, contain lowercase letters, numbers, and special characters (@, #, $, %), and be at least 8 characters long.')
    .required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')],'Password and rePassword doesnt match').required('rePassword is required'),
  })

let formik = useFormik({
  initialValues:{
    name: '',
    phone: '',
    email: '',
    password: '',
    rePassword:'',
  },
  validationSchema ,
  onSubmit:handleRegister
});


  return <>
  <div className="max-w-xl mx-auto py-6 px-2">
    <h2 className="text-3xl text-green-800 font-bold">Register Now</h2>

  {apiError?<div className="p-4 mb-4 my-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
    {apiError}
  </div> : null}

  <form className="mx-5 my-5" onSubmit={formik.handleSubmit}>

    <div className="relative z-0 w-full mb-5 group">
        <input id='name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name :</label>
    </div>
    {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.name}</div>
     : null}
      
    <div className="relative z-0 w-full mb-5 group ">
        <input id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email address :</label>
    </div>
    {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.email}</div>
     : null}
      

    <div className="relative z-0 w-full mb-5 group">
        <input id='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email Phone Number :</label>
    </div>
    {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.phone}</div>
     : null}

    <div className="relative z-0 w-full mb-5 group">
        <input id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password :</label>
    </div>
    {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.password}</div>
     : null}

    <div className="relative z-0 w-full mb-5 group">
        <input id='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
        <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your rePassword :</label>
    </div>
    {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.rePassword}</div>
     : null}

    <button type="submit" className="text-white bg-green-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      {isLoading?<i className="fas fa-spinner fa-spin"></i>: "Submit"}
    </button>

    </form>
  </div>
    </>
}
