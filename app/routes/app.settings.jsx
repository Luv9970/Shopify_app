import {
  Box,
  Page,
  Card,
  InlineGrid,
  Text,
  Button,
  Layout,
  Avatar,
  TextField,
  Link,
  InlineStack,
  BlockStack,
  Badge
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useCallback, useState } from "react";

export default function SettingsPage() {

  const [apiKey, setApiKey] = useState("");

  const handleVerify = useCallback(() => {
      console.log("API Key verified");
  }, [apiKey]);
  return (
    <Page>
      <TitleBar title="Settings page" />
      <Card>
        <BlockStack gap="400">
          <BlockStack gap="200">
            <InlineGrid columns="2fr 8fr">
              <Layout.Section>
                <Text as="h2" variant="headingSm">
                  API Key
                </Text>
              </Layout.Section>
              <BlockStack gap="300">
                  <BlockStack>
                    <InlineStack blockAlign="center" gap="300">
                      <Box width="300px">
                        <TextField
                          value={apiKey}
                          onChange={setApiKey}
                          type="password"
                          autoComplete="off"
                        />
                      </Box>
                      <Box paddingBlockStart="5">
                        <Button tone="critical" onClick={handleVerify}>Verify</Button>
                      </Box>
                    </InlineStack>
                  </BlockStack>
                  <BlockStack>
                    <Text as="p" variant="bodySm" tone="subdued">
                      Note: Please enter your API key to continue. You can
                      generate
                      <br /> your API key from{" "}
                      <Link url="https://example.com" external>
                        Alt Magic WordPress Page
                      </Link>
                    </Text>
                  </BlockStack>
              </BlockStack>
            </InlineGrid>
          </BlockStack>

          <BlockStack gap="200">
            <InlineGrid columns="2fr 8fr">
              <Layout.Section>
                <Text as="h2" variant="headingSm">
              Account
            </Text>
              </Layout.Section>
              <Layout.Section>
                <InlineStack gap="300">
              <Avatar customer name="Advait Vaidya" />
              <BlockStack>
                <Text>Advait Vaidya</Text>
                <Text tone="subdued">advait.postit@gmail.com</Text>
              </BlockStack>

              </InlineStack>
              </Layout.Section>
            </InlineGrid>
          </BlockStack>

          <BlockStack gap="200">
            <InlineGrid columns="2fr 8fr">
              <Layout.Section>
                <Text as="h2" variant="headingSm">
                  Credits Available
                </Text>
              </Layout.Section>
              <Layout.Section>
                <Badge tone="success">9997</Badge>
              </Layout.Section>
            </InlineGrid>
          </BlockStack>

          <BlockStack gap="200">
            <InlineStack >
                    <Text as="p" variant="bodySm">
                <Link url="https://example.com" tone="critical">
                  Remove API Key
                </Link>{" "}
                <Text as="span" tone="subdued">
                  (Removing your API key will disable all Alt Magic features in your WordPress site.)
                </Text>
              </Text>
          </InlineStack>
          </BlockStack>
          
        </BlockStack>
      </Card>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
