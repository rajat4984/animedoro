import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import "./navbar.scss";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context";
import axios from "axios";

function NavLinks({ isMobile, closeMobileMenu }) {
  const { handleSelectTime, codeChallenge } = useGlobalContext();

  useEffect(() => {
    // for getting token from mal server
    const getToken = async () => {
      const arr = window.location.search.split("&");
      const convertedArr = arr.map((item) => {
        item = item.split("=");
        item = item[1];
        return item;
      });

      if (convertedArr[0] !== undefined) {
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
          console.log(response.data);
          sessionStorage.setItem("access_token",response.data.access_token);
          sessionStorage.setItem("refresh_token",response.data.refresh_token);
          sessionStorage.setItem("expires_in",response.data.expires_in)

          try {
           const response = await axios.get("http://localhost:8800/get-profile-info",{params:{access_token:sessionStorage.getItem("access_token")}});
           console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getToken();
  }, [codeChallenge]);

  const animationFrom = { opacity: 0, x: 200 };
  const animateTo = { opacity: 1, x: 0 };

  //for gettting code from mal server
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
