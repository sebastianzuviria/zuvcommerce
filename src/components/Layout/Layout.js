import {
    Flex
} from '@chakra-ui/react'

import NavBar from 'components/NavBar/NavBar'

const Layout = ({ children }) => {
    return (
        <Flex height="100%" justifyContent="space-between" flexDirection="column">
            <NavBar />
            <Flex 
            height="90vh" 
            width="100%" 
            justifyContent="center"
            alignItems="center"
            padding={10}
            flexDirection="column"
            >
                { children }
            </Flex>
        </Flex>
    )
}

export default Layout