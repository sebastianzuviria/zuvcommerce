import { SimpleGrid } from "@chakra-ui/react"

import Item from "components/Item/Item"

const ItemList = ({ products }) => {
    return (
        <SimpleGrid columns={3} spacing='50px'>
            { products.map(prod => <Item key={prod.id} {...prod} />)}
        </SimpleGrid>
    )
}

export default ItemList