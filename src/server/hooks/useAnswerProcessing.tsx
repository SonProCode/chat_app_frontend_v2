import { useCallback } from "react";

export function useAnswerProcessing(peerConnection: RTCPeerConnection) {
  const handleOfferAnswer = useCallback(
    ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      // neu ko chahy duoc thi cop ben usePeerConnection vao
      //console.log("ANSWER", answer);
      peerConnection.setRemoteDescription(answer);
    },
    [peerConnection],
  );

  return {
    handleOfferAnswer,
  };
}
