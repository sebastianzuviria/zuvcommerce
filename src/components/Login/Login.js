import { useState } from 'react'
import { Button, Flex, Spinner } from "@chakra-ui/react"
import { useAuth } from "../../context/AuthContext"

const Login = () => {
    const [loading, setLoading] = useState(false)
    const { signinWithGithub } = useAuth()

    const handleLogin = () => {
        setLoading(true)
        signinWithGithub()
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
            <Button
            variant="solid" 
            size="md" 
            backgroundColor="#ffffff"
            onClick={handleLogin}
            >
                Login with GitHub
            </Button>
        </>
    )
}

export default Login