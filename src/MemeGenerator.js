import './index.css';
import React, { useState } from 'react';

export default function MemeGenerator() {
  const baseUrl = 'https://api.memegen.link/images/';

  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [template, setTemplate] = useState('');
  const [imgSrc, setImgSrc] = useState('');

  function handleSubmit() {
    const encodedTopText = encodeURIComponent(topText);
    const encodedBottomText = encodeURIComponent(bottomText);

    if (topText && !bottomText) {
      setImgSrc(
        `${baseUrl.toLowerCase()}${
          template ? template.toLowerCase() : 'buzz'
        }/` +
          encodedTopText.toLowerCase() +
          '.gif',
      );
    } else if (topText && bottomText) {
      setImgSrc(
        `${baseUrl.toLowerCase()}${
          template ? template.toLowerCase() : 'buzz'
        }/${encodedTopText.toLowerCase()}/${encodedBottomText.toLowerCase()}.gif`,
      );
    }
  }

  function handleDownload() {
    const imageUrl = imgSrc;
    const xmlRequest = new XMLHttpRequest();
    xmlRequest.open('GET', imageUrl, true);
    xmlRequest.responseType = 'blob';
    xmlRequest.onload = function () {
      if (this.status === 200) {
        const blob = new Blob([this.response], { type: 'image/gif' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${template}.gif`; // set the desired file name and folder path for the image
        link.click();
        window.URL.revokeObjectURL(url);
      }
    };
    xmlRequest.send();
  }

  return (
    <div className="wrapper">
      <h1 className="title">React Meme Generator</h1>
      <div className="structureBox">
        <div className="placeHolderBox">
          <label htmlFor="top">Top text</label>
        </div>
        <div className="placeHolderBox">
          <label htmlFor="bottom">Bottom text</label>
        </div>

        <input
          id="top"
          placeholder="what's with all the"
          className="input"
          value={topText}
          onChange={(event) => setTopText(event.currentTarget.value)}
        />
        <input
          id="bottom"
          placeholder="meme generators"
          value={bottomText}
          onChange={(event) => setBottomText(event.currentTarget.value)}
        />

        <div className="placeHolderBox">
          <label htmlFor="template">Meme template</label>
        </div>
        <input
          id="template"
          placeholder="buzz"
          className="inputExtra"
          value={template}
          onChange={(event) => setTemplate(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
      </div>

      <button
        className="extraButton"
        data-test-id="generate-meme"
        onClick={() => {
          handleSubmit();
        }}
      >
        Generate meme &#x1F92A;
      </button>
      <img
        data-test-id="meme-image"
        src={
          imgSrc
            ? imgSrc
            : "https://api.memegen.link/images/buzz/what's_with_all_the/meme_generators.gif"
        }
        alt="your meme"
      />
      <p>voilà</p>

      <button
        className="extraButton"
        data-test-id="generate-meme"
        onClick={() => {
          handleDownload();
        }}
      >
        Download
      </button>
      <pre>{!imgSrc ? ' ' : `from: ${imgSrc}`}</pre>
    </div>
  );
}
