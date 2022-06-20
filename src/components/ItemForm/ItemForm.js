import { useState, useEffect } from 'react' 
import { 
    Text, 
    Flex, 
    Input, 
    Button,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Spinner
} from "@chakra-ui/react"
import FileUpload from 'components/FileUpload/FileUpload'

import { useNavigate, useParams } from 'react-router-dom'

import { useProducts } from 'services/firebase/firestore/products'
import { useImageStorage } from 'services/firebase/storage/images'

import { parsePrice, formatPrice } from 'helpers/strings'

const ItemForm = () => {
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        imageUrl: '',
        price: 0,
        stock: 0,
        description: ''
    })
    const [productEditId, setProductEditId] = useState('')
    const [loading, setLoading] = useState(true)
    const [imageUpload, setImageUpload] = useState(null)

    const { addProduct, editProduct, getProductById } = useProducts()

    const { uploadImage, deleteImage } = useImageStorage()

    const navigate = useNavigate()

    const { productId } = useParams()

    useEffect(() => {
        if(productId) {
            setLoading(true)
            getProductById(productId)
                .then(product => {
                    const { id, ...dataWithoutId} = product
                    setProductEditId(id)
                    setProductData({...dataWithoutId})
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
    }, [productId]) //eslint-disable-line

    const handleCreateProduct = async () => {
        setLoading(true)

        try {
            let imgUrl = ''
            
            if(imageUpload) {
                imgUrl = await uploadImage(imageUpload)
            }

            const newProduct = {
                ...productData, 
                imageUrl: imgUrl, 
                price: parseInt(productData.price), 
                stock: parseInt(productData.stock)
            }

            const idCreated = await addProduct(newProduct)
            navigate(`/detail/${idCreated}`) 
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleEditProduct = async () => {
        setLoading(true)

        try {
            let imgUrl = ''
            
            if(imageUpload) {
                imgUrl = await uploadImage(imageUpload)
                if(productData.imageUrl !== '')deleteImage(productData.imageUrl)
            }

            const newProduct = {
                ...productData, 
                imageUrl: imgUrl !== '' ? imgUrl : productData.imageUrl, 
                price: parseInt(productData.price), 
                stock: parseInt(productData.stock)
            }

            const isCreated = await editProduct(productEditId, newProduct)
            if(isCreated) navigate(`/detail/${productEditId}`)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleFile = (e) => {
        setImageUpload(e.target.files[0])
    }

    if(loading) {
        return (
            <Flex height='100%' flexDirection='column' justifyContent='center'>
                <Spinner />
            </Flex>
        )
    }

    return (
        <Flex 
            height='100%' 
            width='70%' 
            flexDirection='column' 
            justifyContent='flex-start' 
            alignItems='center' 
            backgroundColor='#ffffff'
            py={50}
            px={50}
        >
            <Text fontSize="2xl" mb={50}>{productId ? 'Edit product' : 'New Product'}</Text>
            <Flex flexDirection="column" width="100%">
                <Flex width="100%" m={5}>
                    <Text fontSize="xl" width="20vw">
                        Name
                    </Text>
                    <Input 
                        value={productData.name} 
                        onChange={({ target }) => setProductData({ ...productData, name: target.value})}
                        width='100%' 
                    />
                </Flex>
                <Flex width="100%" m={5}>
                    <Text fontSize="xl" width="20vw">
                        Category
                    </Text>
                    <Input 
                        value={productData.category}
                        onChange={({ target }) => setProductData({ ...productData, category: target.value})}                    
                    />
                </Flex>
                {/* <Flex width="100%" m={5}>
                    <Text fontSize="xl" width="20vw">
                        ImageUrl
                    </Text>
                    <Input 
                        value={productData.imageUrl} 
                        onChange={({ target }) => setProductData({ ...productData, imageUrl: target.value})}                    
                    />
                </Flex> */}
                <Flex width="100%" m={5} alignItems='center'>
                    <Text fontSize="xl" width="20vw">
                        Image
                    </Text>
                    { 
                        !imageUpload ? (
                            <FileUpload handleChange={handleFile}/> 
                        ) : ( 
                            <Flex alignItems='center'>
                                <Text mr={20}>{imageUpload.name}</Text>
                                <Button 
                                    onClick={() => setImageUpload(null)}
                                >Remove Image</Button>
                            </Flex>
                        ) }
                </Flex>
                <Flex width="100%" m={5}>
                    <Text fontSize="xl" width="20vw">
                        Price
                    </Text>
                    <NumberInput
                        value={formatPrice(productData.price)}
                        onChange={(valueString) => setProductData({ ...productData, price: parsePrice(valueString) })}
                        min={1}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
                <Flex width="100%" m={5}>
                    <Text fontSize="xl" width="20vw">
                        Description
                    </Text>
                    <Input 
                        value={productData.description} 
                        onChange={({ target }) => setProductData({ ...productData, description: target.value})}                    />
                </Flex>
                <Flex width="100%" m={5}>
                    <Text fontSize="xl" width="20vw">
                        Stock
                    </Text>
                    <NumberInput
                        value={productData.stock}
                        onChange={(valueString) => setProductData({ ...productData, stock: parsePrice(valueString) })}
                        min={0}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
                <Flex flexDirection='column' justifyContent='center' alignItems='center' mt={10}>
                    <Button 
                        variant="solid" 
                        size="md" 
                        backgroundColor="#00c04d"
                        color='#ffffff'
                        m={2}
                        onClick={productId ? handleEditProduct : handleCreateProduct}
                    >
                        {productId ? 'Confirm changes' : 'Create Product'}
                    </Button>
                    <Button 
                        variant="solid" 
                        size="md" 
                        backgroundColor="#ff6666"
                        color='#ffffff'
                        m={2}
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ItemForm