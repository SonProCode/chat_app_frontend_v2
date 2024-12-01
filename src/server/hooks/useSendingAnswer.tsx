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

        // Thiết lập remote description
        await peerConnection.setRemoteDescription(offer);

        // Kiểm tra trạng thái sau khi thiết lập remoteDescription
        if (peerConnection.signalingState === "have-remote-offer") {
          const answer = await peerConnection.createAnswer();
          console.log("ANSWER IN useSendingAnswer", answer);

          // Thiết lập local description với answer
          await peerConnection.setLocalDescription(answer);

          // Gửi answer cho server
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
