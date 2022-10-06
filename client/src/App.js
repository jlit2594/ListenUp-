import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import SingleTrail from './pages/SingleTrail';

import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, setContext } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      <Router>
        <div className=''>
          <Header />
          <div className='container'>
            <Routes>
              <Route path="/"
              element={<Home />}
              />
              <Route path="/login"
              element={<Login />}
              />
              <Route path="/profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>
              <Route path="/trail/:id"
              element={<SingleTrail />}
              />

              <Route path='*'
              element={<NoMatch />}
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
