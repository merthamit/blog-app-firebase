import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogBox from '../../components/BlogBox';
import useAuthContext from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import Blogs from './Blogs';
import Filter from './Filter';

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection('posts');
  const [filter, setFilter] = useState('all');

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const posts = documents
    ? documents.filter((document) => {
        switch (filter) {
          case 'all':
            return true;
          case 'mine':
            return document.createdBy.id === user.uid ? true : false;
          case 'cars':
          case 'game':
          case 'fashion':
          case 'development':
          case 'football':
            return document.category === filter;
          default:
            return true;
        }
      })
    : null;

  return (
    <>
      <Filter changeFilter={changeFilter} />
      <Blogs documents={posts} />
    </>
  );
}
