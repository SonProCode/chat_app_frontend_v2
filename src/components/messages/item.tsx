import { Message } from "@/components/messages/list.tsx";
import { Avatar, Group, Paper, Stack } from "@mantine/core";

export const MessageItem = (props: { message: Message; isUser: boolean }) => {
  const { message, isUser } = props;
  return (
    <Stack p="xs" align={isUser ? "flex-end" : "flex-start"}>
      <Group>
        {!isUser && (
          <Avatar
            src={message.owner.avatar}
            alt={message.owner.username}
            radius="xl"
            size="lg"
          />
        )}
        <Paper
          radius="xl"
          p="xs"
          sx={(theme) => ({
            width: "fit-content",
            maxWidth: "400px",
            backgroundColor: isUser
              ? theme.colors.blue[5]
              : theme.colors.gray[0],
            color: isUser ? "#FFF" : theme.colors.gray[8],
          })}
          withBorder
        >
          {message.body}
        </Paper>
      </Group>
    </Stack>
  );
};
