import { React, useEffect, useState } from "react";
import styles from "./login.module.css";

const Webhook = ({ data }) => {
  const [webHook, setWebhook] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const onChangeHandler = (e) => {
    setWebhook(e.target.value);
    console.log("Check Onchange:",e.target.value)
  };
  const onClickHandler = (e) => {
    console.log("OnClick Webhook")
    e.preventDefault();
    /* if (webHook !== "http://localhost:3000/webhook") {
      setError(true);
    } */ 
    if(webHook === "https://workflow-automation.podio.com/catch/323ao85q06pl7c3") {
      console.log("Calling Succcess")
      setSuccess(true);
      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch("https://workflow-automation.podio.com/catch/323ao85q06pl7c3", payload);
    }
  };
  const onClickBack = (e) => {
    e.preventDefault();
    setError(false);
  };
  return (
    <>
      {success ? (
        <div className={styles.api}>
          <h1>Data Send Successfully</h1>
        </div>
      ) : error ? (
        <div className={styles.api_webhook}>
          <h1>Invalid WebHook</h1>
          <button className={styles._btn} onClick={onClickBack}>
            Back
          </button>
        </div>
      ) : (
        <>
          <p>
            <span>Address : </span>
            {data["address"]}
            <span style={{ marginLeft: "5px" }}>Bathrooms : </span>
            {data["Bathrooms"]}
            <span style={{ marginLeft: "5px" }}>Bedrooms : </span>
            {data["Bedrooms"]}
            <span style={{ marginLeft: "5px" }}>Zestimate : </span>
            {data["Zestimate®"]}
            <span style={{ marginLeft: "5px" }}>sqft : </span>
            {data["sqft"]}
            <br/>
                <span style={{ marginLeft: "5px"}}>
                  Country Website URL : </span>
               <div>
                  <a className={styles.countryUrl} href={data["countryWebsiteURL"]}>
                  {data["countryWebsiteURL"]}
                  </a>
                </div>
          </p>
          <hr />
          <p>
            {Object.keys(data).map((item, index) => {
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
                    {data[item + ""]}
                  </div>
                );
              }
            })}
          </p>
          <hr />
          <div className={styles.webhook}>
            <label>Enter Webhook</label>
            <input style={{ margin: "4px" }} onChange={onChangeHandler} />
            <button className={styles._btn} onClick={onClickHandler}>
              send
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Webhook;
