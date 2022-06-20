import { useState, useEffect } from 'react' 
import { Text, Flex, Input, Button } from "@chakra-ui/react"
import { useAuth } from "context/AuthContext"

import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    const { user, updateUserData, signout } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if(user) {
            setName(user.name)
            setEmail(user.email)
            setAddress(user.address || '')
            setPhone(user.phone || '')
        }
    }, [user])

    const updateData = () => {
        const updatedData = {
            name, email, address, phone
        }

        updateUserData(updatedData)
    }

    return (
        <Flex height='100%' width='50%' flexDirection='column' justifyContent='flex-start' alignItems='center'>
            <Text fontSize="2xl">My Profile</Text>
            <Flex flexDirection="column" width="100%">
                <Flex width="100%" m={5}>
                    <Text fontSize="xl" width="20vw">
                        Name
                    </Text>
                    <Input 
                        value={name} 
                        onChange={({ target }) => setName(target.value)}
                        disabled={user?.provider !== 'password'}
                        width='100%' 
                    />
                </Flex>
                <Flex width="100%" m={5}>
                    <Text fontSize="xl" width="20vw">
                        E-mail
                    </Text>
                    <Input 
                        value={email}
                        onChange={({ target }) => setEmail(target.value)} 
                        disabled={user?.provider !== 'password'}
                    />
                </Flex>
                <Flex width="100%" m={5}>
                    <Text fontSize="xl" width="20vw">
                        Address
                    </Text>
                    <Input 
                        value={address} 
                        onChange={({ target }) => setAddress(target.value)}
                    />
                </Flex>
                <Flex width="100%" m={5}>
                    <Text fontSize="xl" width="20vw">
                        Phone
                    </Text>
                    <Input 
                        value={phone} 
                        onChange={({ target }) => setPhone(target.value)}
                    />
                </Flex>

                <Button 
                    variant="solid" 
                    size="md" 
                    backgroundColor="#eeeeee"
                    mb={4}
                    onClick={updateData}
                >
                    Update data
                </Button>

                <Button 
                    variant="solid" 
                    size="md" 
                    backgroundColor="#aaffff"
                    mb={4}
                    onClick={() => navigate(`/profile/${user.uid}/orders`)}
                >
                    Orders
                </Button>

                <Button 
                    variant="solid" 
                    size="md" 
                    mt={10}
                    backgroundColor="#ff6666"
                    color='#ffffff'
                    onClick={signout}
                >
                    Logout
                </Button>
            </Flex>
        </Flex>
    )
}

export default Profile