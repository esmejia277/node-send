import { useContext, useEffect } from 'react';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import Layout from '../components/Layout'
import Dropzone from '../components/Dropzone';
import Link from 'next/link';
import Alert from '../components/Alert';

const Index = () => {

  // Get user from Storage
  const AuthContext = useContext(authContext);
  const { authenticatedUser } = AuthContext;

  // Get error message
  const AppContext = useContext(appContext);
  const { msgFile, url } = AppContext;
  

  useEffect(() => {
    authenticatedUser();
  }, [])

  return ( 
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {
          url ? (
            <>
            <p className="text-center text-2xl mt-10">
              <span className="font-bold text-red-700 text-3xl uppercase">Tu URL es </span>
                {process.env.frontendURL + '/links/' + url}
            </p>
            <button
              type="button" 
              className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
              onClick={ () => navigator.clipboard.writeText(process.env.frontendURL + '/links/' + url) }
            >
              Copiar enlace
            </button>
              
            
            </>
          ) : (
            <>
            { msgFile  && <Alert message={msgFile} />}
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Compartir archivos de forma sencilla y privada</h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">
                    React Node Send 
                  </span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <Link href="/crearcuenta">
                  <a className="text-red-500 font-bold text-lg hover:text-red-700"> Crea una cuenta para mayores beneficios </a>
                </Link>
              </div>
            </div>
            </>
          )
        }

      </div>

    </Layout>
  );
}
 
export default Index;
