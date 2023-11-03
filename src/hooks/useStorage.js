import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";
// useStorage.js
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { collection, addDoc } from "@firebase/firestore";



const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = ref(projectStorage, file.name);
    const collectionRef = collection(projectFirestore, "images");

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const downloadURL = await getDownloadURL(storageRef);
        const createdAt = timestamp();
        await addDoc(collectionRef, { url: downloadURL, createdAt });
        setUrl(downloadURL);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
