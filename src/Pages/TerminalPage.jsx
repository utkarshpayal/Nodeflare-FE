
// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

function ContainerAccess() {
  const [containerId, setContainerId] = useState("");
  const [containerStatus, setContainerStatus] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [terminals, setTerminals] = useState({});
  const [sockets, setSockets] = useState({});
  const [activeTab, setActiveTab] = useState(null);
  const [termCounter, setTermCounter] = useState(1);
  const [availableIds, setAvailableIds] = useState([]);
  const terminalContainerRef = useRef(null);

  useEffect(() => {
    const storedContainerId = localStorage.getItem("containerId");
    if (storedContainerId) {
      setContainerId(storedContainerId);
      setStatusMessage(`Connected to container <b>${storedContainerId}</b>`);
    } else {
      setStatusMessage("Please enter a container ID to connect.");
    }
  }, []);

  const connectToContainer = async () => {
    console.log("after connect")
    if (!containerId.trim()) {
      setStatusMessage("Please enter a valid container ID.");
      return;
    }

    try {
      console.log("inside try")
      // Verify that the container exists and is running
      const response = await fetch(
        `http://localhost:3000/status?id=${containerId}`
      );
      const data = await response.json();
      console.log("data:",data)
      
      if (data.error) throw new Error(data.error);
      if (data.status !== "running") throw new Error("Container is not running");
      
      // Save container ID to local storage
      localStorage.setItem("containerId", containerId);
      setStatusMessage(`Connected to container <b>${containerId}</b> successfully.`);
      
      // Automatically open a terminal
      addTerminal();
    } catch (error) {
      setStatusMessage(`Error connecting to container: ${error.message}`);
    }
  };

  const stopContainer = async () => {
    if (!containerId) {
      setStatusMessage("No container ID provided.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/containers/stop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: containerId }),
      });
      const data = await response.json();

      if (data.error) throw new Error(data.error);

      setStatusMessage(
        `Container <b>${containerId}</b> has been stopped.`
      );
      
      // Close all terminals
      Object.values(sockets).forEach((socket) => {
        if (socket) socket.close();
      });
      setSockets({});
      
      // Clear all terminals
      Object.values(terminals).forEach((term) => {
        if (term) term.dispose();
      });
      setTerminals({});
      
      // Reset active tab
      setActiveTab(null);
      
      // Clear container ID
      setContainerId("");
      localStorage.removeItem("containerId");
    } catch (error) {
      setStatusMessage(`Error stopping container: ${error.message}`);
    }
  };

  const fetchContainerStatus = async () => {
    if (!containerId) {
      setStatusMessage("Please enter a container ID first.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/status?id=${containerId}`
      );
      const data = await response.json();
      setContainerStatus(data);
      setShowStatusModal(true);
    } catch (error) {
      setContainerStatus({ error: "Error fetching status." });
      setShowStatusModal(true);
    }
  };
const downloadContainerBackup = async (containerId) => {
  if (!containerId) {
    alert("Please provide a container ID.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/containers/backup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: containerId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to download backup.");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${containerId}.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Backup download error:", error.message);
    alert("Failed to download backup: " + error.message);
  }
};

const downloadLogs = async () => {
  if (!containerId) {
    setStatusMessage("Please enter a container ID first.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/containers/logs?id=${containerId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch logs");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `container-logs-${containerId}.txt`; // filename
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    setStatusMessage("Logs downloaded successfully.");
  } catch (error) {
    console.error("Error downloading logs:", error);
    setContainerStatus({ error: "Error in downloading!" });
    setShowStatusModal(true);
  }
};

  const addTerminal = () => {
    if (!containerId) {
      setStatusMessage("Please connect to a container first.");
      return;
    }
    
    let termId;
    if (availableIds.length) {
      termId = availableIds[0];
      setAvailableIds((prevIds) => prevIds.slice(1));
    } else {
      termId = `term-${termCounter}`;
      setTermCounter((prev) => prev + 1);
    }

    if (terminals[termId]) {
      switchTerminal(termId);
      return;
    }

    // Create terminal element
    const termElement = document.createElement("div");
    termElement.id = termId;
    termElement.style.display = "none";
    termElement.className = "xterm w-full";
    terminalContainerRef.current.appendChild(termElement);

    // Initialize Terminal
    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      width: 100,
      theme: {
        background: "#0a0a0a",
        foreground: "#e0e0e0",
        cursor: "#7dd653",
        selection: "rgba(125, 214, 83, 0.3)",
      },
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(termElement);
    fitAddon.fit();

    // Setup WebSocket with container ID
    console.log("container id:",containerId)
    const socket = new WebSocket(`ws://localhost:3000/terminal/${containerId}`);
    
    socket.onopen = () => term.write(`Connected to container!\r\n\n`);
    socket.onmessage = (event) => term.write(event.data);
    socket.onerror = () => term.write("Error connecting to container terminal.\r\n");
    socket.onclose = () => term.write("Connection closed.\r\n");
    term.onData((data) => socket.send(data));

    // Update state
    setTerminals((prev) => ({ ...prev, [termId]: term }));
    setSockets((prev) => ({ ...prev, [termId]: socket }));
    switchTerminal(termId);
  };

  const switchTerminal = (termId) => {
    Object.keys(terminals).forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.style.display = "none";
    });

    const element = document.getElementById(termId);
    if (element) element.style.display = "block";
    setActiveTab(termId);
  };

  const closeTerminal = (termId, e) => {
    e.stopPropagation();

    // Close socket
    if (sockets[termId]) {
      sockets[termId].close();
      setSockets((prev) => {
        const newSockets = { ...prev };
        delete newSockets[termId];
        return newSockets;
      });
    }

    // Dispose terminal
    if (terminals[termId]) {
      terminals[termId].dispose();
      setTerminals((prev) => {
        const newTerminals = { ...prev };
        delete newTerminals[termId];
        return newTerminals;
      });
    }

    // Remove DOM element
    const element = document.getElementById(termId);
    if (element) element.remove();

    // Update available IDs
    setAvailableIds((prev) => [...prev, termId]);

    // Switch to another tab if needed
    if (activeTab === termId) {
      const remainingTabs = Object.keys(terminals).filter(
        (id) => id !== termId
      );
      if (remainingTabs.length) {
        switchTerminal(remainingTabs[0]);
      } else {
        setActiveTab(null);
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        minHeight: "100vh",
        color: "#e0e0e0",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          paddingTop: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            margin: "0 0 16px 0",
            background: "linear-gradient(135deg, #7dd653, #4ade80)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.02em",
          }}
        >
          CONTAINER ACCESS
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#888",
            margin: 0,
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: "1.6",
          }}
        >
          Connect to and manage your containers with advanced terminal access
        </p>
      </div>

      {/* Control Panel */}
      <div
        style={{
          backgroundColor: "#1a1a1a",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "24px",
          border: "1px solid #2a2a2a",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "20px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: "1",
              minWidth: "300px",
            }}
          >
            <label
              htmlFor="containerId"
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#e0e0e0",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Container ID
            </label>
            <input
              id="containerId"
              type="text"
              placeholder="Enter container ID..."
              value={containerId}
              onChange={(e) => setContainerId(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "2px solid #2a2a2a",
                borderRadius: "12px",
                backgroundColor: "#0f0f0f",
                fontSize: "16px",
                color: "#e0e0e0",
                outline: "none",
                transition: "all 0.3s ease",
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#7dd653";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(125, 214, 83, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#2a2a2a";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <button
            onClick={connectToContainer}
            style={{
              background: "linear-gradient(135deg, #7dd653, #4ade80)",
              color: "#0a0a0a",
              border: "none",
              borderRadius: "12px",
              padding: "14px 24px",
              fontWeight: "700",
              fontSize: "16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              boxShadow: "0 4px 16px rgba(125, 214, 83, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(125, 214, 83, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(125, 214, 83, 0.3)";
            }}
          >
            <svg
              style={{ marginRight: "8px" }}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Connect
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={stopContainer}
            disabled={!containerId}
            style={{
              backgroundColor: containerId ? "#dc2626" : "#2a2a2a",
              color: containerId ? "#ffffff" : "#666",
              border: "none",
              borderRadius: "12px",
              padding: "12px 20px",
              fontWeight: "600",
              fontSize: "14px",
              cursor: containerId ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
            onMouseEnter={(e) => {
              if (containerId) {
                e.currentTarget.style.backgroundColor = "#b91c1c";
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (containerId) {
                e.currentTarget.style.backgroundColor = "#dc2626";
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            <svg
              style={{ marginRight: "8px" }}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            Stop Container
          </button>
<button
  onClick={() => downloadContainerBackup(containerId)}
  disabled={!containerId}
  style={{
    backgroundColor: containerId ? "#1f2937" : "#2a2a2a",
    color: containerId ? "#e0e0e0" : "#666",
    border: containerId ? "1px solid #4b5563" : "1px solid #2a2a2a",
    borderRadius: "12px",
    padding: "12px 20px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: containerId ? "pointer" : "not-allowed",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  }}
>
  <svg
    style={{ marginRight: "8px" }}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
  Backup Container
</button>

          <button
            onClick={fetchContainerStatus}
            disabled={!containerId}
            style={{
              backgroundColor: containerId ? "#1f2937" : "#2a2a2a",
              color: containerId ? "#e0e0e0" : "#666",
              border: containerId ? "1px solid #4b5563" : "1px solid #2a2a2a",
              borderRadius: "12px",
              padding: "12px 20px",
              fontWeight: "600",
              fontSize: "14px",
              cursor: containerId ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
            onMouseEnter={(e) => {
              if (containerId) {
                e.currentTarget.style.backgroundColor = "#374151";
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (containerId) {
                e.currentTarget.style.backgroundColor = "#1f2937";
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            <svg
              style={{ marginRight: "8px" }}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            Container Status
          </button>

      <button
  onClick={downloadLogs}
  disabled={!containerId}
  style={{
    backgroundColor: containerId ? "#1f2937" : "#2a2a2a",
    color: containerId ? "#e5e7eb" : "#6b7280",
    border: "1px solid",
    borderColor: containerId ? "#4b5563" : "#374151",
    borderRadius: "12px",
    padding: "10px 18px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: containerId ? "pointer" : "not-allowed",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s ease",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    boxShadow: containerId
      ? "0 2px 4px rgba(0,0,0,0.1)"
      : "none",
  }}
  onMouseEnter={(e) => {
    if (containerId) {
      e.currentTarget.style.backgroundColor = "#374151";
      e.currentTarget.style.transform = "translateY(-2px)";
    }
  }}
  onMouseLeave={(e) => {
    if (containerId) {
      e.currentTarget.style.backgroundColor = "#1f2937";
      e.currentTarget.style.transform = "translateY(0)";
    }
  }}
>
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
  Download Logs
</button>

        </div>

        {statusMessage && (
          <div
            style={{
              padding: "16px 20px",
              backgroundColor: "#1f2937",
              border: "1px solid #7dd653",
              borderRadius: "12px",
              marginTop: "20px",
              fontSize: "14px",
              borderLeft: "4px solid #7dd653",
            }}
            dangerouslySetInnerHTML={{ __html: statusMessage }}
          />
        )}
      </div>

      {/* Terminal Section */}
      <div
        style={{
          backgroundColor: "#1a1a1a",
          borderRadius: "16px",
          border: "1px solid #2a2a2a",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minHeight: "500px",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "16px 20px",
            borderBottom: "1px solid #2a2a2a",
            backgroundColor: "#1f1f1f",
            alignItems: "center",
          }}
        >
          <button
            onClick={addTerminal}
            disabled={!containerId}
            style={{
              background: containerId 
                ? "linear-gradient(135deg, #7dd653, #4ade80)" 
                : "#2a2a2a",
              color: containerId ? "#0a0a0a" : "#666",
              border: "none",
              borderRadius: "10px",
              padding: "10px 16px",
              fontWeight: "700",
              fontSize: "14px",
              cursor: containerId ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              marginRight: "16px",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
            onMouseEnter={(e) => {
              if (containerId) {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(125, 214, 83, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              if (containerId) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          >
            <svg
              style={{ marginRight: "8px" }}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
            New Terminal
          </button>

          <div
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "8px",
            }}
          >
            {Object.keys(terminals).map((termId) => (
              <div
                key={termId}
                onClick={() => switchTerminal(termId)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 16px",
                  backgroundColor: activeTab === termId ? "#7dd653" : "#2a2a2a",
                  color: activeTab === termId ? "#0a0a0a" : "#e0e0e0",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: activeTab === termId ? "700" : "500",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                  border: activeTab === termId ? "none" : "1px solid #3a3a3a",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== termId) {
                    e.currentTarget.style.backgroundColor = "#3a3a3a";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== termId) {
                    e.currentTarget.style.backgroundColor = "#2a2a2a";
                  }
                }}
              >
                <span>Terminal {termId.split("-")[1]}</span>
                <span
                  onClick={(e) => closeTerminal(termId, e)}
                  style={{
                    marginLeft: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: activeTab === termId 
                      ? "rgba(10, 10, 10, 0.2)" 
                      : "rgba(255, 255, 255, 0.1)",
                    fontSize: "12px",
                    transition: "all 0.2s ease",
                    fontWeight: "bold",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = activeTab === termId 
                      ? "rgba(10, 10, 10, 0.4)" 
                      : "rgba(255, 255, 255, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = activeTab === termId 
                      ? "rgba(10, 10, 10, 0.2)" 
                      : "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  ✕
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={terminalContainerRef}
          style={{
            flexGrow: 1,
            backgroundColor: "#0a0a0a",
            padding: "8px",
            position: "relative",
            overflow: "hidden",
            minHeight: "400px",
            width: "100%",
          }}
        />


      </div>

      {/* Status Modal */}
      {showStatusModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "800px",
              border: "1px solid #2a2a2a",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
              overflow: "hidden",
              margin: "20px",
            }}
          >
            <div
              style={{
                padding: "24px 32px",
                borderBottom: "1px solid #2a2a2a",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "linear-gradient(135deg, #1f1f1f, #2a2a2a)",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#e0e0e0",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Container Status
              </h3>
              <button
                onClick={() => setShowStatusModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "24px",
                  color: "#888",
                  padding: "8px",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2a2a2a";
                  e.currentTarget.style.color = "#e0e0e0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#888";
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: "32px" }}>
              {containerStatus && !containerStatus.error ? (
                <div>
                  <div
                    style={{
                      backgroundColor: "#0f2a1a",
                      padding: "16px 20px",
                      borderRadius: "12px",
                      marginBottom: "24px",
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #1f4a2a",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: containerStatus.status === "running" ? "#7dd653" : "#dc2626",
                        marginRight: "16px",
                        boxShadow: `0 0 8px ${containerStatus.status === "running" ? "#7dd653" : "#dc2626"}`,
                      }}
                    ></div>
                    <span style={{ fontWeight: "700", fontSize: "16px" }}>
                      {containerStatus.status === "running" ? "Running" : containerStatus.status}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                      gap: "20px",
                    }}
                  >
                    {[
                      { label: "Name", value: containerStatus.name },
                      { label: "ID", value: containerStatus.id, mono: true },
                      { label: "Image", value: containerStatus.image },
                      { label: "IP Address", value: containerStatus.ip, mono: true },
                      { label: "Memory Usage", value: containerStatus.memory },
                      { label: "CPU Usage", value: containerStatus.cpu },
                    ].map((item, index) => (
                      <div key={index}>
                        <h4
                          style={{
                            margin: "0 0 8px 0",
                            fontSize: "12px",
                            color: "#7dd653",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            fontWeight: "700",
                          }}
                        >
                          {item.label}
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "16px",
                            color: "#e0e0e0",
                            fontFamily: item.mono ? "'JetBrains Mono', monospace" : "inherit",
                            wordBreak: "break-all",
                          }}
                        >
                          {item.value}
                        </p>
                      </div>
                    ))}
                    
                    <div style={{ gridColumn: "1 / -1" }}>
                      <h4
                        style={{
                          margin: "0 0 8px 0",
                          fontSize: "12px",
                          color: "#7dd653",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          fontWeight: "700",
                        }}
                      >
                        Created
                      </h4>
                      <p style={{ margin: 0, fontSize: "16px", color: "#e0e0e0" }}>
                        {containerStatus.created
                          ? new Date(containerStatus.created).toLocaleString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 24px",
                    color: "#dc2626",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p style={{ margin: 0, fontWeight: "600", fontSize: "18px" }}>
                    {containerStatus?.error || "Error fetching container status"}
                  </p>
                </div>
              )}
            </div>

            <div
              style={{
                padding: "20px 32px",
                borderTop: "1px solid #2a2a2a",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setShowStatusModal(false)}
                style={{
                  backgroundColor: "#2a2a2a",
                  border: "1px solid #3a3a3a",
                  borderRadius: "10px",
                  padding: "12px 24px",
                  color: "#e0e0e0",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ebeef1")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f6f8fa")
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContainerAccess;