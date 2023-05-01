import { useEffect, useState } from 'react';
import {
  projectAuth,
  projectFirestore,
  projectStorage,
  timestamp,
} from '../firebase/config';

export const useFirestore = (collection) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { uid } = projectAuth.currentUser;

  const ref = projectFirestore.collection(collection);

  const addDocument = async (doc, thumbnail) => {
    setIsPending(true);
    try {
      if (thumbnail) {
        const imgPath = `/project/${uid}/${thumbnail.name}`;
        const img = await projectStorage.ref(imgPath).put(thumbnail);
        const imgUrl = await img.ref.getDownloadURL();

        const createdAt = timestamp.fromDate(new Date());
        const addedDocument = await ref.add({
          ...doc,
          createdAt,
          photoURL: imgUrl,
        });
        setIsPending(false);
      }
    } catch (err) {
      setIsPending(false);
      setError(err.message);
    }
  };

  const deleteDocument = async (id) => {
    try {
      await ref.doc(id).delete();
    } catch (err) {}
  };

  const updateDocument = async (id, updates) => {
    try {
      const updatedDocument = await ref.doc(id).update(updates);

      return updatedDocument;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, isPending, error };
};
