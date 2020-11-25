import React from 'react';
import Layout from '../components/Layout'

import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    
    validationSchema: Yup.object({
      email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
      password: Yup.string().required('La contraseña no puede estar vacía')

    }),
    onSubmit: ( values ) => {
      console.log('Enviando form', values)
    }
  })


  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Iniciar Sesión</h2>
      </div>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form 
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
            >

            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="email"
                >
                
                  Email
              </label>
              <input
                className="shadow appereance-none border-rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                id="email"
                placeholder="Email de usuario"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />

              { formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p> {formik.errors.email}  </p>
                </div> 
              ) : null }

            </div>


            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="password"
                >
                
                  Contraseña
              </label>
              <input
                className="shadow appereance-none border-rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="password"
                placeholder="Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
            </div>

            { formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p> {formik.errors.password}  </p>
                </div> 
              ) : null }

            <input
              type="submit" 
              className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
              value="Crear cuenta"
            />
          </form>
        </div>
      </div>
    </Layout>

  );
}
 
export default Login;