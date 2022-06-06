import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner, Flex } from "@chakra-ui/react"

import { useProducts } from "services/firebase/firestore/products"

import ItemDetail from 'components/ItemDetail/ItemDetail'

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    const { productId } = useParams()

    const { getProductById } = useProducts()

    useEffect(() => {
        setLoading(true)

        getProductById(productId).then(product => {
            setProduct(product)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, [productId]) //eslint-disable-line

    if(loading) {
        return (
            <Flex height='100%' flexDirection='column' justifyContent='center'>
                <Spinner />
            </Flex>
        )
    }

    return(
        <ItemDetail {...product}/>
    )
}

export default ItemDetailContainer