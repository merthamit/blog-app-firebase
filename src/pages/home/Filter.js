import { Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const filterList = [
  'all',
  'mine',
  'football',
  'fashion',
  'development',
  'cars',
  'game',
];

export default function Filter({ changeFilter }) {
  const [currentFilter, setCurrentFilter] = useState('all');

  const handleClick = (newFilter) => {
    setCurrentFilter(newFilter);
    changeFilter(newFilter);
  };

  return (
    <>
      <Text mt={5} fontSize="sm">
        Blog Filter
      </Text>
      {filterList.map((f) => (
        <Button
          key={f}
          colorScheme={currentFilter === f ? 'pink' : 'pink'}
          size="xs"
          variant={currentFilter === f ? 'solid' : 'outline'}
          mr={2}
          onClick={() => handleClick(f)}
        >
          {f}
        </Button>
      ))}
    </>
  );
}
