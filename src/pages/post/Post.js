import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Spinner,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import useDocuments from '../../hooks/useDocuments';
import { badgeType } from '../../helpers/badge';
import { AiOutlineDelete } from 'react-icons/ai';
import { useFirestore } from '../../hooks/useFirestore';
import { useHistory } from 'react-router-dom';
import PostComments from './PostComments';
import useAuthContext from '../../hooks/useAuthContext';

export default function Post() {
  const { id } = useParams();
  const { document } = useDocuments('posts', id);
  const { deleteDocument } = useFirestore('posts');
  const history = useHistory();
  const { user } = useAuthContext();

  const handleDelete = () => {
    deleteDocument(id);
    history.push('/');
  };

  if (!document) {
    return (
      <Flex height="100vh" width="100vh">
        <Spinner position={'absolute'} top="50%" left="50%" />
      </Flex>
    );
  }
  return (
    <Flex flexDirection={'column'} mt={5}>
      <Box padding={5} position="relative" borderWidth="1px">
        <Text fontSize="6xl">{document.header}</Text>

        <Image
          src={document.photoURL}
          width={'100%'}
          height="40vh"
          objectFit={'contain'}
          alt="Dan Abramov"
        />
        <Text
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          mt={3}
          isTruncated
        >
          Date: {document.createdAt.toDate().toDateString()}
        </Text>
        <Text fontSize="2xl">{document.subHeader}</Text>
        <Stack mb={2} mt={1} direction="row">
          {badgeType(document.category)}
        </Stack>
        <Text as="span" color="gray.600" fontSize="sm">
          {document.blogText}
        </Text>
        {user.uid === document.createdBy.id && (
          <IconButton
            icon={<AiOutlineDelete />}
            position={'absolute'}
            right="0"
            top="0"
            colorScheme="red"
            onClick={handleDelete}
          />
        )}
        <Box
          borderRadius={5}
          padding={2}
          display={'flex'}
          mt={5}
          maxWidth="200px"
          alignItems="center"
        >
          <Avatar name="Dan Abrahmov" src={document.createdBy.photoURL} />
          <Flex
            alignItems={'center'}
            flexDirection="column"
            ml={2}
            justifyContent="center"
          >
            <Text fontWeight="semibold" as="h4" isTruncated color="black">
              {document.createdBy.displayName}
            </Text>
            <Text fontWeight="hairline">- Author</Text>
          </Flex>
        </Box>
      </Box>
      <PostComments id={id} document={document} />
    </Flex>
  );
}
