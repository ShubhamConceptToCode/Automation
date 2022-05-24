/* global chrome */
import React from "react";
import Webhook from "./Webhook";
import styles from "./login.module.css";

localStorage.setItem("api_key", "c2c_123");

const Api = (props) => {
  const [showWebhook, setShowWebhook] = React.useState(false);
  const [apiEntered, setApiEntered] = React.useState(false);
  const [enterApi, setEnterApi] = React.useState("");
  React.useEffect(() => {
    console.log("inside useEffect");
    chrome.storage.sync.get(["key"], function (result) {
      if (result.key) {
        setShowWebhook(true);
        setApiEntered(true);
      }
    });
  }, []);
  const onClickHandler = (e) => {
    e.preventDefault();
    console.log("changing showWebhook...");
    if (enterApi === localStorage.getItem("api_key")) {
      setApiEntered(true);
      chrome.storage.sync.set({ key: true }, function () {
        console.log("chrome store!!!");
      });
    }
    setShowWebhook(true);
  };
  const onChangeHandler = (e) => {
    setEnterApi(e.target.value);
  };
  const onClickBack = (e) => {
    e.preventDefault();
    setShowWebhook(false);
  };
  return (
    <>
      {showWebhook ? (
        <>
          {apiEntered ? (
            <Webhook data={props.data} />
          ) : (
            <div className={styles.api}>
              <h1>Entered API KEY Is Not Valid</h1>
              <button className={styles._btn} onClick={onClickBack}>
                Back
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.api_key_div}>
          <label>Api Key</label>
          <input style={{ margin: "10px" }} onChange={onChangeHandler} />
          <button className={styles._btn} onClick={onClickHandler}>
            send
          </button>
        </div>
      )}
    </>
  );
};

export default Api;
