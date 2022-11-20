import { Routes, Route } from 'react-router-dom';
// import { lazy, Suspense } from 'react';

import { Container } from '@chakra-ui/react';
import { RegisterPage, LoginPage, ContactsPage, HomePage } from 'pages';
import { Header } from './allComponents';
import { useEffect } from 'react';
import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivateRoute';
import useAuth from 'hooks/useAuth';
import { useFetchCurrentUserMutation } from 'redux/userApi/authApi';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const { isRefreshing, isLogin } = useAuth();

  const [fetchCurrentUser] = useFetchCurrentUserMutation();

  const token = useAuth().takeToken;

  useEffect(() => {
    console.log('jgfjf', isLogin);
    if (token && !isLogin) {
      console.log('j111', isLogin);
      fetchCurrentUser();
    }
  }, [token, fetchCurrentUser, isLogin]);
  return (
    !isRefreshing && (
      <Container maxW="container.lg" mx={['auto', 'auto', 'auto', 'auto']}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<HomePage />} />
            <Route
              path="contacts"
              element={
                <PrivateRoute redirectTo="/login" component={ContactsPage} />
              }
            />
            <Route
              path="register"
              element={
                <RestrictedRoute
                  component={RegisterPage}
                  redirectTo="/contacts"
                />
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute component={LoginPage} redirectTo="/contacts" />
              }
            />
          </Route>
        </Routes>
      </Container>
    )
  );
}
