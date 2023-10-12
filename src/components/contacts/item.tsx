import { Avatar, Card, Group, Stack, Text } from "@mantine/core";

export type Friend = {
  avatar: string;
  name: string;
  id: string;
  email: string;
};
export const ContactItem = (props: { friend: Friend }) => {
  const { friend } = props;
  console.log({ friend });
  return (
    <Card padding="md" radius="md">
      <Group>
        <Avatar src={friend.avatar} alt={friend.name} />
        <Stack>
          <Text>{friend.name} bruh</Text>
          <Text>{friend.email}</Text>
        </Stack>
      </Group>
    </Card>
  );
};
