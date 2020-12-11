import Layout from '../../components/Layout';
import axiosClient from '../../config/axios';
import React, { useState, useContext } from 'react';
// generate static files for every link /link/123123 /link/1 /link/2
import appContext from '../../context/app/appContext';
import Alert from '../../components/Alert';



export async function getServerSideProps({ params }) {

  const { link } = params;

  const response = await axiosClient.get(`/api/links/${link}`);
  console.log(response.data);
  return {
    props: {
      link: response.data
    }
  }
}

export async function getServerSidePaths() {
  const links = await axiosClient.get('/api/links');
  return {
    paths: links.data.links.map( link => ({
      params: { link : link.url }
    })),
    fallback: false
  }
}

const defaultComponent = ( {link} ) => {
  console.log('link', link)
  // connect to state
  const AppContext = useContext(appContext);
  const { showAlert, msgFile } = AppContext;

  const [ hasPassword, setHasPassword ] = useState(link.password);
  const [ password, setPassword ] = useState('');


  const verifyPassword = async e => {
    e.preventDefault();
    try {
      const response = await axiosClient.post(`/api/links/${link.link}`, {password});
      setHasPassword(response.data.password);
    } catch (error) {
      showAlert(error.response.data.msg)
    }
  }

  return (
    <Layout>
      { hasPassword ? (
        <>
        <p className="text-center">Este enlace esta protegido por un password, colocalo a continuación</p>
        { msgFile  && <Alert message={msgFile} />}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form 
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit = { e => verifyPassword(e) }
              >
              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="name"
                  >
                    Contraseña
                  </label>
                <input
                  className="shadow appereance-none border-rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  id="name"
                  placeholder="Escribe la contraseña"
                  value={password || ''}
                  onChange={ e => setPassword(e.target.value) }
                  />

                <input
                  type="submit" 
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                  value="Validar contraseña"
                />

              </div>
            </form>
          </div>
        </div>
         
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo</h1>
          <div className="flex items-center justify-center mt-10">
            <a href={`${process.env.backendURL}/api/files/${link.file}`} className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer">Aquí</a>
          </div>
        </>
      ) }
      
     
    </Layout>
  )
}

export default defaultComponent;