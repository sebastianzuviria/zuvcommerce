import { useState } from 'react'
import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Text,
    Button
  } from '@chakra-ui/react';
  import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import AddToCart from '../AddToCart/AddToCart';

import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext';
  

const Rating = ({ rating = 4.2, numReviews = 36 }) => {
    return (
      <Box d="flex" alignItems="center">
          <Flex>
        {Array(5)
          .fill('')
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: '1' }}
                  color={i < rating ? 'teal.500' : 'gray.300'}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
            }
            return <BsStar key={i} style={{ marginLeft: '1' }} />;
          })}
          </Flex>
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {numReviews} review{numReviews > 1 && 's'}
        </Box>
      </Box>
    );
  }
  
  const ItemDetail = ({ id, name, category, price, img, rating, numReviews, isNew, description, stock }) => {
    const [quantity, setQuantity] = useState(0)

    const navigate = useNavigate()

    const { user } = useAuth()

    const handleAddToCart = (number) => {
        setQuantity(number)
    }

    return (
        <Flex alignItems="flex-start" justifyContent="center" width='90%' height='40vh'>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                maxW="lg"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative"
                height='100%'
            >
                {isNew && (
                    <Circle
                    size="10px"
                    position="absolute"
                    top={2}
                    right={2}
                    bg="red.200"
                    />
                )}
    
                <Image
                    src={img}
                    alt={`Picture of ${name}`}
                    height='100%'
                    roundedTopLeft='lg'
                    roundedBottomLeft='lg'
                    width={282}
                    objectFit={'cover'}
                />
            </Flex>
            <Flex p="6" width='40vw' flexDirection='column' justifyContent='flex-start'>
                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                    {category}
                </Text>
                <Flex width='40vw' flexDirection='column' justifyContent='flex-start'>
                    <Box d="flex" alignItems="baseline">
                        {isNew && (
                            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                            New
                            </Badge>
                        )}
                    </Box>
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Box
                            fontSize="2xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            mb={6}
                        >
                            {name}
                        </Box>
                        { !user 
                            ?   <Button 
                                    variant="solid" 
                                    size="md" 
                                    backgroundColor="#eeeeee"
                                    onClick={() => navigate('/login')}
                                >
                                    Login and buy
                                </Button>
                            :   quantity > 0 
                                    ?   <Text>You added {quantity} {name}</Text>
                                    :   <AddToCart stock={stock} onAdd={handleAddToCart}/>
                        }
                    </Flex>
            
                        <Flex justifyContent="space-between" alignContent="center">
                        <Rating rating={rating} numReviews={numReviews} />
                        <Text fontWeight={800} fontSize={'2xl'}>
                            $ {price?.toFixed(2)}
                        </Text>
                    </Flex>
                </Flex>
                <Flex mt={10}>
                    <Box
                        fontSize="l"
                        fontWeight="semibold"
                        as='p'
                        lineHeight="tight"
                        overflow="hidden"
                    >
                        Description: {description}
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
  }
  
  export default ItemDetail;