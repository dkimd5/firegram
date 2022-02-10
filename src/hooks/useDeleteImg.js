import { useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";

const useDeleteImg = (image) => {
  useEffect(() => {
    if (image !== "") {
      const deleteFileRef = ref(projectStorage, image.name);

      deleteObject(deleteFileRef);
      deleteDoc(doc(projectFirestore, "images", image.id));
    } else {
      return;
    }
  }, [image]);
};

export default useDeleteImg;
