import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';


const Header = () => {

  // rourting
  const router = useRouter();

  // Get user from Storage
  const AuthContext = useContext(authContext);
  const { user, authenticatedUser, logout } = AuthContext;

  const AppContext = useContext(appContext);
  const { cleanState } = AppContext;

  useEffect(() => {
    authenticatedUser();
  }, []);


  const redirectToHome = () => {
    router.push('/');
    cleanState();
  }

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <img 
        className="w-64 mb-8 md:mb-0 cursor-pointer"
        src="/logo.svg" 
        onClick={ () => redirectToHome() }
        />
      <div>
        {
          user ? (
            <div className="flex items-center">
              <p className="mr-2">Hola, {user.name} </p>
              <button 
                type="button"
                className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                onClick={ () => logout() }
              >Cerrar Sesión
              </button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Iniciar sesión</a>
              </Link>
              <Link href="/crearcuenta">
                <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Crear cuenta</a>
              </Link> 
            </>
          )
        }

      </div>
    </header>

  );
}
 
export default Header;