import React, { useState, useEffect } from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ImageGrid = ({ setSelectedImg, selectedImages, setSelectedImages }) => {
  const { docs: initialDocs } = useFirestore("images");
  const [docs, setDocs] = useState(initialDocs);

  useEffect(() => {
    setDocs(initialDocs);
  }, [initialDocs]);

  const handleImageClick = (url) => {
    setSelectedImg(url);
  };

  const toggleImageSelection = (id, e) => {
    e.stopPropagation();
    if (selectedImages.includes(id)) {
      setSelectedImages((prevSelected) =>
        prevSelected.filter((prevId) => prevId !== id)
      );
    } else {
      setSelectedImages((prevSelected) => [...prevSelected, id]);
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(docs);
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);

    setDocs([...reorderedImages]);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="images">
        {(provided) => (
          <div
            className="img-grid"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {docs &&
              docs.map((doc, index) => (
                <Draggable key={doc.id} draggableId={doc.id} index={index}>
                  {(provided, snapshot) => (
                    <motion.div
                      className={`img-wrap ${index === 0 ? "featured" : ""}`}
                      key={doc.id}
                      layout
                      whileHover={{ opacity: 1 }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        transform: snapshot.isDragging
                          ? "none"
                          : provided.draggableProps.style.transform,
                      }}
                    >
                      <input
                        type="checkbox"
                        className="image-checkbox"
                        checked={selectedImages.includes(doc.id)}
                        onChange={(e) => toggleImageSelection(doc.id, e)}
                      />
                      <motion.img
                        src={doc.url}
                        alt="uploaded pic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        onClick={() => handleImageClick(doc.url)}
                      />
                    </motion.div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ImageGrid;

