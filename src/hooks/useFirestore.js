import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  getDocs,
} from "firebase/firestore";

const useFirestore = (collctnName) => {
  const [docs, setDocs] = useState([]);
  const [hasMore, setHaveMore] = useState(true);
  const [loadLimit, setLoadLimit] = useState(9);
  const [loadCount, setLoadCount] = useState();

  useEffect(() => {
    const collectionRef = collection(projectFirestore, collctnName);

    const countDocs = async () => {
      setLoadCount("set null " + 0);
      const querySnapshot = await getDocs(collectionRef);
      let count = 0;
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        count++;
        console.log(count);
      });
      console.log("final count " + count);
      setLoadCount(count);
    };
    console.log("loadCount " + loadCount);
    countDocs();

    const collectionQuery = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      limit(loadLimit)
    );

    const unsub = onSnapshot(collectionQuery, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
        // setLoadCount((state) => state + 1);
      });
      setDocs(documents);
      if (loadLimit === loadCount || loadLimit > loadCount) {
        setHaveMore(false);
      }
    });

    return () => unsub();
  }, [collctnName, loadLimit]);

  return { docs, hasMore, setHaveMore, setLoadLimit };
};

export default useFirestore;
