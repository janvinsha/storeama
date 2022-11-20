import React, { FC, useEffect, useContext, useState } from "react";
import { create } from "ipfs-http-client";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Input, Textarea, Filter } from "../components";
import { Loader } from "../components";
import AppContext from "../context/AppContext";
import PhotoIcon from "@mui/icons-material/Photo";
import notify from "../hooks/notification";

import CloseIcon from "@mui/icons-material/Close";

const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET;

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const UploadFile = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const hiddenFileInput = React.useRef(null);
  const [file, setFile] = useState();
  const { theme, currentAccount, connectWallet, createTable, uploadFile } =
    useContext(AppContext);
  const handleFileClick = (event) => {
    hiddenFileInput.current.click();
  };
  const uploadFileHandler = async (e) => {
    const fileTemp = e.target.files[0];
    console.log("This is the file, first time", fileTemp);
    if (fileTemp?.name) {
      console.log("It is seeing the file");
      setFile(
        Object?.assign(fileTemp, {
          preview: URL.createObjectURL(fileTemp),
        })
      );
    }
    console.log("This is the file", file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!currentAccount) {
      connectWallet();
      return;
    }
    if (!file) {
      alert("Upload Photo");
      return;
    }

    try {
      setLoading(true);
      let fileResponse = await client.add(file);
      let fileUrl = `https://storeama.infura-ipfs.io/ipfs/${fileResponse.path}`;
      uploadFile({
        name,
        description,
        type,
        url: fileUrl,
      });
      setLoading(false);
      notify({ title: "File added successfully", type: "success" });
      console.log(fileResponse, fileUrl, "RESPONSE ");
      return fileResponse;
    } catch (error) {
      console.log(error);
      setLoading(false);
      notify({
        title: "There was an error trying to upload a file",
        type: "error",
      });
    }
  };

  return (
    <StyledUploadFile theme_={theme}>
      <Loader visible={loading} />
      <motion.div className="page_header">
        <h2 className="page_title text-gradient">Upload a File</h2>
      </motion.div>
      <motion.div className="page_container">
        <div className="img_input ">
          <div className="box">
            {file?.type ? (
              <>
                {file?.type?.startsWith("video") && (
                  <span className="video">
                    <button onClick={() => setFile()} className="cancel">
                      <CloseIcon />
                    </button>
                    <video controls>
                      <source src={file?.preview} type="video/mp4" />
                    </video>
                  </span>
                )}
                {file?.type?.startsWith("image") && (
                  <span className="img">
                    <button onClick={() => setFile()} className="cancel">
                      <CloseIcon />
                    </button>
                    <img src={file.preview} alt="img"></img>
                  </span>
                )}
                {file?.type?.startsWith("audio") && (
                  <span className="img">
                    <button onClick={() => setFile()} className="cancel">
                      <CloseIcon />
                    </button>

                    <audio controls="controls" id="audioPreview">
                      <source src={file.preview} type="audio/mp4" />
                    </audio>
                  </span>
                )}
                {file?.type?.startsWith("application") && (
                  <span className="img">
                    <button onClick={() => setFile()} className="cancel">
                      <CloseIcon />
                    </button>

                    <embed
                      src={file.preview}
                      width="100%"
                      height="100%"
                      type="application/pdf"
                    />
                  </span>
                )}
              </>
            ) : (
              <>
                <h3>PNG, JPEG, GIF, WEBP, MP4, MP3</h3>
                <h3>Max 100mb</h3>
                <PhotoIcon className="icon" />

                <h3> Click button select</h3>
                <button className="plain-btn" onClick={handleFileClick}>
                  Select file
                </button>
              </>
            )}
          </div>
        </div>
        <form onSubmit={submitHandler}>
          <Input
            name="name"
            label="Name"
            asterik={true}
            placeholder="Item Name"
            onChange={(e) => setName(e.target.value)}
            required
            theme={theme}
          />
          <Filter
            name="Type of file"
            label="Type of file"
            asterik={true}
            defaultValue="Image"
            className="border"
            options={[
              { label: "Image", value: "Image" },
              { label: "Video", value: "Video" },
              { label: "Audio", value: "Audio" },
              { label: "Document", value: "Document" },
              { label: "Other", value: "Other" },
            ]}
            onChange={(e) => setType(e.target.value)}
            theme={theme}
            required
          />
          <Textarea
            name="description"
            label="Description"
            placeholder="Description..."
            className="text-area"
            role="textbox"
            asterik={true}
            rows={6}
            onChange={(e) => setDescription(e.target.value)}
            required
            theme={theme}
          />

          <button type="submit">Upload File</button>
        </form>
      </motion.div>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={uploadFileHandler}
        style={{ display: "none" }}
      />
    </StyledUploadFile>
  );
};

const StyledUploadFile = styled(motion.div)`
  display: flex;
  flex-flow: column wrap;
  padding: 3rem 6rem;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 900px) {
    gap: 0.5rem;
    width: 100%;
    padding: 1rem 2rem;
  }
  width: 100%;
  .page_header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    @media screen and (max-width: 900px) {
      width: 100%;
    }
    h2 {
    }
  }
  .page_container {
    padding: 1rem 6rem;
    display: flex;
    flex-flow: column wrap;
    width: 55rem;
    @media screen and (max-width: 900px) {
      flex-flow: column wrap;
      padding: 1rem 0rem;
      gap: 0rem;
      width: 100%;
    }
    h2 {
      font-size: 1.6rem;
      @media screen and (max-width: 900px) {
        font-size: 1.3rem;
      }
    }

    .img_input {
      /* border: 2px solid #7aedc7; */
      border-radius: 0.5rem;
      width: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 14rem;
      border: 2.5px dashed ${({ theme_ }) => (theme_ ? "#575555" : " #cdcdcd")};

      width: 100%;
      box-sizing: border-box;
      border-radius: 5px;
      margin-bottom: 2rem;

      background: ${({ theme_ }) => (theme_ ? "#24242b" : "#f2f2f2")};
      /* box-shadow: 0 0 3px #ccc; */
      h3 {
        font-size: 1.2rem;
      }
      img {
        width: 100%;
        display: block;
        object-fit: cover;
      }
    }
    .box {
      width: 100%;
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      align-items: center;
      border-radius: 0.5rem;
      .icon {
        font-size: 3rem;
      }
      .plain-btn {
        margin-top: 1rem;
        padding: 0.5rem 3rem;
      }
      .video,
      .img {
        width: 100%;
        border-radius: 0.5rem;
        position: relative;
        overflow: hidden;
        margin-top: 0.5rem;
        video {
          width: 100%;
        }
        img {
          width: 100%;
        }
        transition: 2s ease-in-out;
        .cancel {
          padding: 0.5rem;
          border-radius: 0.5rem;
          position: absolute;
          top: 2%;
          left: 2%;
          z-index: 2;
          cursor: pointer;
          display: none;
          background-color: rgba(31, 32, 41, 0.75);
        }
        &:hover {
          .cancel {
            display: block;
          }
        }
      }
      audio {
        float: right;
      }
    }

    .preview_div {
      width: 50%;
      display: flex;
      flex-flow: column wrap;
      gap: 1rem;
      padding-left: 2rem;
      @media screen and (max-width: 900px) {
        width: 100%;
        padding-left: 0rem;
        padding: 1rem;
      }
      .listing-price {
        padding: 2rem 0.5rem;
        color: #0592ec;
      }
    }
  }
`;
export default UploadFile;
