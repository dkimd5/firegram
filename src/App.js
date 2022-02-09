import React from "react";
import ImageGrid from "./comps/ImageGrid";
import Modal from "./comps/Modal";
import Title from "./comps/Title";
import UploadForm from "./firebase/UploadForm";

function App() {
  return (
    <div className="App">
      <Title />
      <UploadForm />
      <ImageGrid />
      <Modal />
    </div>
  );
}

export default App;
