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
  const [hasMore, setHasMore] = useState(true);
  const [loadLimit, setLoadLimit] = useState(9);
  const [docsCount, setDocsCount] = useState();

  useEffect(() => {
    const collectionRef = collection(projectFirestore, collctnName);

    const collectionAllDocs = query(collectionRef);
    onSnapshot(collectionAllDocs, (snap) => {
      let count = 0;
      snap.forEach((doc) => {
        count++;
      });
      setDocsCount(count);
      if (count === 0) {
        setHasMore(false);
      }
    });

    const collectionQuery = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      limit(loadLimit)
    );

    const unsub = onSnapshot(collectionQuery, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
      if (loadLimit === docsCount || loadLimit > docsCount) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    });

    return () => unsub();
  }, [collctnName, loadLimit, docsCount]);

  return { docs, hasMore, setHasMore, setLoadLimit, loadLimit, docsCount };
};

export default useFirestore;
