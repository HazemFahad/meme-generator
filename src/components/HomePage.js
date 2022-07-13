import React, { useState, useEffect } from "react";
import { getMemes } from "../utils/api";

function HomePage() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [meme, setMeme] = useState(null);

  const objectToQueryParam = (obj) => {
    const paramsMap = Object.entries(obj).map(
      ([key, value]) => `${key}=${value}`
    );
    return "?" + paramsMap.join("&");
  };

  useEffect(() => {
    getMemes().then((response) => {
      setTemplates(response);
    });
  }, []);

  if (meme) {
    return (
      <>
        <div className="header">
          <div className="banner">
            <h1>Enjoy Your Meme!</h1>
          </div>
          <img
            className="logo"
            src="https://www.hazem-fahad.com/static/media/H-hweyz.7888f3db059cc15e3716.png"
            alt="Hazem Logo"
          />
        </div>
        <div className="finalMeme">
          <img style={{ width: 400 }} src={meme} alt="your meme" />
        </div>

        <button
          className="buttons"
          style={{ width: 400 }}
          onClick={() => {
            setMeme(null);
            setTemplate(null);
            setTopText("");
            setBottomText("");
          }}
        >
          Back To HomePage
        </button>
      </>
    );
  }

  return (
    <>
      <div className="header">
        <div className="banner">
          <h1>Create Your Meme!</h1>
          <h2>Hazem Fahad's Meme Generator</h2>
        </div>
        <img
          className="logo"
          src="https://www.hazem-fahad.com/static/media/H-hweyz.7888f3db059cc15e3716.png"
          alt="Hazem Logo"
        />
      </div>
      {template && (
        <div>
          <div className="memeBuilderImageContainer">
            <img
              className="memeBuilderImage"
              key={template.id}
              src={template.url}
              alt="template"
            ></img>
          </div>

          <form
            className="memeForm"
            onSubmit={async (e) => {
              e.preventDefault();

              const params = {
                template_id: template.id,
                text0: topText,
                text1: bottomText,
                username: process.env.REACT_APP_IMGFLIP_USERNAME,
                password: process.env.REACT_APP_IMGFLIP_PASSWORD,
              };

              const response = await fetch(
                `https://api.imgflip.com/caption_image${objectToQueryParam(
                  params
                )}`
              );

              const data = await response.json();

              setMeme(data.data.url);
            }}
          >
            <input
              className="memeBuilderInput"
              id="topText"
              placeholder="Top Text "
              value={topText}
              onChange={(e) => {
                setTopText(e.target.value);
              }}
            />
            <input
              className="memeBuilderInput"
              id="bottomText"
              placeholder="Bottom Text"
              value={bottomText}
              onChange={(e) => {
                setBottomText(e.target.value);
              }}
            />
            <button type="submit" className="buttons">
              Create Meme
            </button>
            <button
              className="buttons"
              onClick={() => {
                setTemplate(null);
                setTopText("");
                setBottomText("");
              }}
            >
              Back To HomePage
            </button>
          </form>
        </div>
      )}
      <div className="photoGrid">
        {!template &&
          templates.map((template) => {
            return (
              <div className="memeImageContainer">
                <img
                  className="memePhoto"
                  style={{ width: 200 }}
                  key={template.id}
                  src={template.url}
                  alt="template"
                  onClick={() => {
                    setTemplate(template);
                  }}
                ></img>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default HomePage;
