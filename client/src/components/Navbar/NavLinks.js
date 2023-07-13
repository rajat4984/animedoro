import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import "./navbar.scss";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context";
import axios from "axios";

function NavLinks({ isMobile, closeMobileMenu }) {
  const { handleSelectTime, codeChallenge } = useGlobalContext();
  
  useEffect(() => {
    const getToken = async () => {
      const arr = window.location.search.split("&");
      const convertedArr = arr.map((item) => {
        item = item.split("=");
        item = item[1];
        return item;
      });

      if (codeChallenge !== "") {
        try {
          const response = await axios.post(
            "http://localhost:8800/get-token",

            {
              code: convertedArr[0],
              state: convertedArr[1],
              challenge: sessionStorage.getItem("codeChallenge"),
            },

            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getToken();
  }, [codeChallenge]);

  const animationFrom = { opacity: 0, x: 200 };
  const animateTo = { opacity: 1, x: 0 };

  // code verifier and code challenge
  const handleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:8800/anime-proxy", {
        params: { challenge: sessionStorage.getItem("codeChallenge") },
      });
      const path = `https://myanimelist.net${response.data.path}`;
      window.location.href = path;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={animationFrom}
      animate={animateTo}
      className="nav-links"
    >
      <div initial={animationFrom} animate={animateTo} className="search-bar">
        <input type="text" placeholder="Search anime" />
        <button
          onClick={() => {
            isMobile && closeMobileMenu();
          }}
        >
          <BiSearchAlt />
        </button>
      </div>
      <p
        onClick={() => {
          isMobile && closeMobileMenu();
        }}
      >
        My Watchlist
      </p>
      <p
        onClick={() => {
          isMobile && closeMobileMenu();
          handleLogin();
        }}
      >
        Login with mal
      </p>
      {isMobile && (
        <p>
          <select
            onChange={(e) => {
              handleSelectTime(e);
              closeMobileMenu();
            }}
            className="selectTime"
          >
            <option value="1">1 Minute</option>
            <option value="40">40 Minutes</option>
            <option value="60">60 Minutes</option>
          </select>
        </p>
      )}
    </motion.div>
  );
}

export default NavLinks;
