import { useCallback } from "react";

export function useAnswerProcessing(peerConnection: RTCPeerConnection) {
  const handleOfferAnswer = useCallback(
    ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      console.log("ANSWER", answer);
      peerConnection.setRemoteDescription(answer);
    },
    [peerConnection],
  );

  return {
    handleOfferAnswer,
  };
}
