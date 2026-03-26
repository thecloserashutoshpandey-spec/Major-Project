import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:5000");

function EditorPage() {
  const { roomId } = useParams();
  const [code, setCode] = useState("// Start coding...");

  useEffect(() => {
    // 🔥 join room when page loads
    socket.emit("join-room", roomId);

    // 🔥 receive updates
    socket.on("code-update", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.off("code-update");
    };
  }, [roomId]);

  // 🔥 send code when typing
  const handleChange = (value) => {
    setCode(value);

    socket.emit("code-change", {
      roomId: roomId,
      code: value,
    });
  };

  return (
    <div style={{ height: "100vh", marginTop: "70px" }}>
      {/* 👆 IMPORTANT FIX */}

      <h2 style={{ textAlign: "center" }}>
        Room: {roomId}
      </h2>

      <Editor
        height="90vh"
        language="javascript"
        value={code}
        onChange={handleChange}
        theme="vs-dark"
      />
    </div>
  );
}

export default EditorPage;