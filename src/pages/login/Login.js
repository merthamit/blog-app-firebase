import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

export default function Login() {
  const { login, isPending, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <Flex
      width={'100%'}
      height="100vh"
      alignItems={'center'}
      justifyContent="center"
    >
      <Box borderWidth="1px" padding="50px" mt="5">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb={5}
              id="email"
              type="email"
            />
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              mb={5}
              id="password"
              type="password"
            />
            {error && (
              <Alert width={'100%'} mb="5" status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
            {isPending && (
              <Button
                isLoading
                loadingText="Loading"
                colorScheme="teal"
                variant="outline"
                spinnerPlacement="start"
                width={'100%'}
              ></Button>
            )}
            {!isPending && (
              <Button type="submit" width={'100%'} colorScheme="blue">
                Click me
              </Button>
            )}
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
}
