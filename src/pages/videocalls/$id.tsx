import { useParams } from "react-router-dom";
import { JSX, useEffect } from "react";
import {
  ActionIcon,
  Avatar,
  Grid,
  Group,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import {
  IconMicrophone,
  IconPhone,
  IconScreenShare,
  IconUserPlus,
  IconVideo,
} from "@tabler/icons-react";
import { useSocket } from "@/provider/socketProvider";
import { SOCKET_EVENTS } from "@/utils/constant";
import { useChatConnection } from "@/server/hooks/useChatConnection";
import { usePeerConnection } from "@/server/hooks/usePeerConnection";
import { useLocalCameraStream } from "@/server/hooks/useLocalCameraStream";
import { VideoFeed } from "@/components/videocalls/VideoFeed";
import { useGetMe } from "@/server/hooks/useGetMe";

export default function VideoCallPage(): JSX.Element {
  const { id } = useParams();
  const socket = useSocket();
  const self = useGetMe();

  useEffect(() => {
    if (id && self?.data?.username)
      socket?.emit(SOCKET_EVENTS.CLIENT.JOIN_ROOM, {
        roomName: id,
        userName: self.data.username,
      });
  }, [id, self?.data?.username, socket]);
  const { localStream } = useLocalCameraStream();
  const { peerConnection, guestStream } = usePeerConnection(localStream);
  console.log("GuestStream", guestStream);
  useChatConnection(peerConnection);
  if (!id) {
    return <>No id</>;
  }
  const hangup = () => {
    if (socket) {
      socket.emit(SOCKET_EVENTS.CLIENT.HANGUP, {
        roomName: id,
        userName: self.data.username,
      });
    }
    window.close();
  };

  return (
    <Paper
      p={0}
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Header */}
      <Group position="apart" p="md">
        <Group>
          <Title order={4} color="white">
            Thắng, Khánh
          </Title>
        </Group>
        <ActionIcon variant="subtle" color="gray">
          <IconPhone size={18} />
        </ActionIcon>
      </Group>

      {/* Main Content - Video/Avatar */}
      <Grid style={{ height: "calc(100vh - 160px)" }}>
        <Grid.Col span={6}>
          <Stack align="center" justify="center" style={{ height: "100%" }}>
            {localStream ? (
              <VideoFeed mediaStream={localStream} isMuted={true} />
            ) : (
              <Avatar
                size={120}
                radius="50%"
                src="/placeholder.svg?height=120&width=120"
              />
            )}
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack align="center" justify="center" style={{ height: "100%" }}>
            {guestStream ? (
              <VideoFeed mediaStream={guestStream} isMuted={true} />
            ) : (
              <Avatar
                size={120}
                radius="50%"
                src="/placeholder.svg?height=120&width=120"
              />
            )}
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Control Bar */}
      <Group
        position="center"
        spacing="xl"
        style={{ position: "absolute", bottom: 40, left: 0, right: 0 }}
      >
        <ActionIcon size="xl" radius="xl" variant="filled" color="dark.4">
          <IconScreenShare size={24} />
        </ActionIcon>
        <ActionIcon size="xl" radius="xl" variant="filled" color="dark.4">
          <IconUserPlus size={24} />
        </ActionIcon>
        <ActionIcon size="xl" radius="xl" variant="filled" color="dark.4">
          <IconVideo size={24} />
        </ActionIcon>
        <ActionIcon size="xl" radius="xl" variant="filled" color="dark.4">
          <IconMicrophone size={24} />
        </ActionIcon>
        <ActionIcon
          size="xl"
          radius="xl"
          variant="filled"
          color="red"
          onClick={hangup}
        >
          <IconPhone size={24} />
        </ActionIcon>
      </Group>
    </Paper>
  );
}
