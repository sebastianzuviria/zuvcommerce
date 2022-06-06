import {     
    Icon,
    Flex,
    Button,
    Text
} from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'

const CartWidget = () => {
    const navigate = useNavigate()

    return (
        <Button variant="solid" size="md" backgroundColor="#aaeeee" onClick={() => navigate('/cart')}>
            <Flex justifyContent='center' alignItems='center'>
                <Icon as={FiShoppingCart} h={5} w={5} alignSelf={'center'} mr={3}/>
                <Text fontSize='lg'>0</Text>
            </Flex>
        </Button>
    )
}

export default CartWidget