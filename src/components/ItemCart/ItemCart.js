import {
    Box,
    useColorModeValue,
    Heading,
    Text,
    Flex,
    Button
  } from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom';

  import { useCart } from 'context/CartContext';
    
  const ItemCart = ({ id, name = 'iphone', quantity = 5, price = 1000}) => {
    const navigate = useNavigate()

    const { removeItem } = useCart()

    const handleRemoveItem = (e) => {
        e.stopPropagation()
        removeItem(id)
    }

    return (
        <Flex width='90vw' onClick={() => navigate(`/detail/${id}`)} cursor='pointer' m={3}>
            <Box
                role={'group'}
                p={6}
                maxW={'100%'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}
            >
                <Flex justifyContent='space-around'>
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {name}
                    </Heading>
                    <Flex justifyContent='space-around' width='50%'>
                        <Text fontWeight={800} fontSize={'xl'}>
                            Quantity: {quantity}
                        </Text>
                        <Text fontWeight={800} fontSize={'xl'}>
                            ${price}
                        </Text>
                        <Text fontWeight={800} fontSize={'xl'}>
                            Subtotal: ${price * quantity}
                        </Text>
                    </Flex>
                    <Button 
                            variant="solid" 
                            size="md" 
                            backgroundColor="#ff6666"
                            color="#ffffff"
                            onClick={handleRemoveItem}
                        >
                            Remove
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
}

  export default ItemCart