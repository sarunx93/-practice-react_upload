import React, { useState } from "react";
import Message from "./Messasge";
import Progress from "./Progress";
import axios from "axios";
const FileUpload = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("File Name");
  const [caption, setCaption] = useState("");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercent, setUploadPercent] = useState(0);
  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onChangeCaption = (e) => {
    setCaption(e.target.value);
  };

  const onSubmitFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);
    // const submitData = { formData, caption };
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercent(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });

      const { fileName, filePath, caption } = res.data;

      console.log(res);
      setUploadedFile({ fileName, filePath, caption });

      setMessage("File Uploaded Successfully");
    } catch (error) {
      if (error.response === 500) {
        setMessage("There was a probelm with the server");
      } else {
        console.log(error.resonse);
      }
    }
    console.log(formData);
  };

  return (
    <>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmitFile}>
        <div className="mb-3">
          <label htmlFor="caption" className="form-label ">
            Caption
          </label>
          <input
            className="form-control mb-4"
            type="text"
            id="caption"
            onChange={onChangeCaption}
            value={caption}
          />
          <label htmlFor="formFile" className="form-label">
            {fileName}
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={onChangeFile}
          />
        </div>

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt4"
        />
      </form>
      <Progress percentage={uploadPercent} />
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-5 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img src={uploadedFile.filePath} style={{ width: "100%" }} alt="" />
            <h6>{uploadedFile.caption}</h6>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FileUpload;
