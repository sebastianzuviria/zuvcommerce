import { useState } from 'react'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Flex,
    Tooltip,
    Icon,
    chakra
  } from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi';


const AddToCart = ({ initial = 1, stock = 0, onAdd }) => {
    const [number, setNumber] = useState(initial)

    return (
        <Flex mb={5} height='20%'>
            <NumberInput  mr={2} defaultValue={initial} min={1} max={stock} onChange={(valueString) => setNumber(parseInt(valueString))} noOfLines={1}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Tooltip
                label="Add to cart"
                bg="white"
                placement={'top'}
                color={'gray.800'}
                fontSize={'1.2em'}
            >
                <chakra.a href={'#'} display={'flex'}>
                    <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} onClick={() => onAdd(number)}/>
                </chakra.a>
            </Tooltip>
        </Flex>
    )
}

export default AddToCart