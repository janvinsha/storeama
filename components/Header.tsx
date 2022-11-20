import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import Hambuger from "./Hambuger";
import AppContext from "../context/AppContext";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HeaderSearch from "./HeaderSearch";
const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  const router = useRouter();
  const { pathname } = router;
  const {
    theme,
    connectWallet,
    currentAccount,
    disconnectWallet,
    changeTheme,
  } = useContext(AppContext);
  useEffect(() => {
    setMenuToggle(false);
  }, [pathname]);
  return (
    <StyledHeader menuToggle={menuToggle} theme_={theme}>
      <motion.div className="left">
        <Link href="/">
          <span>
            <img src="/images/logo.png" alt="img" />
            <h3>Storeama</h3>
          </span>
        </Link>
      </motion.div>
      <div className="middle">
        <HeaderSearch />
      </div>
      <motion.div className="right">
        <button onClick={() => router.push("/upload-file")}>Upload File</button>
        {currentAccount ? (
          <button onClick={() => disconnectWallet()} className="secondary-btn">
            Disconnect
          </button>
        ) : (
          <button onClick={() => connectWallet()} className="secondary-btn">
            Connect Wallet
          </button>
        )}
        {theme ? (
          <button onClick={() => changeTheme()} className="theme-btn ">
            <DarkModeIcon />
          </button>
        ) : (
          <button onClick={() => changeTheme()} className="theme-btn ">
            <Brightness7Icon />
          </button>
        )}
      </motion.div>
      <motion.div className="mobileNav">
        <span className="icon">
          <Hambuger
            open={menuToggle}
            onClick={() => setMenuToggle(!menuToggle)}
          />
        </span>
        <div className="menu">
          <span className="account"></span>
          <motion.div className="nav-links">
            <button onClick={() => router.push("/create-event")}>
              Upload File
            </button>

            {currentAccount ? (
              <button onClick={() => connectWallet()} className="secondary-btn">
                Disconnect
              </button>
            ) : (
              <button onClick={() => connectWallet()} className="secondary-btn">
                Connect Wallet
              </button>
            )}
            {theme ? (
              <button onClick={() => changeTheme()} className="theme-btn ">
                <DarkModeIcon />
              </button>
            ) : (
              <button onClick={() => changeTheme()} className="theme-btn ">
                <Brightness7Icon />
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </StyledHeader>
  );
};

const StyledHeader = styled(motion.div)<{
  menuToggle: boolean;
  theme_: boolean;
}>`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 4rem;
  border-bottom: 2px solid ${({ theme_ }) => (theme_ ? " #575555" : " #eeeaea")};
  @media (max-width: 900px) {
    justify-content: space-between;
    padding: 1.8rem 1.5rem;
  }
  .left {
    width: 30%;
    @media (max-width: 900px) {
      width: auto;
      z-index: 3;
    }
    span {
      cursor: pointer;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      img {
        width: 2.3rem;
        height: 2.3rem;
        object-fit: cover;
      }
      h3 {
        font-weight: bold;
        font-size: 1.4rem;
      }
    }
  }
  .middle {
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    @media (max-width: 900px) {
      display: none;
    }
  }
  .link {
    a {
      font-size: 1.2rem;
      &:hover {
        color: #20b2aa;
      }
    }
    .active {
      color: #20b2aa;
    }
  }
  .right {
    width: 40%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1.5rem;
    margin-left: auto;
    @media (max-width: 900px) {
      display: none;
    }
    .icon {
      cursor: pointer;
      font-size: 1.3rem;
    }
  }
  .mobileNav {
    display: none;
    @media (max-width: 900px) {
      display: flex;
    }
    transition: all 0.5s;
    .icon {
      position: relative;
      z-index: 3;
    }
    .menu {
      padding: 2rem;
      padding-top: 7rem;
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      gap: 1rem;
      background: ${({ theme_ }) => (theme_ ? "#24242b" : "#f2f2f2")};
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      transform: translateX(-100%);
      transform: ${({ menuToggle }) =>
        menuToggle ? "translateX(0%)" : "translateX(-100%)"};
      z-index: 2;
    }
    .nav-links {
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      gap: 1rem;
      a {
        font-size: 1.3rem;
        &:hover {
          color: #20b2aa;
        }
      }
    }
    .account {
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      gap: 1rem;
    }
  }
`;

export default Header;
