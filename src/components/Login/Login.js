import { useState } from 'react'
import { Button, Flex, Spinner, Input, Text } from "@chakra-ui/react"
import { FaGithub } from 'react-icons/fa'

import { useAuth } from "context/AuthContext"
import { useLocation, useNavigate } from 'react-router-dom'


const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const { signinWithGithub, signin } = useAuth()

    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || "/";

    const handleLoginWithGithub = () => {
        setLoading(true)
        signinWithGithub(() => {
            navigate(from, { replace: true })
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleLoginWithEmail = () => {
        setLoading(true)
        signin(userData.email, userData.password, () => {
            navigate(from, { replace: true })
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
        <Flex 
            height='100%' 
            width='100%' 
            flexDirection='column' 
            justifyContent='flex-start' 
            alignItems='center' 
            backgroundColor='#ffffff'
            py={50}
            px={200}
        >
            <Text fontSize='2xl'>Login</Text>
            <Flex flexDirection='column' width='70%'>
                <Flex width="100%" m={5}>
                    <Text fontSize="xl" width="20vw">
                        E-mail
                    </Text>
                    <Input 
                        value={userData.email}
                        onChange={({ target }) => setUserData({...userData, email: target.value})} 
                    />
                </Flex>
                <Flex width="100%" m={5}>
                    <Text fontSize="xl" width="20vw">
                        Password
                    </Text>
                    <Input 
                        type='password'
                        value={userData.password} 
                        onChange={({ target }) => setUserData({...userData, password: target.value})}
                    />
                </Flex>
            </Flex>
            <Flex flexDirection='column'>
                <Button 
                    variant="solid" 
                    size="md" 
                    backgroundColor="#eeeeee"
                    my={5}
                    onClick={handleLoginWithEmail}
                >
                    Login
                </Button>
            
                <Button
                variant="solid" 
                size="md" 
                backgroundColor="#000000"
                color='#ffffff'
                my={5}
                onClick={handleLoginWithGithub}
                >
                <FaGithub style={{ marginRight: '10px'}}/>
                    Login with GitHub
                </Button>
            </Flex>
        </Flex>
    )
}

export default Login