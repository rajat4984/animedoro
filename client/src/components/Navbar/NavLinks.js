import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { BsBookmarks } from "react-icons/bs";
import "./navbar.scss";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context";
import axios from "axios";
import { getAccessToken, getAnime, getProfileInfo } from "../../apiCalls/auth";

function NavLinks({ isMobile, closeMobileMenu }) {
  const {
    handleSelectTime,
    codeChallenge,
    userInfo,
    setUserInfo,
    setAnimeDetailId,
  } = useGlobalContext();

  const [searchInput, setSearchInput] = useState("");
  const [animeList, setAnimeList] = useState([]);

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
        const tokenResponse = await getAccessToken(convertedArr); //call for getting access token
        console.log(tokenResponse);
        sessionStorage.setItem("access_token", tokenResponse.data.access_token);
        sessionStorage.setItem(
          "refresh_token",
          tokenResponse.data.refresh_token
        );
        sessionStorage.setItem("expires_in", tokenResponse.data.expires_in);

        const profileResponse = await getProfileInfo();
        setUserInfo(profileResponse.data);
      }
    };

    getToken();
  }, [setUserInfo, codeChallenge]);

  // for navbar animation
  const animationFrom = { opacity: 0, x: 200 };
  const animateTo = { opacity: 1, x: 0 };

  //for gettting code from mal server
  const handleLogin = async () => {
    const response = await axios.get("/auth/anime-proxy", {
      params: { challenge: sessionStorage.getItem("codeChallenge") },
    });
    const path = `https://myanimelist.net${response.data.path}`;
    window.location.href = path;
  };

  //for searching anime
  const searchAnime = async (searchValue) => {
    if (searchValue.length >= 3) {
      const animeResponse = await getAnime(searchValue);
      setAnimeList(animeResponse.data.data);
    }
  };

  const handleSearch = (value) => {
    setSearchInput(value);
    searchAnime(value);

    if (value === "") {
      setAnimeList([]);
    }
  };

  return (
    <motion.div
      initial={animationFrom}
      animate={animateTo}
      className="nav-links"
    >
      <div initial={animationFrom} animate={animateTo} className="search-bar">
        <input
          value={searchInput}
          type="text"
          placeholder="Search anime"
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchInput && (
          <div className="suggestionContainer">
            {animeList.map((anime) => {
              return (
                <div
                  onClick={() => {
                    setAnimeList([]);
                    setAnimeDetailId(anime.node.id);
                  }}
                  className="suggestionItem"
                  key={anime.node.id}
                >
                  <div className="animeInfo">
                    <img alt="anime cover" src={anime.node.main_picture.large} />
                    <p>{anime.node.title}</p>
                  </div>

                  <div className="btnContainer">
                    <button title="Add to currently watching">
                      <AiOutlinePlus />
                    </button>
                    <button>
                      <BsBookmarks title="Add to watch later" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button
          className="closeSearchBtn"
          onClick={() => {
            setSearchInput("");
            setAnimeList([]);
          }}
        >
          {searchInput.length >= 1 && <IoMdClose />}
        </button>
      </div>
      <p
        className="nav-link"
        onClick={() => {
          isMobile && closeMobileMenu();
        }}
      >
        My Watchlist
      </p>

      {userInfo.name ? (
        <img alt="use profile picuture" className="profilePicture" src={userInfo.picture} />
      ) : (
        <p
          className="nav-link"
          onClick={() => {
            isMobile && closeMobileMenu();
            handleLogin();
          }}
        >
          Login with mal
        </p>
      )}

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
