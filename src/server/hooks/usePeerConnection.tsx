import { useSocket } from "@/provider/socketProvider";
import { SOCKET_EVENTS } from "@/utils/constant";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

export function usePeerConnection(localStream: MediaStream | null) {
  const socket = useSocket();
  const { id } = useParams();
  const [guestStream, setGuestStream] = useState<MediaStream | null>(null);

  const peerConnection = useMemo(() => {
    const connection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun2.1.google.com:19302" }],
    });

    connection.addEventListener("track", ({ streams }) => {
      setGuestStream(streams[0]);
      console.log("STREAMS", streams);
    });

    localStream?.getTracks().forEach((track) => {
      console.log("TRACK", track);
      connection.addTrack(track, localStream);
    });

    connection.addEventListener("icecandidate", ({ candidate }) => {
      socket?.emit(SOCKET_EVENTS.CLIENT.SEND_CANDIDATE, {
        candidate,
        roomName: id,
      });
      console.log("CANDIDATE", candidate);
    });
    return connection;
  }, [id, localStream, socket]);

  return {
    peerConnection,
    guestStream,
  };
}
