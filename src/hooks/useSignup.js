import React, { useState } from 'react';
import { projectAuth, projectStorage } from '../firebase/config';
import useAuthContext from './useAuthContext';

export default function useSignup() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!res) {
        throw new Error('Error. Something went wrong.');
      }
      const imgPath = `/thumbnails/${res.user.uid}/${thumbnail.name}`;
      const img = await projectStorage.ref(imgPath).put(thumbnail);
      const imgUrl = await img.ref.getDownloadURL();

      await res.user.updateProfile({ displayName, photoURL: imgUrl });

      dispatch({ type: 'LOGIN', payload: res.user });

      setError(null);
      setIsPending(false);
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  return { signup, error, isPending };
}
