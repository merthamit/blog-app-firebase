import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useFirestore } from '../../hooks/useFirestore';
import { timestamp } from '../../firebase/config';
import useAuthContext from '../../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function PostComments({ id, document }) {
  const [content, setContent] = useState('');
  const { updateDocument } = useFirestore('posts');
  const { user } = useAuthContext();

  const handleSend = async () => {
    const comment = {
      comment: content,
      displayName: user.displayName,
      createdAt: timestamp.fromDate(new Date()),
      photoURL: user.photoURL,
      id: Math.random(),
    };
    setContent('');
    await updateDocument(document.id, {
      comments: [...document.comments, comment],
    });
  };

  return (
    <>
      <Text fontSize="3xl" mt={5}>
        Comments
      </Text>
      <Stack mb={5}>
        <Textarea
          height={'20vh'}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment."
        />
        <Button
          onClick={handleSend}
          width={'100%'}
          colorScheme="teal"
          variant="solid"
        >
          Send
        </Button>
      </Stack>
      <Stack mb={2}>
        {document.comments.map((com) => (
          <Box
            borderRadius={5}
            borderWidth="5px"
            padding={2}
            display={'flex'}
            mt={2}
            alignItems="center"
          >
            <Avatar name="Dan Abrahmov" src={com.photoURL} />
            <Flex flexDirection="column" ml={2} justifyContent="center">
              <Text fontWeight="semibold" as="h4" isTruncated color="black">
                {com.displayName}
              </Text>
              <Text
                color="gray.500"
                fontWeight="thin"
                letterSpacing="wide"
                fontSize="x-small"
                textTransform="uppercase"
                isTruncated
              >
                {formatDistanceToNow(com.createdAt.toDate(), {
                  addSuffix: true,
                })}
              </Text>
              <Text fontWeight="normal">{com.comment}</Text>
            </Flex>
          </Box>
        ))}
      </Stack>
    </>
  );
}
