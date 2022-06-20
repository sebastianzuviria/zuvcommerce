import {
    Flex
} from '@chakra-ui/react'

import Sidebar from '../Sidebar/Sidebar'

const Layout = ({ children }) => {
    return (
        <Flex height="100%" justifyContent="space-between" flexDirection="column">
            <Sidebar>
                { children }
            </Sidebar>    
        </Flex>
    )
}

export default Layout