import {
    Box,
    useColorModeValue,
    Heading,
    Text,
    Flex,
    Button,
    Image
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const ItemManager = ({ id, name, imageUrl, price, handleDeleteProduct }) => {
    const navigate = useNavigate()

    const handleEditItem = (e) => {
        e.stopPropagation()
        navigate(`/backoffice/products/${id}/edit`)
    }

    const handleRemoveItem = (e) => {
        e.stopPropagation()
        handleDeleteProduct(id, imageUrl)
    }

    return (
        <Flex width='100%' onClick={() => navigate(`/detail/${id}`)} cursor='pointer' m={3}>
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
                <Flex justifyContent='space-around' alignItems='center'>
                    <Image
                        src={imageUrl}
                        alt={`Picture of ${name}`}
                        height='10vh'
                        roundedTopLeft='lg'
                        roundedBottomLeft='lg'
                        width={'10vh'}
                        objectFit={'cover'}
                        mr={20}
                    />
                    <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500} noOfLines={1} width='60%'>
                        {name}
                    </Heading>
                    <Flex justifyContent='space-around' width='20%'>
                        <Text fontWeight={800} fontSize={'xl'}>
                            ${price}
                        </Text>
                    </Flex>
                    <Flex justifyContent='space-around'>
                        <Button 
                                variant="solid" 
                                size="md" 
                                backgroundColor="#00d1ff"
                                color="#ffffff"
                                mx={1}
                                onClick={handleEditItem}
                            >
                                Edit
                        </Button>
                        <Button 
                                variant="solid" 
                                size="md" 
                                backgroundColor="#ff6666"
                                color="#ffffff"
                                mx={1}
                                onClick={handleRemoveItem}
                        >
                                Delete
                        </Button>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
}

  export default ItemManager