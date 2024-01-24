import React, { useState, useEffect } from "react";
import { QRCode } from "react-qrcode-logo";
import "./scss/style.scss";

function App() {
  const [isQrLk, setIsQrLk] = useState(`https://www.bexruz.uz/`);
  const [isQrSz, setIsQrSz] = useState(200);
  const [isQrColor, setIsQrColor] = useState("#ffffff");
  const [isQrDotColor, setIsQrDotColor] = useState("#000000");
  const [isQrEyeColor, setIsQrEyeColor] = useState("#000000");
  const [isQrDot, setIsQrDot] = useState(false);
  const [isQrLgPath, setIsQrLgPath] = useState(false);
  const [isQrRadius, setIsQrRadius] = useState(0);
  const [isQrImageW, setISQrImageW] = useState(0);
  const [isQrImageH, setISQrImageH] = useState(0);

  const removeImage = () => setIsQrLgPath(false);
  const downloadCode = () => {
    const canvas = document.querySelector("#qr-code-id");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `your_qr_code.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const loadImage = (e) => {
    const ev = e.currentTarget.files;

    if (ev) {
      const img = document.createElement("img");
      const targetWidth = 100;
      const targetHeight = 100;
      img.onload = function (event) {
        const aspectRatio = event.target.width / event.target.height;
        let newWidth, newHeight;

        if (aspectRatio > 1) {
          newWidth = Math.min(targetWidth, aspectRatio * targetHeight);
          newHeight = Math.min(targetHeight, targetWidth / aspectRatio);
        } else {
          newWidth = Math.min(targetWidth, targetHeight / aspectRatio);
          newHeight = Math.min(targetHeight, aspectRatio * targetWidth);
        }

        console.log({
          width: event.target.width,
          height: event.target.height,
          newWidtg: newWidth,
          newHeight: newHeight,
        });

        setISQrImageW(newWidth);
        setISQrImageH(newHeight);
      };

      img.src = URL.createObjectURL(e.target.files[0]);
    }
    setIsQrLgPath(URL.createObjectURL(e.target.files[0]));
  };

  const QRCodeComponent = () => {
    return (
      <div className="qr__container">
        <QRCode
          value={isQrLk} // link
          ecLevel="H" // The error correction level of the QR Code
          size={isQrSz} // size QR code
          quietZone={10}
          logoImage={isQrLgPath} // logo
          logoWidth={isQrImageW} // wodth logo
          logoHeight={isQrImageH} // height logo
          logoOpacity={1} // logo opcity
          removeQrCodeBehindLogo={false} // logo backgroundd
          logoPaddingStyle="square" // style logo square | circle
          logoPadding={0}
          eyeColor={isQrEyeColor} // eyes color
          bgColor={isQrColor} // background color
          fgColor={isQrDotColor} // QR code color
          eyeRadius={+isQrRadius}
          qrStyle={isQrDot ? "dots" : "squares"} // squares | dots QR dots styles
          id="qr-code-id" // QR code elelemt ID
        />
        <button className="qrCode__btn btn" onClick={() => downloadCode()}>
          Download QR Code
        </button>
      </div>
    );
  };

  return (
    <>
      <main>
        <section className="container app__container">
          <div className="form__qr">
            <input
              type="text"
              placeholder="url web site"
              onChange={(e) => {
                setIsQrLk(e.target.value);
              }}
            />
            <div>
              <label htmlFor="image-update">Add QR code logo</label>
              <input
                style={{ display: "none" }}
                type="file"
                className="input-file"
                id="image-update"
                name="imgUpload"
                accept="image/*"
                onChange={(e) => loadImage(e)}
              />
            </div>
            <div className="color__input">
              <input
                type="color"
                onInput={(e) => setIsQrColor(e.target.value)}
                value={isQrColor}
              />
              <input
                type="color"
                onInput={(e) => setIsQrDotColor(e.target.value)}
                value={isQrDotColor}
              />
              <input
                type="color"
                onInput={(e) => setIsQrEyeColor(e.target.value)}
                value={isQrEyeColor}
              />
            </div>

            <input
              type="number"
              min="0"
              max="21"
              onInput={(e) => setIsQrRadius(e.target.value)}
              value={isQrRadius}
            />

            {isQrLgPath && (
              <button
                className="qrRemove__btn btn"
                onClick={() => removeImage()}
              >
                Remove image
              </button>
            )}

            <div>
              <button
                className="qrDot__btn btn"
                onClick={() => setIsQrDot(false)}
              >
                squares
              </button>
              <button
                className="qrDot__btn btn"
                onClick={() => setIsQrDot(true)}
              >
                Dots
              </button>
            </div>
          </div>

          <div className="app__qrcode">
            <div className="app__qr__size">
              <QRCodeComponent />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
