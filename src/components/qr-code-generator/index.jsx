import { useState } from "react";
import QRCode from "react-qr-code";
import { saveAs } from 'file-saver';
import "./styles.css";  // Import the external CSS file

export default function QRCodeGenerator() {
  const [qrCode, setQrCode] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleGenerateQrCode() {
    if (input.trim() === "") {
      setError("Please enter a valid input");
      setSuccess("");
      return;
    }
    setQrCode(input);
    setError("");
    setSuccess("QR Code generated successfully!");
    setInput("");
  }

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(qrCode);
    alert("Copied to clipboard!");
  }

  function downloadQRCode() {
    const svg = document.getElementById("qr-code-value");
    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svg)], { type: "image/svg+xml" });
    saveAs(svgBlob, "qrcode.svg");
  }

  return (
    <div className="container">
      <h1>QR Code Generator</h1>
      <div className="input-container">
        <input
          className="input"
          onChange={(e) => setInput(e.target.value)}
          type="text"
          name="qr-code"
          value={input}
          placeholder="Enter your value here"
        />
        <button
          className="button"
          disabled={input && input.trim() !== "" ? false : true}
          onClick={handleGenerateQrCode}
        >
          Generate
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <div className="qr-container">
        {qrCode && (
          <>
            <QRCode id="qr-code-value" value={qrCode} size={200} bgColor="#fff" />
            <div className="button-container">
              <button className="button" onClick={handleCopyToClipboard}>
                Copy to Clipboard
              </button>
              <button className="button" onClick={downloadQRCode}>
                Download QR Code
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
