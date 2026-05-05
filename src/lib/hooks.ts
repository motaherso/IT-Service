import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export function useFirestoreData<T>(collectionName: string, defaultValue: T[]) {
  const [data, setData] = useState<T[]>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, collectionName));
    
    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
        setData(items);
      } else {
        // Fallback to default mock data if Firestore collection is empty
        setData(defaultValue);
      }
      setLoading(false);
    }, (error) => {
      console.error(`Error fetching ${collectionName}:`, error);
      setData(defaultValue);
      setLoading(false);
    });

    return unsub;
  }, [collectionName]);

  return { data, loading };
}
