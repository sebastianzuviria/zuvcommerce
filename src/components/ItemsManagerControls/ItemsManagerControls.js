import {
    Flex,
    Box,
    Button,
    Text
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'


const NavBar = () => {
    const navigate = useNavigate()

    return (
        <Box
            height="10%"
            width="100%"
            backgroundColor="#ffffff"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            padding={2}
            mb={10}
        >
            <Text fontSize="2xl" cursor='default'>Products Manager</Text>
            <Flex width="60%" p={0} justifyContent="flex-end">
                <Button 
                    variant="solid" 
                    size="md" 
                    color='#ffffff'
                    backgroundColor="#00c04d"
                    onClick={() => navigate('/backoffice/products/create')}
                >
                    Add Product
                </Button>                
            </Flex>
         </Box>
    )
}

export default NavBar