import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { IoLogInOutline } from 'react-icons/io5';
import {
  Box,
  Flex,
  Button,
  IconButton,
  Stack,
  Avatar,
  Text,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import useAuthContext from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

export default function Navbar() {
  const [open, setOpen] = useState('none');
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <div>
      <Stack>
        <Flex mt={5} alignItems={'center'} justifyContent={'space-between'}>
          <NavLink exact to="/">
            <Button
              display={['none', 'none', 'flex', 'flex']}
              leftIcon={<FaHome />}
            >
              Home
            </Button>
          </NavLink>
          <Flex>
            <Flex
              alignItems={'center'}
              display={['none', 'none', 'flex', 'flex']}
            >
              {!user && (
                <>
                  <NavLink exact to="/login">
                    <Button
                      leftIcon={<IoLogInOutline />}
                      mr="2"
                      variant="outline"
                    >
                      Login
                    </Button>
                  </NavLink>
                  <NavLink exact to="/signup">
                    <Button
                      leftIcon={<IoLogInOutline />}
                      mr="2"
                      variant="outline"
                    >
                      Signup
                    </Button>
                  </NavLink>
                </>
              )}
              {user && (
                <>
                  <NavLink exact to="/signup">
                    <Button
                      leftIcon={<IoLogInOutline />}
                      mr="2"
                      variant="outline"
                      onClick={() => logout()}
                    >
                      Logout
                    </Button>
                  </NavLink>
                  <NavLink exact to="/create">
                    <Button
                      leftIcon={<IoLogInOutline />}
                      mr="2"
                      variant="outline"
                    >
                      Create
                    </Button>
                  </NavLink>
                </>
              )}
              {user && (
                <Button>
                  <Box display={'flex'} alignItems="center">
                    <Text fontSize="md" mr="2">
                      {user.displayName}
                    </Text>
                    <Avatar name="user" src={user.photoURL} />
                  </Box>
                </Button>
              )}
            </Flex>
            <IconButton
              size="lg"
              mr={2}
              aria-label="Open Menu"
              onClick={() => setOpen('flex')}
              icon={<GiHamburgerMenu />}
              display={['flex', 'flex', 'none', 'none']}
            />
          </Flex>
        </Flex>
      </Stack>
      <Flex
        w={'100%'}
        position="absolute"
        top={0}
        left={0}
        backgroundColor="gray.50"
        align={'center'}
        flexDirection={'column'}
        zIndex="20"
        height="100vh"
        justifyContent={'center'}
        display={open === 'none' ? 'none' : 'flex'}
      >
        {!user && (
          <>
            <NavLink exact to="/login">
              <Button
                onClick={() => setOpen('none')}
                leftIcon={<IoLogInOutline />}
                mr="2"
                variant="outline"
              >
                Login
              </Button>
            </NavLink>
            <NavLink exact to="/signup">
              <Button
                onClick={() => setOpen('none')}
                leftIcon={<IoLogInOutline />}
                mr="2"
                variant="outline"
              >
                Signup
              </Button>
            </NavLink>
          </>
        )}
        {user && (
          <>
            <NavLink exact to="/signup">
              <Button
                leftIcon={<IoLogInOutline />}
                mr="2"
                variant="outline"
                onClick={() => {
                  setOpen('none');
                  logout();
                }}
              >
                Logout
              </Button>
            </NavLink>
            <NavLink exact to="/create">
              <Button
                onClick={() => setOpen('none')}
                leftIcon={<IoLogInOutline />}
                mr="2"
                variant="outline"
              >
                Create
              </Button>
            </NavLink>
          </>
        )}
        {user && (
          <Button onClick={() => setOpen('none')}>
            <Box display={'flex'} alignItems="center">
              <Text fontSize="md" mr="2">
                {user.displayName}
              </Text>
              <Avatar name="user" src={user.photoURL} />
            </Box>
          </Button>
        )}
      </Flex>
    </div>
  );
}
