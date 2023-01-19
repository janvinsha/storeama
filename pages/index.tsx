import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";

import AppContext from "../context/AppContext";
import Lottie from "react-lottie";
import homeData from "../public/animations/home.json";
import FileCard from "../components/FileCard";
import Filter from "../components/Filter";
export default function Home() {
  const router = useRouter();
  const { theme, currentAccount, getFiles } = useContext(AppContext);
  const [files, setFiles] = useState([{}]);
  const [sortBy, setSortBy] = useState("");
  const dFiles = [{}];
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: homeData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {}, []);
  const DOCUMENTS_QUERY = gql`
    query GetDocuments($address: String) {
      documents(first: 10, where: { user_contains: $address }) {
        id
        name
        docType
        description
        user
        url
      }
    }
  `;

  const { data: documentsData } = useQuery(DOCUMENTS_QUERY, {
    variables: {
      address: `${
        currentAccount || "0x659CE0FC2499E1Fa14d30F5CD88aD058ba490e39"
      }`,
    },
  });
  const documents = documentsData?.documents;
  console.log("HERE ARE THE DOCUMENTS ", documents);

  return (
    <StyledHome theme_={theme}>
      {!currentAccount ? (
        <div className="description">
          <div className="desc">
            <h1>Upload and organize your files</h1>
            <h2>A decentralized cloud on the FVM </h2>
            <h3>Connect you wallet to access your personal drive</h3>
          </div>
          <div className="nft-desc">
            <Lottie options={defaultOptions} height={500} width={"100%"} />
          </div>
        </div>
      ) : (
        <div className="main">
          <div className="header">
            <div className="left">
              <h3>Your Files</h3>
            </div>
            <div className="right">
              <Filter
                name="Category"
                label=""
                asterik={false}
                defaultValue="All"
                className="filt"
                options={[
                  { label: "All", value: "All" },
                  { label: "Image", value: "Images" },
                  { label: "Video", value: "Video" },
                  { label: "Audio", value: "Audio" },
                  { label: "Other", value: "Other" },
                ]}
                onChange={(e) => setSortBy(e.target.value)}
                theme={theme}
                required
              />
            </div>
          </div>
          {documents?.length > 0 ? (
            <div className="cards">
              {documents?.map((file, i) => (
                <FileCard file={file} key={i} />
              ))}
            </div>
          ) : (
            <div className="middle">
              <h2>You have no files, upload a file</h2>
            </div>
          )}
        </div>
      )}
    </StyledHome>
  );
}

const StyledHome = styled(motion.div)<{ theme_: boolean }>`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  padding: 2rem 6rem;
  gap: 2rem;
  @media screen and (max-width: 900px) {
    padding: 1rem 1rem;
  }
  .description {
    display: flex;
    flex-flow: column wrap;
    gap: 3rem;
  }
  .desc {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
  }
  .header {
    display: flex;
    justify-content: space-between;
    .left {
      @media screen and (max-width: 900px) {
        display: none;
      }
    }
    .right {
      display: flex;
      gap: 2rem;
      .filt {
        width: 8rem;
      }
    }
  }
  .cards {
    width: 100%;
    padding: 2rem 0rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    @media screen and (max-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 0.5rem;
      grid-row-gap: 0.5rem;
      width: 100%;
      padding: 0rem 0rem;
    }
  }
  .middle {
    padding: 2rem 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50vh;
  }
`;
