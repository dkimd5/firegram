import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const useFirestore = (collctnName) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const collectionRef = collection(projectFirestore, collctnName);
    const collectionRefOrdered = query(
      collectionRef,
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(collectionRefOrdered, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    return () => unsub();
  }, [collctnName]);

  return { docs };
};

export default useFirestore;
