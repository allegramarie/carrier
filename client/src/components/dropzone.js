import Dropzone from "react-dropzone";
import React from "react";

const drop = e => console.log(e);

const Drop = props => (
  // console.log()

  <section>
    <div className="dropzone">
      <Dropzone
        accept="text/csv, text/plain"
        onDrop={e => {
          drop(e);
        }}
      >
        <p>Try dropping some files here, or click to select files to upload.</p>
        <p>Only *.txt and *.csv images will be accepted</p>
      </Dropzone>
    </div>
    <aside />
  </section>
);

// <Basic />
export default Drop;
