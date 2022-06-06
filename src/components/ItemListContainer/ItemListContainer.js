import { Text, Spinner, Flex } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import ItemList from "components/ItemList/ItemList"

import { useProducts } from "services/firebase/firestore/products"

const ItemListContainer = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { getProducts } = useProducts()

    useEffect(() => {
        getProducts().then(products => {
            setProducts(products)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, []) //eslint-disable-line

    if(loading) {
        return (
            <Flex height='100%' flexDirection='column' justifyContent='center'>
                <Spinner />
            </Flex>
        )
    }

    return (
        <Flex height='100%' flexDirection='column' justifyContent='flex-start' alignItems='center'>
            <Text fontSize='2xl'>Products</Text>
            <ItemList products={products}/>
        </Flex>
    )
}

export default ItemListContainer