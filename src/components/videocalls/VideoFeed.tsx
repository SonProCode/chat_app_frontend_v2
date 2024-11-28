import { FunctionComponent } from "react";

interface Props {
  mediaStream: MediaStream | null;
  isMuted?: boolean;
}

export const VideoFeed: FunctionComponent<Props> = ({
  mediaStream,
  isMuted = false,
}) => {
  return (
    <video
      ref={(ref) => {
        if (ref) {
          ref.srcObject = mediaStream;
        }
      }}
      style={{
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        objectFit: "cover",
      }}
      autoPlay={true}
      muted={isMuted}
    />
  );
};
