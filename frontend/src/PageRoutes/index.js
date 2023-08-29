import React, { useState, Fragment } from "react";
import { Route, Navigate, Routes, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet'
import Cookies from 'universal-cookie';

import Casino from "../pages/Casino";
import SportsBetting from "../pages/SportsBetting";
import Home from "../pages/Home";
import ContactUS from "../pages/ContactUS";
import PreSale from "../pages/PreSale";
import ReferralPage from "../pages/ReferralPage";
import Escrow from "../pages/Escrow";

import { useEffect } from 'react';
import {connect} from 'react-redux'
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import {sendReferralCode} from "../actions/userActions";


import {titleDescriptions} from "../utils/data";

import './index.scss';

const PageRoutes = (props) => {
  const [pageData, setPageData] = useState(titleDescriptions.home)
  const cookies = new Cookies();
  const location = useLocation();
  
  useEffect(async () => {
    //setCurrentPage(location.pathname)
    if(location.pathname.toLowerCase().includes("home")){
      setPageData(titleDescriptions.home)
    }
    else if(location.pathname.toLowerCase().includes("casino")){
      setPageData(titleDescriptions.casino)
    }
    else if(location.pathname.toLowerCase().includes("sports-betting")){
      setPageData(titleDescriptions.sportsBetting)
    }
    else if(location.pathname.toLowerCase().includes("referral")){
      setPageData(titleDescriptions.referral)
    }
    else if(location.pathname.toLowerCase().includes("escrow")){
      setPageData(titleDescriptions.escrow)
    }
  }, [location]);
  const setRefCookie = (refCode) => {
    let d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));
    cookies.set("refCode", refCode, {path: "/", expires: d});
  }
  return (
        <div className="content d-flex">
          <Helmet>
            <title>{pageData.title}</title>
            <meta name="description" content={pageData.description} />
            <meta name="keywords" content={pageData.tags} />
          </Helmet>
          <Header />
          <Sidebar />
          <div
              style={{
                flex: "1 1 auto",
                display: "flex",
                flexFlow: "column",
                overflowX: "hidden",
                overflowY: "scroll",
              }}
            >
              <Routes>
                <Route exact path="/" element={ <Navigate to="/home" replace /> } />
                <Route path="/home" element={ <Home /> } />
                <Route path="/casino" element={ <Casino /> } />
                <Route path="/sports-betting" element={ <SportsBetting /> } />
                <Route path="/contact-us" element={ <ContactUS /> } />
                <Route path="/pre-sale" element={ <PreSale /> } />
                <Route path="/referral" element={ <ReferralPage /> } />
                <Route path="/escrow" element={ <Escrow /> } />
                
              </Routes>
          </div>
        </div>
        
  );
};

export default PageRoutes
