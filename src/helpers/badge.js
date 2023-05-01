import { Badge } from '@chakra-ui/react';

const badgeType = (type) => {
  switch (type) {
    case 'football':
      return <Badge colorScheme="purple">{type.toUpperCase()}</Badge>;
    case 'cars':
      return <Badge colorScheme="green">{type.toUpperCase()}</Badge>;
    case 'development':
      return <Badge colorScheme="red">{type.toUpperCase()}</Badge>;
    case 'fashion':
      return <Badge>{type.toUpperCase()}</Badge>;
  }
};

export { badgeType };
