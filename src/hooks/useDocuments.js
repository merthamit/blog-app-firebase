import React, { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

export default function useDocuments(collection, id) {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setError(null);
          setDocument({ ...snapshot.data(), id: snapshot.id });
        } else {
          setError('Something went wrong.');
        }
      },
      (err) => {
        setError('Something went wrong.');
      }
    );

    return () => unsub();
  }, [collection, id]);

  return { document, error };
}
