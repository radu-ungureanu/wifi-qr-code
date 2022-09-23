import QRCode from "qrcode";
import { useState } from "react";

function App() {
  const connectionTypes = [
    {
      value: "WEP",
      name: "WEP",
    },
    {
      value: "WPA",
      name: "WPA/WPA2-PSK",
    },
    {
      value: "none",
      name: "none",
    },
  ];
  const [type, setType] = useState("WPA");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [qr, setQr] = useState("");

  const generateQRCode = () => {
    const data = `WIFI:T:${type};S:${ssid};P:${password};${
      isHidden ? "H:true;B:true;" : ""
    };`;

    QRCode.toDataURL(
      data,
      {
        width: 400,
        margin: 1,
      },
      (err, url) => setQr(url)
    );
  };

  return (
    <div>
      <h1>WiFi QR Code Generator</h1>
      <div>
        {connectionTypes.map((type) => (
          <span key={type.value}>
            <label>
              <input
                type="radio"
                name="type"
                value={type.value}
                onChange={(e) => setType(e.target.value)}
              />
              {type.name}
            </label>
          </span>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={ssid}
          placeholder="SSID"
          onChange={(e) => setSsid(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isHidden}
            onChange={() => setIsHidden(!isHidden)}
          />
          Is Hidden
        </label>
      </div>
      <button onClick={generateQRCode}>Generate</button>
      <div>{qr && <img src={qr} alt="" />}</div>
    </div>
  );
}

export default App;
