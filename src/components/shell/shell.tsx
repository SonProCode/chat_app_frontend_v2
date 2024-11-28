import { AppShell } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { ReactNode, useEffect, useState } from "react";
import { ShellHeader } from "./header";
import { ShellNav } from "./nav";
import { appShellStyles } from "@/components/shell/shell-style.ts";
import { IncomingVideoCall } from "../videocalls/IncomingVideoCall";
import { useSocket } from "@/provider/socketProvider";
import { SOCKET_EVENTS } from "@/utils/constant";
import { useRef } from "react";

interface Props {
  children: ReactNode;
}

export const Shell = (props: Props): JSX.Element => {
  const { children } = props;
  const [nav, toggleNav] = useToggle();
  const socket = useSocket();
  const [isCalling, setIsCalling] = useState(false);
  const [callerName, setCallerName] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");

  useEffect(() => {
    if (socket) {
      socket.on(SOCKET_EVENTS.SERVER.FIRST_PERSON_JOIN, (data) => {
        setIsCalling(true);
        setCallerName(data.callerName);
        setRoomName(data.roomName);
        console.log("Cuoc goi da OK");
      });
      return () => {
        socket.off(SOCKET_EVENTS.SERVER.FIRST_PERSON_JOIN);
      };
    }
  }, [socket]);
  const onAnswer = () => {
    setIsCalling(false);
    window.open(
      "/videocalls/" + roomName + "?type=2",
      "_blank",
      "width=800,height=600,noopener,noreferrer",
    );
  };

  const onDecline = () => {
    if (socket) {
      socket.emit(SOCKET_EVENTS.CLIENT.DECLINE, {
        roomName,
        userName: callerName,
      });
    }
    setIsCalling(false);
  };

  return (
    <AppShell
      styles={appShellStyles}
      header={<ShellHeader nav={nav} toggleNav={toggleNav} />}
      navbar={<ShellNav hidden={!nav} />}
      navbarOffsetBreakpoint="sm"
    >
      {isCalling && (
        <IncomingVideoCall
          callerName={callerName}
          onAnswer={onAnswer}
          onDecline={onDecline}
        />
      )}
      {children}
    </AppShell>
  );
};
