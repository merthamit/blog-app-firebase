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
import useSignup from '../../hooks/useSignup';

export default function Signup() {
  const { error, isPending, signup } = useSignup();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!thumbnailError) {
      signup(email, password, displayName, thumbnail);
    }
  };

  const handleFileChange = (e) => {
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError('Please select a file');
      return;
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image');
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError('Image file size must be less than 100kb');
    }

    setThumbnail(selected);
    setThumbnailError(null);
  };

  return (
    <Flex
      width={'100%'}
      height="100vh"
      alignItems={'center'}
      justifyContent="center"
    >
      <form onSubmit={handleSubmit}>
        <Box borderWidth="1px" padding="50px">
          <FormControl as="fieldset">
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              mb={5}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
            />

            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              mb={5}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            <FormLabel htmlFor="dname">Display Name</FormLabel>
            <Input
              mb={5}
              id="dname"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              type="text"
            />

            <FormLabel htmlFor="file">Photo</FormLabel>
            <Input
              padding={1}
              mb={5}
              onChange={handleFileChange}
              id="file"
              type="file"
            />
            {thumbnailError && (
              <Alert mb="5" status="error">
                <AlertIcon />
                {thumbnailError}
              </Alert>
            )}
            {error && (
              <Alert width={'50%'} mb="5" status="error">
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
        </Box>
      </form>
    </Flex>
  );
}
