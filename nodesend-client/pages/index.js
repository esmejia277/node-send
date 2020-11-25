import { useContext, useEffect } from 'react';
import authContext from '../context/auth/authContext';

import Layout from '../components/Layout'

const Index = () => {

  // Get user from Storage
  const AuthContext = useContext(authContext);
  const { authenticatedUser } = AuthContext;

  useEffect(() => {
    authenticatedUser();
  }, [])

  return ( 
    <Layout>
      <h1>Index</h1>

    </Layout>
  );
}
 
export default Index;
