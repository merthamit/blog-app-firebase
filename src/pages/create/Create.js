import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { timestamp } from '../../firebase/config';
import useAuthContext from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';

const categories = [
  { label: 'Game', value: 'game' },
  { label: 'Development', value: 'development' },
  { label: 'Football', value: 'football' },
  { label: 'Cars', value: 'cars' },
  { label: 'Fashion', value: 'fashion' },
];

export default function Create() {
  const { user } = useAuthContext();
  const { addDocument, isPending, error } = useFirestore('posts');
  const history = useHistory();

  const [header, setHeader] = useState('');
  const [blogText, setBlogText] = useState('');
  const [subHeader, setSubHeader] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const project = {
      header,
      subHeader,
      createdBy,
      category,
      blogText,
      date: timestamp.fromDate(new Date(date)),
      comments: [],
    };

    if (thumbnail) {
      await addDocument(project, thumbnail);
      history.push('/');
    }
  };

  const onFileChange = (e) => {
    console.log('sa');
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
      <Box borderWidth="1px" padding="50px">
        <form onSubmit={onHandleSubmit}>
          <FormControl>
            <FormLabel htmlFor="header">Header</FormLabel>
            <Input
              mb={5}
              onChange={(e) => setHeader(e.target.value)}
              value={header}
              id="header"
              type="text"
            />

            <FormLabel htmlFor="subheader">Sub Header</FormLabel>
            <Input
              mb={5}
              onChange={(e) => setSubHeader(e.target.value)}
              value={subHeader}
              id="subheader"
              type="text"
            />

            <FormLabel htmlFor="subheader">Blog Text</FormLabel>
            <Textarea
              value={blogText}
              onChange={(e) => setBlogText(e.target.value)}
              placeholder="Here is a sample placeholder"
              size="sm"
            />

            <FormLabel htmlFor="file">Blog Photo</FormLabel>
            <Input
              onChange={onFileChange}
              padding={1}
              mb={5}
              id="file"
              type="file"
            />

            <FormLabel htmlFor="date">Blog Date</FormLabel>
            <Input
              padding={1}
              onChange={(e) => setDate(e.target.value)}
              value={date}
              mb={5}
              id="date"
              type="date"
            />

            <FormLabel htmlFor="category">Category</FormLabel>
            <Select
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              value={category}
              mb={5}
              placeholder="Select option"
            >
              {categories.map((category, i) => (
                <option key={i} value={category.value}>
                  {category.label}
                </option>
              ))}
            </Select>
            {thumbnailError && (
              <Alert mb="5" status="error">
                <AlertIcon />
                {thumbnailError}
              </Alert>
            )}
            {!isPending && (
              <Button type="submit" width={'100%'} colorScheme="blue">
                Send
              </Button>
            )}
            {isPending && (
              <Button
                isLoading
                loadingText="Submitting"
                colorScheme="teal"
                width={'100%'}
                variant="outline"
              >
                Loading
              </Button>
            )}
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
}
