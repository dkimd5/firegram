import React, { useState } from "react";
import useFirestore from "../hooks/useFirestore";
import useDeleteImg from "../hooks/useDeleteImg";
import { motion } from "framer-motion/dist/es/index";

function ImageGrid({ setSelectedImg }) {
  const { docs } = useFirestore("images");
  const [deleteImgKey, setDeleteImgKey] = useState("");
  const imageDelete = useDeleteImg(deleteImgKey);

  const onclickHandler = (e) => {
    setDeleteImgKey();
  };

  return (
    <div className="img-grid">
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
            <button className="img-delete-btn">
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
    </div>
  );
}

export default ImageGrid;
