import React from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  Divider
} from '@chakra-ui/react';
import {
  FiCompass,
  // FiStar,
  // FiSettings,
  FiMenu,
  FiUser,
  FiChevronDown,
  FiMail,
  FiBox
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { capitalize } from 'helpers/strings';

import CartWidget from 'components/CartWidget/CartWidget';

import { useAuth } from 'context/AuthContext';

const LinkItems = [
  { name: 'Products', icon: FiBox, path: '/' },
  { name: 'About us', icon: FiCompass, path: '/about' },
  { name: 'Contact us', icon: FiMail, path: '/contact' },
];

const AdminLinkItems = [
  { name: 'Products', icon: FiBox, path: '/backoffice/products' },
  { name: 'Users', icon: FiUser, path: '/backoffice/users' },
];

export default function SidebarWithHeader({
  children
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, signout } = useAuth()
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} user={user} signout={signout}/>
      <Flex ml={{ base: 0, md: 60 }} p="4" justifyContent='center'>
        {children}
      </Flex>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { user } = useAuth()

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Zuvcommerce
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
      {
        (user && user.role === 'admin') && (
          <Box>
            <Divider />
              <Text fontSize="xl" fontWeight="bold" p="4" mx="4">
                Dashboard
              </Text>
            {AdminLinkItems.map((link) => (
              <NavItem key={link.name} icon={link.icon} path={link.path}>
                {link.name}
              </NavItem>
            ))}
          </Box>
        )
      }
    </Box>
  );
};

const NavItem = ({ icon, children, path, ...rest }) => {
  const navigate = useNavigate()

  return (
    <Link onClick={() => navigate(path)} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, user, signout, ...rest }) => {
  const navigate = useNavigate()

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Zuvcommerce
      </Text>

      { user ? (

      <HStack spacing={{ base: '0', md: '6' }}>
        { user.role !== 'admin' && <CartWidget />}
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    user.photoUrl
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{user.name || capitalize(user.email.split('@')[0])}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user && user.role ? capitalize(user.role) : ''}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate(`/profile/${user.uid}`)}>Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={signout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack> ) : (
        <Button 
        variant="solid" 
        size="md" 
        backgroundColor="#ffffff"
        onClick={() => navigate('/login')}
      >
            Login
        </Button>
      )
    }
    </Flex>
  );
};