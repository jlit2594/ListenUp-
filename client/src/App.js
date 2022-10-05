import React from 'react';


import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        
      </Router>
    </ApolloProvider>
  );
}

export default App;
