import React, { useState, useEffect } from "react";
import { getMemes } from "../utils/api";
import { Meme } from "./Meme";

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
    console.log(meme);
    return (
      <div>
        <img style={{ width: 600 }} src={meme} alt="your meme" />
      </div>
    );
  }

  return (
    <div className="HomePage">
      <h1>Choose Your Meme!</h1>
      <div className="photoGrid">
        {template && (
          <>
            <form
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

                console.log(response, process.env);

                const data = await response.json();

                setMeme(data.data.url);
              }}
            >
              <Meme template={template} />
              <input
                placeholder="Top Text"
                value={topText}
                onChange={(e) => {
                  setTopText(e.target.value);
                }}
              />
              <input
                placeholder="Bottom Text"
                value={bottomText}
                onChange={(e) => {
                  setBottomText(e.target.value);
                }}
              />
              <button type="submit">Create Meme</button>
              <button
                onClick={() => {
                  setTemplate(null);
                }}
              >
                Remove Template
              </button>
            </form>
          </>
        )}
        {!template &&
          templates.map((template) => {
            return (
              <Meme
                template={template}
                onClick={() => {
                  setTemplate(template);
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default HomePage;
