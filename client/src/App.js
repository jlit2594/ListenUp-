import React from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
// import SingleTrail from './pages/SingleTrail';

import "./App.css";


const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header />
          <div className='main'>
            <Routes>
              <Route path="/"
              element={<Home />}
              />
              <Route path="/login"
              element={<Login />}
              />
              <Route path="/signup"
              element={<Signup />}
              />
              <Route path="/profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>
              {/* <Route path="/trail/:id"
              element={<SingleTrail />}
              /> */}

              <Route path='*'
              element={<NoMatch />}
              />
            </Routes>
          </div>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
