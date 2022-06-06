import React from 'react'
import {
  ChakraProvider,
} from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import AppRouter from 'routes/AppRouter'
import { AuthProvider } from 'context/AuthContext'
import { CartProvider } from 'context/CartContext'
import Layout from 'components/Layout/Layout'

const App = () => (
  <ChakraProvider resetCSS>
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <Layout>
            <AppRouter />
          </Layout>
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </ChakraProvider>
)

export default App
