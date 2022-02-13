import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";

const useFirestore = (collctnName) => {
  const [docs, setDocs] = useState([]);
  const [hasMore, setHaveMore] = useState(true);

  useEffect(() => {
    const collectionRef = collection(projectFirestore, collctnName);
    const collectionQuery = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      limit(9)
    );

    const unsub = onSnapshot(collectionQuery, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
      setHaveMore(true);
    });

    return () => unsub();
  }, [collctnName]);

  return { docs, hasMore, setHaveMore };
};

export default useFirestore;
