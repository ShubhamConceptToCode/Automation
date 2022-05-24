/* global chrome */
import { React, useEffect, useState } from "react";
import styles from "./login.module.css";
import Api from "./Api";

const Login = () => {
  const [info, setInfo] = useState("");
  const [showApi, setShowApi] = useState(false);

  const onClickHandler = (event) => {
    event.preventDefault();
    console.log("changing showApi");
    setShowApi(true);
  };
  useEffect(() => {
    let information;
    chrome.storage.sync.get(["data"], function (res) {
      information = res.data;
      setInfo(information);
    });
  }, []);
  return (
    <>
      {info ? (
        <>
          {showApi ? (
            <Api data={info} />
          ) : (
            <>
              <h1>Zillow Property</h1>
              <button className={styles.c2c_btn} onClick={onClickHandler}>
                <img src="./c2c.jpeg" />
              </button>
              <hr />
              <p className={styles.topPlugin}>
                <span>Address : </span>
                {info["address"]}
                <span style={{ marginLeft: "5px" }}>Bathrooms : </span>
                {info["Bathrooms"]}
                <span style={{ marginLeft: "5px" }}>Bedrooms : </span>
                {info["Bedrooms"]}
                <span style={{ marginLeft: "5px" }}>Zestimate : </span>
                {info["Zestimate®"]}
                <span style={{ marginLeft: "5px" }}>sqft : </span>
                {info["sqft"]} 
                <br/>
                <span style={{ marginLeft: "5px"}}>
                  Country Website URL : </span>
                <div>
                  <a className={styles.countryUrl} href={info["countryWebsiteURL"]}>
                  {info["countryWebsiteURL"]}
                  </a>
                </div>

              </p>
              <hr />
              <p>
                {Object.keys(info).map((item, index) => {
                  if (
                    item !== "Tax Assessment" &&
                    item !== "address" &&
                    item !== "Bathrooms" &&
                    item !== "Bedrooms" &&
                    item !== "Zestimate®" &&
                    item !== "sqft" &&
                    item !== "countryWebsiteURL"
                  ) {
                    return (
                      <div style={{ textAlign: "left" }} key={index}>
                        <span>{item}</span>
                        {info[item + ""]}
                      </div>
                    );
                  }
                })}
              </p>
            </>
          )}
        </>
      ) : (
        <h1>Please Click Again</h1>
      )}
    </>
  );
};

export default Login;
