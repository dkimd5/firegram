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
          <div
            className="img-wrap"
            key={doc.id}
            onClick={() => setSelectedImg(doc.url)}
          >
            <img src={doc.url} alt="uploaded image" />
          </div>
        ))}
    </div>
  );
}

export default ImageGrid;
