import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './config/apolloClient'
import Dashboard from './pages/Dashboard'

const App: React.FC = () => (
  <ApolloProvider client={apolloClient}>
    <Dashboard />
  </ApolloProvider>
)

export default App
