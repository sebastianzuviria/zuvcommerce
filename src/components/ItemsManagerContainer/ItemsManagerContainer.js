import { Spinner, Flex } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import ItemManager from 'components/ItemManager/ItemManager'
import ItemsManagerControls from "components/ItemsManagerControls/ItemsManagerControls"

import { useProducts } from "services/firebase/firestore/products"
import { useImageStorage } from "services/firebase/storage/images"

const ItemsManagerContainer = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { getProducts, deleteProduct } = useProducts()
    const { deleteImage } = useImageStorage()

    useEffect(() => {
        getProducts().then(products => {
            setProducts(products)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, []) //eslint-disable-line


    const handleDeleteProduct = (id, imageUrl) => {
        setLoading(true)

        deleteProduct(id).then(isDeleted => {
            if(isDeleted) {
                deleteImage(imageUrl)
                const newProducts = products.filter(prod => prod.id !== id)
                setProducts(newProducts)
            }
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
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
            <Flex flexDirection='column' width='70%'>
            { products.map(prod => <ItemManager key={prod.id} {...prod} handleDeleteProduct={handleDeleteProduct}/>)}
            </Flex>
        </Flex>
    )
}

export default ItemsManagerContainer