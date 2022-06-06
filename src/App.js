import React from 'react'
import {
  ChakraProvider,
  Flex
} from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import NavBar from './components/NavBar/NavBar'

import AppRouter from './routes/AppRouter'
import { AuthProvider } from './context/AuthContext'

const App = () => (
  <ChakraProvider resetCSS>
    <BrowserRouter>
      <AuthProvider>
        <Flex height="100%" justifyContent="space-between" flexDirection="column">
          <NavBar />
          <Flex 
            height="90vh" 
            width="100%" 
            justifyContent="center"
            alignItems="center"
            padding={10}
            flexDirection="column"
          >
            <AppRouter />
          </Flex>
        </Flex>
      </AuthProvider>
    </BrowserRouter>
  </ChakraProvider>
)

export default App
