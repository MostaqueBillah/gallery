import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
// import { projectFirestore } from "../firebase/config";

const UploadForm = ({ handleDeleteSelected }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && selected.type.startsWith("image/")) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file");
    }
  };

  return (
    <div>
      <form>
        <label>
          <input type="file" onChange={handleChange} accept="image/*" />
          <span>+</span>
        </label>
        <div className="output">
          {error && <div className="error">{error}</div>}
          {file && <div>{file.name}</div>}
          {file && <ProgressBar file={file} setFile={setFile} />}
        </div>
      </form>
      <div className="button-container">
        <button className="button-6" onClick={handleDeleteSelected}>
          Delete Selected Images
        </button>
      </div>
    </div>
  );
};

export default UploadForm;
