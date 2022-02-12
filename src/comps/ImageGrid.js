import React from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion/dist/es/index";
import InfiniteScroll from "react-infinite-scroller";

import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";

function ImageGrid({ setSelectedImg }) {
  const { docs } = useFirestore("images");

  const onclickHandlerDeleteImg = (imageName, imageId) => {
    const deleteFileRef = ref(projectStorage, imageName);

    deleteObject(deleteFileRef);
    deleteDoc(doc(projectFirestore, "images", imageId));
  };

  return (
    <div className="img-grid">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={true || false}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {docs &&
          docs.map((doc) => (
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
