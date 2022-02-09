import React from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion/dist/es/index";

function ImageGrid({ setSelectedImg }) {
  const { docs } = useFirestore("images");
  console.log(docs);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <motion.div
            className="img-wrap"
            key={doc.id}
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => setSelectedImg(doc.url)}
          >
            <img src={doc.url} alt="uploaded image" />
          </motion.div>
        ))}
    </div>
  );
}

export default ImageGrid;
