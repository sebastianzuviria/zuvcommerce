import {
    Flex,
    Box,
    // Image,
    Button,
    Avatar,
    Text
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import CartWidget from 'components/CartWidget/CartWidget'

import { useAuth } from 'context/AuthContext'

const NavBar = () => {
    const navigate = useNavigate()

    const { user } = useAuth()

    return (
        <Box
            height="10%"
            width="100%"
            backgroundColor="#eeeeee"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            padding={2}
        >
            {/* <Image height="100%" width="5%" /> */}
            <Text fontSize="2xl" cursor='default'>Ecommerce</Text>
            <Flex width="60%" p={0} justifyContent="space-around">
                <Button 
                    variant="solid" 
                    size="md" 
                    backgroundColor="#ffffff"
                    onClick={() => navigate('/')}
                >
                    Products
                </Button>
                <Button variant="solid" size="md" backgroundColor="#ffffff">
                    About
                </Button>
                <Button variant="solid" size="md" backgroundColor="#ffffff">
                    Contact us
                </Button>
                
                {
                    user && <CartWidget />
                }

            </Flex>
            {
                user 
                    ?   <Avatar 
                            name={user.name} 
                            src={user.photoUrl}
                            onClick={() => navigate('/profile')}
                            cursor='pointer'
                        />
                    :   <Button 
                            variant="solid" 
                            size="md" 
                            backgroundColor="#ffffff"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
            }
         </Box>
    )
}

export default NavBar