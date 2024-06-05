import { useCallback, useEffect, useState } from "react";
import { Button } from "../button/Button";
import { ConnectionState } from "livekit-client";

const SystemMessage = ({
  identity,
  accentColor,
  connectionState,
  onUpdate,
}: {
  identity: string;
  accentColor: string;
  connectionState: ConnectionState;
  onUpdate: () => void;
}) => {
  const [systemMessage, setSystemMessage] = useState("");

  // identity
  useEffect(() => {
    if (!identity) return;
    fetch("/api/get_system_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identity,
      }),
    })
      .then((d) => d.json())
      .then(({ system_message }) => setSystemMessage(system_message));
  }, [identity]);

  const updateSystemMessage = useCallback(() => {
    if (!systemMessage) return;

    return fetch("/api/update_system_message", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identity,
        systemMessage,
      }),
    });
  }, [systemMessage, identity]);

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <label>System Message</label>
      </div>
      <input
        className="text-white text-sm bg-transparent border border-gray-800 rounded-sm px-3 py-2 disabled:cursor-not-allowed"
        onChange={(e) => setSystemMessage(e.target.value)}
        value={systemMessage}
      ></input>
      <Button
        accentColor={accentColor}
        disabled={connectionState !== ConnectionState.Connected}
        onClick={() => {
          updateSystemMessage()?.then(onUpdate);
        }}
      >
        Update System Message
      </Button>
    </div>
  );
};

export default SystemMessage;
