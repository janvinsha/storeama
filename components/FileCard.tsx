import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import AppContext from "../context/AppContext";

const FileCard = (file) => {
  const { theme, currentAccount } = useContext(AppContext);
  const router = useRouter();

  return (
    <StyledFileCard
      theme_={theme}
      onClick={() => router.push(`/files/${file?.[0]}`)}
    >
      <img
        src={file?.[2] == "Image" ? file?.[2] : "images/rodeo.png"}
        alt="img"
      />
      <div className="nft-desc">
        <span className="title">
          <h3>{file?.[1]}</h3>
          <h4>{file?.[2]}</h4>
        </span>
      </div>
    </StyledFileCard>
  );
};

const StyledFileCard = styled(motion.div)<{ theme_: boolean }>`
  width: 100%;
  padding: 0rem 0rem;
  border-radius: 10px;
  display: flex;
  flex-flow: column wrap;
  gap: 1rem;
  background: ${({ theme_ }) =>
    theme_ ? "rgb(23, 24, 24,0.9)" : "rgb(248, 248, 248,0.9)"};
  background: ${({ theme_ }) => (theme_ ? "#24242b" : "#f2f2f2")};
  cursor: pointer;
  &:hover {
    -moz-box-shadow: 0 0 4.5px #ccc;
    -webkit-box-shadow: 0 0 4.5px #ccc;
    box-shadow: 0 0 4.5px #ccc;
  }

  overflow: hidden;
  img {
    height: 15rem;
    width: 100%;
    object-fit: cover;
  }
  height: auto;
  display: flex;
  flex-flow: column wrap;

  .nft-desc {
    display: flex;
    flex-flow: column wrap;
    padding: 0rem 1rem;
    gap: 0.5rem;

    .title,
    .sale {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      gap: 0.5rem;
      align-items: center;

      img {
        width: 1.5rem;
        height: 1.5rem;
        object-fit: cover;
        border-radius: 50%;
        @media screen and (max-width: 900px) {
          width: 1rem;
          height: 1rem;
        }
      }
    }
    .title {
      h3 {
        font-weight: 500;
      }
      p {
        color: #20b2aa;
      }
    }
    .sale {
      padding-bottom: 1rem;
      .author {
        display: flex;
        align-items: center;
        gap: 0.2rem;
      }
    }
  }
`;

export default FileCard;
