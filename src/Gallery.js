import React, { useState } from "react";
import ImageGrid from "./comps/ImageGrid";
import Modal from "./comps/Modal";
import UploadForm from "./comps/UploadForm";
import { projectFirestore } from "./firebase/config";
import { collection, doc, deleteDoc } from "@firebase/firestore";

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleDeleteSelected = async () => {
    if (!selectedImages.length) return;

    const imagesCollection = collection(projectFirestore, "images");
    const promises = selectedImages.map((id) => {
      const imageDoc = doc(imagesCollection, id);
      return deleteDoc(imageDoc);
    });

    await Promise.all(promises);
    setSelectedImages([]); // Clear the selection after deleting.
  };

  return (
    <div className="gallery-container">
      <UploadForm handleDeleteSelected={handleDeleteSelected} />
      <ImageGrid
        setSelectedImg={setSelectedImg}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
      />

      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
};

export default Gallery;
