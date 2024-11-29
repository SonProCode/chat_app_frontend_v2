import { useSocket } from "@/provider/socketProvider";
import { SOCKET_EVENTS } from "@/utils/constant";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

export function useSendingAnswer(peerConnection: RTCPeerConnection) {
  const { id } = useParams();
  const socket = useSocket();

  const handleConnectionOffer = useCallback(
    async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
      try {
        if (peerConnection.signalingState !== "stable") {
          console.warn(
            "PeerConnection is not in a stable state:",
            peerConnection.signalingState,
          );
          return;
        }

        await peerConnection.setRemoteDescription(offer);

        if (peerConnection.signalingState === "have-remote-offer") {
          const answer = await peerConnection.createAnswer();
          console.log("ANSWER IN useSendingAnswer", answer);

          await peerConnection.setLocalDescription(answer);

          socket?.emit(SOCKET_EVENTS.CLIENT.ANSWER, { answer, roomName: id });
        } else {
          console.warn(
            "Unexpected signaling state after setRemoteDescription:",
            peerConnection.signalingState,
          );
        }
      } catch (error) {
        console.error("Error in handling connection offer:", error);
      }
    },
    [id, peerConnection, socket],
  );

  return {
    handleConnectionOffer,
  };
}
