import { ConversationItem } from "@/components/conversations/item.tsx";
import { Avatar, Box, Button, Card, Group, Stack, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export const MessageHeader = (props: {
  conversationDetail: ConversationItem;
  toggleSidebar: boolean;
  setToggleSidebar: (toggleSidebar: boolean) => void;
  userID: string;
}) => {
  const { conversationDetail, toggleSidebar, setToggleSidebar, userID } = props;

  const friend = conversationDetail.participants.find(
    (participant) => participant.user.id !== userID,
  )?.user;

  if (!friend) return null;

  return (
    <Card p={0}>
      <Box
        sx={(theme) => ({
          padding: theme.spacing.md,
        })}
      >
        <Group position="apart">
          <Group>
            <Avatar
              size="lg"
              radius="xl"
              src={friend.avatar}
              alt={friend.username}
            />
            <Stack>
              <Text fw={600}>{friend.username}</Text>
            </Stack>
          </Group>
          <Button
            p={0}
            styles={{
              root: {
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
            }}
            variant="subtle"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            <IconInfoCircle />
          </Button>
        </Group>
      </Box>
    </Card>
  );
};
