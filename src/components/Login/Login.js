import { useState } from 'react'
import { Button, Flex, Spinner, Input, Text } from "@chakra-ui/react"
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
        })
    }

    const handleLoginWithEmail = () => {
        setLoading(true)
        signin(userData.email, userData.password, () => {
            navigate(from, { replace: true })
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
        <>
            <Flex flexDirection="column" width="70%">
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

                <Button 
                    variant="solid" 
                    size="md" 
                    backgroundColor="#eeeeee"
                    mb={4}
                    onClick={handleLoginWithEmail}
                >
                    Login
                </Button>
            </Flex>
            <Button
            variant="solid" 
            size="md" 
            backgroundColor="#ffffff"
            onClick={handleLoginWithGithub}
            >
                Login with GitHub
            </Button>
        </>
    )
}

export default Login