import React, { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion/dist/es/index";
import InfiniteScroll from "react-infinite-scroll-component";

import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, deleteObject } from "firebase/storage";
import {
  doc,
  deleteDoc,
  query,
  collection,
  orderBy,
  startAfter,
  limit,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

function ImageGrid({ setSelectedImg }) {
  const { docs, hasMore, setHaveMore } = useFirestore("images");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(docs);
  }, [docs]);

  const onclickHandlerDeleteImg = (imageName, imageId) => {
    const deleteFileRef = ref(projectStorage, imageName);

    deleteObject(deleteFileRef);
    deleteDoc(doc(projectFirestore, "images", imageId));
    setHaveMore(true);
  };

  const loadMore = async () => {
    const lastVisible = cards[cards.length - 1];

    const next = query(
      collection(projectFirestore, "images"),
      orderBy("createdAt", "desc"),
      startAfter(lastVisible.createdAt),
      limit(9)
    );
    const querySnapshot = await getDocs(next);
    const unsub = onSnapshot(next, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setCards((state) => [...cards, ...documents]);
    });
    if (querySnapshot.docs.length === 0 || querySnapshot.docs.length < 9) {
      setHaveMore(false);
    }
    return () => unsub();

    // const querySnapshot = await getDocs(next);
    // querySnapshot.forEach((doc) => {
    //   setCards((state) => [...state, { ...doc.data(), id: doc.id }]);
    // });
  };

  return (
    <div>
      <InfiniteScroll
        className="img-grid"
        dataLength={cards.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {cards &&
          cards.map((doc) => (
            <motion.div className="img-wrap" key={doc.id} layout>
              <motion.img
                src={doc.url}
                alt="uploaded image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => setSelectedImg(doc.url)}
              />
              <button
                className="img-delete-btn"
                onClick={() => onclickHandlerDeleteImg(doc.name, doc.id)}
              >
                <svg
                  width="18px"
                  height="18px"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 18H5a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2zm3-15a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h3V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h3a1 1 0 0 1 1 1z" />
                </svg>
              </button>
            </motion.div>
          ))}
      </InfiniteScroll>
    </div>
  );
}

export default ImageGrid;
