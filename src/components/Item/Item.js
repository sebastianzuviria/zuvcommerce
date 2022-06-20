import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    // Button
  } from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom';
    
  const Item = ({ id, name, imageUrl, category, price}) => {
    const navigate = useNavigate()

    return (
        <Center py={12} onClick={() => navigate(`/detail/${id}`)} cursor='pointer'>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                minW={'280px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={0}
                h={375}
            >
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                    transition: 'all .3s ease',
                    content: '""',
                    w: 'full',
                    h: 'full',
                    pos: 'absolute',
                    top: 5,
                    left: 0,
                    backgroundImage: `url(${imageUrl})`,
                    filter: 'blur(15px)',
                    zIndex: -1,
                    }}
                    _groupHover={{
                    _after: {
                        filter: 'blur(20px)',
                    },
                    }}
                >
                <Image
                    rounded={'lg'}
                    height={230}
                    width={282}
                    objectFit={'cover'}
                    src={imageUrl}
                />
                </Box>
                <Stack pt={10} align={'center'}>
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        {category}
                    </Text>
                    <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500} h='24px' noOfLines={1}>
                        {name}
                    </Heading>
                    <Stack direction={'row'} align={'center'}>
                    <Text fontWeight={800} fontSize={'xl'}>
                        ${price}
                    </Text>
                    <Text textDecoration={'line-through'} color={'gray.600'}>
                        ${price + 100}
                    </Text>
                    </Stack>
                </Stack>
            </Box>
        </Center>
    );
}

  export default Item