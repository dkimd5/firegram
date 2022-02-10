import React from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, deleteObject } from "firebase/storage";

const useDeleteImg = (image) => {
  useEffect(() => {
    //references
    const deleteFileRef = ref(projectStorage, image.name);
    const collectionRef = collection(projectFirestore, "images");

    deleteObject(deleteFileRef);
  }, [image]);
};

export default useDeleteImg;
