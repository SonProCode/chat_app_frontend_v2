import {
  Button,
  Group,
  Navbar,
  NavbarProps,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { ShellFooter } from "./footer";
import {
  IconAddressBook,
  IconMessage,
  IconSettings,
  IconUserPlus,
} from "@tabler/icons-react";
import { TabStyles } from "@/components/shell/styles.tsx";
import { MessageList } from "@/components/messages/list.tsx";
import { useState } from "react";
import { ContactList } from "@/components/contacts/list.tsx";
import { useGetMe } from "@/server/hooks/useGetMe.ts";
import { Loader } from "@/components/loader";

interface Props {
  hidden: Required<NavbarProps>["hidden"];
}

export const ShellNav = (props: Props): JSX.Element => {
  const { hidden } = props;
  const [activeTab, setActiveTab] = useState<string | null>("inbox");
  const self = useGetMe();

  console.log({ self });

  return (
    <Navbar width={{ sm: 300 }} hidden={hidden} hiddenBreakpoint="sm" p="lg">
      <Navbar.Section>
        <Group position="apart">
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
            <IconSettings />
          </Button>
          <Title order={3}>Chat</Title>
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
            <IconUserPlus />
          </Button>
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <Stack py="xs">
          <TextInput placeholder="Search" />
          <Tabs
            value={activeTab}
            onTabChange={setActiveTab}
            unstyled
            styles={TabStyles}
          >
            <Tabs.List>
              <Tabs.Tab value="inbox">
                <Group>
                  <IconMessage />
                  <Text>Inbox</Text>
                </Group>
              </Tabs.Tab>
              <Tabs.Tab value="contacts">
                <Group>
                  <IconAddressBook />
                  <Text>Contacts</Text>
                </Group>
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Stack>
      </Navbar.Section>
      <Navbar.Section grow>
        {self.isError && <div>Error</div>}
        {self.isLoading && <Loader />}
        {self.isSuccess && (
          <Stack>
            {activeTab === "inbox" && <MessageList />}
            {activeTab === "contacts" && (
              <ContactList userID={self.data.userId} />
            )}
          </Stack>
        )}
      </Navbar.Section>
      <Navbar.Section>
        <ShellFooter />
      </Navbar.Section>
    </Navbar>
  );
};
