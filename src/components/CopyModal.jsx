import React, { useState } from "react";
import { Copy, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CopyModal = ({ isOpen, onClose, secretKey }) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const clearParams = () => {
    navigate(window.location.pathname, { replace: true });
  };

  const handleDownload = (key) => {
    const blob = new Blob([key], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "supersecretkey.txt";
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[50]">
      <div className="bg-[#111] text-white rounded-xl shadow-xl max-w-md w-full relative border border-green-400/10">
        <button
          onClick={() => {
            clearParams();
            onClose();
          }}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Your Secret Key</h2>

          <div className="bg-green-950/40 border-l-4 border-green-400 p-4 mb-4 rounded">
            <p className="text-sm text-green-300">
              Please store this key safely. You won't be able to see it again!
            </p>
          </div>

          <div className="bg-[#222] p-4 rounded-md flex items-center justify-between mb-4 border border-gray-700">
            <code className="font-mono text-sm break-all text-green-200">{secretKey}</code>
            <button
              onClick={() => handleCopy(secretKey)}
              className="ml-2 p-2 text-gray-300 hover:text-green-400 rounded-md hover:bg-[#333]"
              aria-label="Copy secret key"
            >
              {copied ? (
                <Check size={20} className="text-green-500" />
              ) : (
                <Copy size={20} />
              )}
            </button>
          </div>

          <div className="text-sm text-gray-400 space-y-2">
            <p>This key grants access to your account's sensitive data.</p>
            <p>If you lose this key, you'll need to generate a new one.</p>
          </div>

          <button
            onClick={() => {
              handleDownload(secretKey);
              clearParams();
            }}
            className="mt-6 w-full bg-green-500 text-black py-2 px-4 rounded-lg hover:bg-green-400 transition-colors duration-200 font-semibold"
          >
            Save the Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyModal;
