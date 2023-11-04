import React, { useState, useEffect } from "react";
import useFirestore from "../hooks/useFirestore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ImageGrid = ({ setSelectedImg, selectedImages, setSelectedImages }) => {
  const { docs: initialDocs } = useFirestore("images");
  const [docs, setDocs] = useState(initialDocs);

  const [hasReordered, setHasReordered] = useState(false);

  useEffect(() => {
    const savedDocs = localStorage.getItem("reorderedImages");
    if (savedDocs && !hasReordered) {
      setDocs(JSON.parse(savedDocs));
    } else if (!hasReordered) {
      setDocs(initialDocs);
    }
  }, [initialDocs, hasReordered]);

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

    const items = Array.from(docs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDocs(items);
    setHasReordered(true);

    // Save the reordered items to local storage
    localStorage.setItem("reorderedImages", JSON.stringify(items));
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
                    <div
                      className={`img-wrap ${index === 0 ? "featured" : ""} ${
                        snapshot.isDragging ? "dragging" : ""
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <input
                        type="checkbox"
                        className="image-checkbox"
                        checked={selectedImages.includes(doc.id)}
                        onChange={(e) => toggleImageSelection(doc.id, e)}
                      />
                      <img
                        src={doc.url}
                        alt="uploaded pic"
                        onClick={() => handleImageClick(doc.url)}
                      />
                    </div>
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
