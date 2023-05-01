import { Badge, Box, Button, Image } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { badgeType } from '../helpers/badge';

export default function BlogBox({ header, subHeader, photoURL, category }) {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={photoURL} alt={photoURL} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          {badgeType(category)}
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {header}
        </Box>

        <Box>
          <Box as="span" color="gray.600" fontSize="sm">
            {subHeader}
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          <Button colorScheme="teal" size="sm">
            See More
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
