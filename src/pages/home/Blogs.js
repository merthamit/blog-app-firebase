import { Flex, Grid, Spinner } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import BlogBox from '../../components/BlogBox';
import { useCollection } from '../../hooks/useCollection';

export default function Blogs({ documents }) {
  if (!documents) {
    return (
      <Flex height="100vh" width="100vh">
        <Spinner position={'absolute'} top="50%" left="50%" />
      </Flex>
    );
  }

  return (
    <Grid
      mt={5}
      mb={2}
      templateColumns={[
        'repeat(1, 1fr)',
        'repeat(2, 1fr)',
        'repeat(3, 1fr)',
        'repeat(3, 1fr)',
      ]}
      gap={6}
    >
      {documents.map((blog) => (
        <Link exact to={`post/${blog.id}`}>
          <BlogBox {...blog} />
        </Link>
      ))}
    </Grid>
  );
}
