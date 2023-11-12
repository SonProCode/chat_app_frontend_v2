import { Paper } from "@mantine/core";
import { useListMessage } from "@/server/hooks/useListMessage.ts";
import { Loader } from "@/components/loader";
import { MessageItem } from "@/components/messages/item.tsx";

export type Message = {
  id: string;
  body: string;
  conversationID: string;
  attachment: string;
  owner: {
    id: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
};
export const MessageList = (props: {
  userID: string | undefined;
  conversationID: string;
}) => {
  const { userID, conversationID } = props;

  const messages = useListMessage({ conversationID });

  console.log({ userID, messages });

  return (
    <Paper
      withBorder
      mih={"calc(100vh - 260px)"}
      mah={"calc(100vh - 260px)"}
      style={{ overflowY: "auto" }}
    >
      {messages.isError && <div>error</div>}
      {messages.isLoading && <Loader />}
      {messages.isSuccess &&
        userID &&
        messages.data.items.map((message: Message) => (
          <MessageItem message={message} isUser={message.owner.id === userID} />
        ))}
    </Paper>
  );
};
