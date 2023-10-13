import {
  Avatar,
  Badge,
  Box,
  Group,
  Paper,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { Loader } from "@/components/loader";
import { useListPendingRequest } from "@/server/hooks/useListPendingRequest.ts";

type Request = {
  id: string;
  status: string;
  userID: string;
  name: string;
  email: string;
  avatar: string;
};
export const PendingRequestsList = (props: { userID: string }) => {
  const { userID } = props;

  const list = useListPendingRequest({ userID });

  return (
    <Stack>
      {list.isError && <div>Error</div>}
      {list.isLoading && <Loader />}
      {list.isSuccess && (
        <Paper p={0} withBorder sx={{ overflow: "auto" }}>
          <Table>
            <Box
              component="thead"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
              })}
            >
              <tr>
                <th style={{ whiteSpace: "nowrap" }}>User</th>
                <th style={{ whiteSpace: "nowrap" }}>Status</th>
              </tr>
            </Box>
            <tbody>
              {list.data.items.length === 0 && (
                <tr>
                  <td colSpan={2}>
                    <Text align="center">No requests sent</Text>
                  </td>
                </tr>
              )}
              {list.data.items.map((request: Request) => (
                <tr key={request.id}>
                  <td>
                    <Group noWrap>
                      <Avatar src={request.avatar} />
                      <div>
                        <Text size="sm">{request.name}</Text>
                        <Text size="xs" opacity={0.65}>
                          {request.email}
                        </Text>
                      </div>
                    </Group>
                  </td>
                  <td>
                    <Badge color="orange">{request.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
      )}
    </Stack>
  );
};
