"use client";

import { useState, useEffect, useRef } from "react";
import domtoimage from "dom-to-image";

function GradientPreview({ gradient, isGenerating, previewRef, children }) {
  return (
    <div
      ref={previewRef}
      className="relative rounded-lg overflow-hidden border border-gray-800 shadow-lg h-full w-full bg-black"
    >
      {/* Base Gradient */}
      <div className="absolute inset-0" style={gradient} />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>

      {/* Children (e.g., text layer) will be rendered here */}
      {children}

      {isGenerating && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

// Gradient Code Component
function GradientCode({ gradient }) {
  const gradientValue = gradient.background || "";
  let codeString = `background: ${gradientValue};`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="bg-gray-950/50 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden">
      <div className="px-3.5 py-2.5 border-b border-gray-800 flex justify-between items-center">
        <div className="text-sm font-medium text-gray-200">CSS Output</div>
        <button
          onClick={copyToClipboard}
          className="text-xs bg-gray-900 hover:bg-gray-800 text-gray-200 px-2.5 py-1 rounded transition-colors flex items-center border border-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </button>
      </div>
      <div className="p-3.5">
        <pre className="text-xs bg-gray-950/80 text-gray-300 p-3 rounded overflow-x-auto border border-gray-800">
          <code>{codeString}</code>
        </pre>
      </div>
    </div>
  );
}

// Download Panel Component
function DownloadPanel({ onDownloadPNG, isDownloading }) {
  return (
    <div className="bg-gray-950/50 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-5">
      <h2 className="text-base font-semibold text-gray-100 mb-3.5 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Download
      </h2>
      <div className="space-y-2.5">
        <button
          onClick={onDownloadPNG}
          disabled={isDownloading}
          className="w-full py-2 px-3 rounded-md font-medium transition-all flex items-center justify-center bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-100 text-sm"
        >
          {isDownloading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download as PNG
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Text Editor Panel Component
function TextEditorPanel({
  text,
  setText,
  fontSize,
  setFontSize,
  isBold,
  setIsBold,
  isItalic,
  setIsItalic,
  textColor,
  setTextColor,
  textPosition,
  setTextPosition,
  onRemoveText,
  previewRef,
}) {
  return (
    <div className="bg-gray-950/50 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-5">
      <h2 className="text-base font-semibold text-gray-100 mb-3.5 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>
        Text Editor
      </h2>
      <div className="space-y-3.5">
        {/* Text Input */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">
            Text Content
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-md px-3 py-2 text-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows="3"
            placeholder="Enter your text here..."
          />
        </div>

        {/* Font Size Slider */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">
            Font Size: {fontSize}px
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Text Style Toggles (Bold/Italic) */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">
            Text Style
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsBold(!isBold)}
              className={`px-2.5 py-1.5 text-xs rounded transition-colors ${
                isBold
                  ? "bg-blue-600 text-white border border-blue-500"
                  : "bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800"
              }`}
            >
              Bold
            </button>
            <button
              onClick={() => setIsItalic(!isItalic)}
              className={`px-2.5 py-1.5 text-xs rounded transition-colors ${
                isItalic
                  ? "bg-blue-600 text-white border border-blue-500"
                  : "bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800"
              }`}
            >
              Italic
            </button>
          </div>
        </div>

        {/* Text Color Picker */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">
            Text Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-8 h-8 border border-gray-800 rounded cursor-pointer bg-gray-900"
            />
            <span className="text-gray-400 text-xs">{textColor}</span>
          </div>
        </div>

        {/* Text Position Info */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">
            Position (Drag text on preview)
          </label>
          <div className="text-gray-500 text-xs">
            X: {Math.round(textPosition.x)}px, Y: {Math.round(textPosition.y)}px
          </div>
        </div>

        {/* Remove Text Button */}
        <button
          onClick={onRemoveText}
          disabled={!text}
          className={`w-full py-2 px-3 rounded-md font-medium transition-colors flex items-center justify-center text-sm ${
            text
              ? "bg-red-900/50 hover:bg-red-800/50 text-red-300 border border-red-800/50"
              : "bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Remove Text
        </button>
      </div>
    </div>
  );
}

// Control Panel Component
function ControlPanel({ onGenerate, isGenerating }) {
  return (
    <div className="bg-gray-950/50 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-5">
      <h2 className="text-base font-semibold text-gray-100 mb-3.5 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Controls
      </h2>
      <button
        onClick={onGenerate}
        disabled={isGenerating}
        className={`
          w-full py-3 px-3 rounded-md font-medium transition-all flex items-center justify-center text-sm
          ${
            isGenerating
              ? "bg-gray-900 text-gray-500 cursor-not-allowed border border-gray-800"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 active:scale-[0.98] shadow-md border border-blue-500/30"
          }
        `}
      >
        {isGenerating ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Generate New Gradient
          </>
        )}
      </button>
      <div className="mt-5 pt-4 border-t border-gray-800">
        <h3 className="text-xs font-medium text-gray-500 mb-1.5 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          About Static Gradients
        </h3>
        <p className="text-xs text-gray-500">
          Static gradients maintain a fixed appearance with layered radial
          gradients.
        </p>
      </div>
    </div>
  );
}

// History Item Component
function HistoryItem({ gradient, onClick }) {
  return (
    <div
      className="rounded-md overflow-hidden border border-gray-800 cursor-pointer hover:border-blue-500/30 transition-all h-16 relative group bg-black"
      onClick={onClick}
    >
      <div className="absolute inset-0" style={gradient}></div>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>
    </div>
  );
}

// History Panel Component
function HistoryPanel({ history, onApply }) {
  return (
    <div className="bg-gray-950/50 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-5">
      <h2 className="text-base font-semibold text-gray-100 mb-3.5 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2 text-purple-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        History
      </h2>
      {history.length === 0 ? (
        <div className="text-center py-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mx-auto text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600 text-xs mt-1.5">
            No gradients generated yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {history.map((gradient, index) => (
            <HistoryItem
              key={index}
              gradient={gradient}
              onClick={() => onApply(gradient)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Main App Component
export default function App() {
  const [gradient, setGradient] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [history, setHistory] = useState([]);

  // --- Text State ---
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [textColor, setTextColor] = useState("#ffffff");
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });

  const previewRef = useRef(null);

  const getRandomColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padEnd(6, "0")
    );
  };

  const generateMeshGradient = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const colorCount = Math.floor(Math.random() * 4) + 3;
      const colors = Array.from({ length: colorCount }, () => getRandomColor());

      const gradients = colors.map((color, i) => {
        const posX = Math.floor(Math.random() * 100);
        const posY = Math.floor(Math.random() * 100);
        const size = 50 + Math.floor(Math.random() * 100);
        return `radial-gradient(circle at ${posX}% ${posY}%, ${color} 0%, transparent ${size}%)`;
      });

      const baseGradient = gradients.join(", ");

      const newGradient = {
        background: baseGradient,
        backgroundSize: "cover",
      };

      setGradient(newGradient);
      setHistory((prev) => [newGradient, ...prev].slice(0, 9));
      setIsGenerating(false);
    }, 500);
  };

  const applyGradient = (gradient) => {
    setGradient(gradient);
  };

  const removeText = () => {
    setText("");
  };

  const downloadPNG = async () => {
    if (!previewRef.current) return;

    setIsDownloading(true);

    try {
      const dataUrl = await domtoimage.toPng(previewRef.current, {
        quality: 1.0,
        width: previewRef.current.offsetWidth * 2,
        height: previewRef.current.offsetHeight * 2,
        style: {
          transform: "scale(2)",
          transformOrigin: "top left",
          backgroundColor: "black",
        },
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `mesh-gradient-with-text-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("PNG download failed:", error);
      alert("PNG download failed. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Drag handling functions
  const handleDragStart = (e) => {
    e.preventDefault();
    if (!previewRef.current) return;

    let isDragging = true;

    const getCoordinates = (event) => {
      if (event.type.includes("touch")) {
        const touch = event.touches[0] || event.changedTouches[0];
        const rect = previewRef.current.getBoundingClientRect();
        return {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        };
      } else {
        const rect = previewRef.current.getBoundingClientRect();
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
      }
    };

    const handleDragMove = (moveEvent) => {
      if (!isDragging || !previewRef.current) return;
      const { x, y } = getCoordinates(moveEvent);
      setTextPosition({ x, y });
    };

    const handleDragEnd = () => {
      isDragging = false;
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleDragEnd);
    };

    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDragMove, { passive: false });
    document.addEventListener("touchend", handleDragEnd);
  };

  useEffect(() => {
    generateMeshGradient();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <header className="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-7 h-7 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                ></svg>
              </div>
              <h1 className="ml-2.5 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Mesh Engine
              </h1>
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-purple-900/30 text-purple-400 border border-purple-800/30">
                Static Mode
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
          <div className="lg:col-span-2 space-y-5 w-full">
            <div className="h-[480px] w-full">
              <GradientPreview
                gradient={gradient}
                isGenerating={isGenerating}
                previewRef={previewRef}
              >
                {text && (
                  <div
                    className="absolute cursor-move select-none touch-none"
                    style={{
                      left: `${textPosition.x}px`,
                      top: `${textPosition.y}px`,
                      fontSize: `${fontSize}px`,
                      fontWeight: isBold ? "bold" : "normal",
                      fontStyle: isItalic ? "italic" : "normal",
                      color: textColor,
                      transform: "translate(-50%, -50%)",
                      whiteSpace: "pre-wrap",
                      maxWidth: "90%",
                      wordBreak: "break-word",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      touchAction: "none",
                    }}
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                  >
                    {text}
                  </div>
                )}
              </GradientPreview>
            </div>
            <GradientCode gradient={gradient} />
          </div>
          <div className="space-y-5">
            <ControlPanel
              onGenerate={generateMeshGradient}
              isGenerating={isGenerating}
            />
            <TextEditorPanel
              text={text}
              setText={setText}
              fontSize={fontSize}
              setFontSize={setFontSize}
              isBold={isBold}
              setIsBold={setIsBold}
              isItalic={isItalic}
              setIsItalic={setIsItalic}
              textColor={textColor}
              setTextColor={setTextColor}
              textPosition={textPosition}
              setTextPosition={setTextPosition}
              onRemoveText={removeText}
              previewRef={previewRef}
            />
            <DownloadPanel
              onDownloadPNG={downloadPNG}
              isDownloading={isDownloading}
            />
            <HistoryPanel history={history} onApply={applyGradient} />
          </div>
        </div>
      </main>
    </div>
  );
}
