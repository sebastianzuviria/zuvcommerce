import { Text, Spinner, Flex } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import ItemManager from 'components/ItemManager/ItemManager'
import ItemsManagerControls from "components/ItemsManagerControls/ItemsManagerControls"

import { useProducts } from "services/firebase/firestore/products"

const ItemsManagerContainer = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { getProducts, deleteProduct } = useProducts()

    useEffect(() => {
        getProducts().then(products => {
            setProducts(products)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, []) //eslint-disable-line


    const handleDeleteProduct = (id) => {
        deleteProduct(id).then(isDeleted => {
            if(isDeleted) {
                const newProducts = products.filter(prod => prod.id !== id)
                setProducts(newProducts)
            }
        })
    }

    if(loading) {
        return (
            <Flex height='100%' flexDirection='column' justifyContent='center'>
                <Spinner />
            </Flex>
        )
    }

    return (
        <Flex height='100%' flexDirection='column' justifyContent='flex-start' alignItems='center'>
            <ItemsManagerControls />
            { products.map(prod => <ItemManager key={prod.id} {...prod} handleDeleteProduct={handleDeleteProduct}/>)}
        </Flex>
    )
}

export default ItemsManagerContainer