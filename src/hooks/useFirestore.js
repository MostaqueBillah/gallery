import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
// useFirestore.js
import { collection, query, orderBy, onSnapshot } from "@firebase/firestore";



const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const colRef = collection(projectFirestore, collectionName);
    const q = query(colRef, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    // Cleanup function to unsubscribe from Firestore listener when component unmounts
    return () => unsub();
  }, [collectionName]);

  return { docs };
};

export default useFirestore;
