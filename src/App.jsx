import React, { useState } from "react";
import { QRCode } from "react-qrcode-logo";
import "./scss/style.scss";

function App() {
  const [isQrLk, setIsQrLk] = useState(`https://www.bexruz.uz/`);
  const [isQrSz, setIsQrSz] = useState(200);
  const [isQrLgPath, setIsQrLgPath] = useState("/");

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

  const QRCodeComponent = () => {
    return (
      <>
        <QRCode
          value={isQrLk} // link
          ecLevel="H" // The error correction level of the QR Code
          size={isQrSz} // size QR code
          logoImage={isQrLgPath} // logo
          logoWidth={isQrSz * 0.2} // wodth logo
          logoHeight={isQrSz * 0.2} // height logo
          logoOpacity={1} // logo opcity
          removeQrCodeBehindLogo={false} // logo backgroundd
          eyeColor="#000" // eyes color
          bgColor="#fff" // background color
          fgColor="#000" // QR code color
          eyeRadius={[
            [10, 10, 0, 10], // top/left eye
            [10, 10, 10, 0], // top/right eye
            [10, 0, 10, 10], // bottom/left
          ]}
          logoPaddingStyle="square" // style logo square | circle
          qrStyle="dots" // squares | dots QR dots styles
          id="qr-code-id" // QR code elelemt ID
        />
      </>
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
                onChange={(e) => {
                  setIsQrLgPath(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>
            <button className="qrCode__btn" onClick={() => downloadCode()}>
              Download QR Code
            </button>
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
