import React, { useState, useEffect, useRef } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
} from "cdbreact";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { connect } from "react-redux";

import { SiTwitter } from "react-icons/si";
import { FaAngleDoubleLeft, FaHandHoldingUsd, FaAngleDoubleRight } from "react-icons/fa";
import { BiHomeSmile } from "react-icons/bi";
import { MdOutlineCasino, MdSportsSoccer } from "react-icons/md";
import { BsTelegram, BsDiscord } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { AiFillGithub, AiOutlineLinkedin, AiFillMediumCircle, AiFillRedditCircle, AiFillFacebook, AiFillSlackCircle } from "react-icons/ai";


import Cell from "./Cell.js";
import "./index.scss";
import { changeCurrentPage } from "../../actions/gameActions";
import AlimangoLogo from '../../assets/images/alimango.png';
import { GithubLink, TelegramLink, LinkedInLink, DiscordLink, MediumLink, RedditLink, FacebookLink, SlackLink, TwitterLink } from '../../utils/data'

const Sidebar = (props) => {
  const {
    changeCurrentPage,
    showStatsModal
  } = props;

  const modalContentRef = useRef(null);
  const [currentPage, setCurrentPage] = useState("");
  const [isSidebarShow, setSidebarShow] = useState(false);
  // const [isMobile, setIsMobile] = useState(false)

  const setPage = (targetPage) => {
    changeCurrentPage(targetPage);
  };
  const location = useLocation();
  const isMobile = useMediaQuery({ query: "(max-width: 1200px)" });
  
  useEffect(() => {
    console.log("~~url", location.pathname);
    setCurrentPage(location.pathname);
  }, [location]);

  const handleOutsideClick = (e) => {
    if (
      (modalContentRef.current &&
        modalContentRef.current?.contains(e.target)) ||
      window.innerWidth > 1200
    ) {
      return;
    }

    // burgerRef.current.classList.remove("left-sidebar-show");
    setSidebarShow(false);
  };

  useEffect(() => {

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  function handleWindowSizeChange() {
    if (window.innerWidth < 1200) {
      // modalContentRef.current.classList.remove("toggled")
      // console.log(modalContentRef.current.classList.contains("toggled"));
      modalContentRef.current.classList.remove("toggled");
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  useEffect(() => {

    if (window.innerWidth < 1200) {
      // modalContentRef.current.classList.remove("toggled")
      // console.log(modalContentRef.current.classList.contains("toggled"));
      modalContentRef.current.classList.remove("toggled");
    }
  }, [isSidebarShow]);
  return (
    <>
      <div
        className="app left-sidebar"
        style={{ display: "flex", height: "100%", overflow: "scroll initial" }}
      >

        <div className="sidebar-mask" />
        {
          isMobile &&
              <CDBSidebarHeader className="display-button">
                <div className="icon">
                  {/* <FaAngleDoubleRight className="right-icon oc-icon"/> */}
                  {isSidebarShow ? (
                    <FaAngleDoubleLeft
                      className="left-icon oc-icon"
                      onClick={() => setSidebarShow(false)}
                    />
                  ) : (
                    <FaAngleDoubleRight
                      className="right-icon oc-icon"
                      onClick={() => setSidebarShow(true)}
                    />
                  )}
                </div>
              </CDBSidebarHeader>
        }
        <CDBSidebar
            textColor="#fff"
            backgroundColor="#333"
            toggled={true}
            ref={modalContentRef}
            // className="left-sidebar-show"
            
            className={
              isMobile ? 
                isSidebarShow ? "left-sidebar-show" : "left-sidebar-hidden"
                : ""
            }
          >
            {
              !isMobile &&
            <CDBSidebarHeader
              className="display-button"
              prefix={
                <div className="icon">
                  <FaAngleDoubleRight className="right-icon oc-icon" />
                  <FaAngleDoubleLeft className="left-icon oc-icon" />
                </div>
              }
            ></CDBSidebarHeader>
            }
            <CDBSidebarContent className="sidebar-content">

              <CDBSidebarMenu>
                
                <Cell
                  linkStr="home"
                  setPage={setPage}
                  selectedPage={currentPage}
                >
                  <BiHomeSmile className="icon" />
                  <span className="detail-str">Home</span>
                </Cell>
                <Cell
                  linkStr="referral"
                  setPage={setPage}
                  selectedPage={currentPage}
                >
                  <FiUsers className="icon" />
                  <span className="detail-str">Referral</span>
                </Cell>
                <Cell
                  linkStr="casino"
                  setPage={setPage}
                  selectedPage={currentPage}
                >
                  <MdOutlineCasino className="icon" />
                  <span className="detail-str">Casino</span>
                </Cell>
                <Cell
                  linkStr="sports-betting"
                  setPage={setPage}
                  selectedPage={currentPage}
                >
                  <MdSportsSoccer className="icon" />
                  <span className="detail-str">Sports betting</span>
                </Cell>
                <Cell
                  linkStr="escrow"
                  setPage={setPage}
                  selectedPage={currentPage}
                >
                  <FaHandHoldingUsd className="icon" />
                  <span className="detail-str">Escrow</span>
                </Cell>
              </CDBSidebarMenu>
              
            </CDBSidebarContent>

            <CDBSidebarFooter style={{ textAlign: "center" }}>
              <img className="alimango-logo" src={AlimangoLogo}></img>
              <div
                className="sidebar-btn-wrapper"
                style={{
                  padding: "20px 5px",
                }}
              >
                <a
                  href={GithubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillGithub className="sidebar-foot-btn" />
                </a>
                <a
                  href={TelegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsTelegram className="sidebar-foot-btn" />
                </a>

                <a
                  href={LinkedInLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineLinkedin className="sidebar-foot-btn" />
                </a>
                <a
                  href={DiscordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsDiscord className="sidebar-foot-btn" />
                </a>
                <a
                  href={MediumLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillMediumCircle className="sidebar-foot-btn" />
                </a>
                <a
                  href={RedditLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillRedditCircle className="sidebar-foot-btn" />
                </a>
                <a
                  href={FacebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillFacebook className="sidebar-foot-btn" />
                </a>
                
                <a
                  href={SlackLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillSlackCircle className="sidebar-foot-btn" />
                </a>
                <a
                  href={TwitterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiTwitter className="sidebar-foot-btn" />
                </a>
                
               
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentPage: state.gameData.currentPage
});
export default connect(mapStateToProps, {
    changeCurrentPage
  })(Sidebar);
