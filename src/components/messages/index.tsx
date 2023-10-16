import { Group, Stack } from "@mantine/core";
import { MessageHeader } from "@/components/messages/header.tsx";
import { Loader } from "@/components/loader";
import { useState } from "react";
import { useGetMe } from "@/server/hooks/useGetMe.ts";
import { useGetConversation } from "@/server/hooks/useGetConversation.ts";

export const Message = (props: { conversationID: string }) => {
  const { conversationID } = props;
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const self = useGetMe();

  const conversation = useGetConversation({ id: conversationID });

  console.log(conversation);

  return (
    <Stack m={0} p={0}>
      {conversation.isError && <div>error</div>}
      {conversation.isLoading && <Loader />}
      {conversation.isSuccess && self.isSuccess && (
        <Group m={0} p={0} grow>
          <MessageHeader
            conversationDetail={conversation.data}
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar}
            userID={self.data.userId}
          />
        </Group>
      )}
    </Stack>
  );
};
