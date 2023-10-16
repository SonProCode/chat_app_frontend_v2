import { Avatar, Box, Button, Card, Group, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconDots } from "@tabler/icons-react";

export type ConversationItem = {
  id: string;
  name: string;
  type: string;
  creatorID: string;
  image: string;
  participants: {
    user: {
      id: string;
      username: string;
      avatar: string;
    };
  }[];
};

export const ConversationItem = (props: { conversation: ConversationItem }) => {
  const { conversation } = props;

  const friend = conversation.participants.find(
    (participant) => participant.user.id !== conversation.creatorID,
  )?.user;

  if (!friend) return null;

  return (
    <Card p={0} component={Link} to={`/messages/${conversation.id}`}>
      <Box
        sx={(theme) => ({
          padding: theme.spacing.md,
          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
            margin: 0,
          },
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
          >
            <IconDots />
          </Button>
        </Group>
      </Box>
    </Card>
  );
};
