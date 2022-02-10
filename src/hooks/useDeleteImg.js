import React from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";

const useDeleteImg = (image) => {
  useEffect(() => {
    //references
    const deleteFileRef = ref(projectStorage, image.name);
    const collectionRef = collection(projectFirestore, "images");

    deleteObject(deleteFileRef);
    await deleteDoc(doc(projectFirestore, "images", image.name));
  }, [image]);
};

export default useDeleteImg;
