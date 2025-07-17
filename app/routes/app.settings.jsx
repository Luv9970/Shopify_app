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
  Badge,
  SkeletonBodyText,
  SkeletonThumbnail,
  SkeletonDisplayText,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useCallback, useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { HideIcon, ViewIcon } from "@shopify/polaris-icons";

const app = useAppBridge();

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleVerify = useCallback(async () => {
    setIsLoading(true);
    // console.log("Entered API key:", apiKey);
    // console.log("App Bridge Instance", app);
    try {
      const response = await fetch(
        "https://alt-magic-api-eabaa2c8506a.herokuapp.com/shopify-verify-api-key",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: apiKey,
            store_url: app.config.shop,
          }),
        },
      );

      const result = await response.json();
      // console.log("Verification result:", result);
      // console.log(response);

      if (response.ok && result) {
        setUserData(result.user_details);
        // console.log("User_details data:", result.user_details);
        // console.log("User_details data:", userData);
        setIsLoading(false);
        setIsLoggedIn(true);
      } else {
        console.warn("Invalid API Key or Store URL");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error verifying API key:", error);
    } finally {
      setIsLoading(false);
      // console.log("At the end oh Handel Verify Function.");
    }
    // console.log("Backend result:", userData);
  }, [apiKey]);

  const handleRemoveApiKey = useCallback(() => {
    const confirm = window.confirm(
      "Are you sure you want to remove the API key?",
    );
    if (confirm) {
      setApiKey("");
      setIsLoggedIn(false);
    }
  }, []);

  function SkeletonDisplay() {
    return (
      <>
        <InlineGrid columns="2fr 8fr">
          <Layout.Section>
            <Text as="h2" variant="headingSm">
              Account
            </Text>
          </Layout.Section>
          <Layout.Section>
            <InlineStack gap="300">
              <SkeletonThumbnail size="medium" />
              <BlockStack>
                <SkeletonBodyText lines={1} />
                <SkeletonBodyText lines={1} />
              </BlockStack>
            </InlineStack>
          </Layout.Section>
        </InlineGrid>

        <InlineGrid columns="2fr 8fr">
          <Layout.Section>
            <Text as="h2" variant="headingSm">
              Credits Available
            </Text>
          </Layout.Section>
          <Layout.Section>
            <SkeletonDisplayText size="small" />
          </Layout.Section>
        </InlineGrid>
      </>
    );
  }

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
                        type={showApiKey ? "text" : "password"}
                        autoComplete="off"
                      />
                    </Box>

                    <Button
                      icon={showApiKey ? ViewIcon : HideIcon}
                      onClick={() => setShowApiKey((prev) => !prev)}
                      accessibilityLabel={
                        showApiKey ? "Hide API key" : "Show API key"
                      }
                    />

                    <Box paddingBlockStart="5">
                      <Button
                        tone="critical"
                        onClick={handleVerify}
                        loading={isLoading}
                        disabled={isLoading}
                      >
                        Verify
                      </Button>
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

          {isLoading ? (
            <BlockStack gap="200">
              <SkeletonDisplay />
            </BlockStack>
          ) : isLoggedIn ? (
            <>
              {/* Account section */}
              <BlockStack gap="200">
                <InlineGrid columns="2fr 8fr">
                  <Layout.Section>
                    <Text as="h2" variant="headingSm">
                      Account
                    </Text>
                  </Layout.Section>
                  <Layout.Section>
                    <InlineStack gap="300">
                      <Avatar customer name={userData.user_name} />
                      <BlockStack>
                        <Text>{userData.user_name}</Text>
                        <Text tone="subdued">{userData.user_id}</Text>
                      </BlockStack>
                    </InlineStack>
                  </Layout.Section>
                </InlineGrid>
              </BlockStack>

              {/* Credits */}
              <BlockStack gap="200">
                <InlineGrid columns="2fr 8fr">
                  <Layout.Section>
                    <Text as="h2" variant="headingSm">
                      Credits Available
                    </Text>
                  </Layout.Section>
                  <Layout.Section>
                    <Badge tone="success">{userData.credits_available}</Badge>
                  </Layout.Section>
                </InlineGrid>
              </BlockStack>

              {/* Remove Link */}
              <BlockStack gap="200">
                <InlineStack>
                  <Text as="p" variant="bodySm">
                    <Link tone="critical" onClick={handleRemoveApiKey}>
                      Remove API Key
                    </Link>{" "}
                    <Text as="span" tone="subdued">
                      (Removing your API key will disable all Alt Magic features
                      in your WordPress site.)
                    </Text>
                  </Text>
                </InlineStack>
              </BlockStack>
            </>
          ) : (
            /* Video Tutorial */
            <BlockStack gap="200">
              <Layout.Section>
                <Text as="h2" variant="headingSm">
                  How to get your API Key?
                </Text>
                <Text as="span" tone="subdued">
                  Watch our video tutorial to learn how to get your API key.
                </Text>
                <Box width="100%" padding="400" borderRadius="300">
                  <InlineStack align="center">
                    <Box
                      width="586px"
                      padding="200"
                      borderWidth="050"
                      borderColor="border"
                      borderRadius="300"
                    >
                      <iframe
                        width="100%"
                        height="330"
                        src="https://www.youtube.com/embed/lHqcZ2Egz4Y"
                        title="Alt Magic: How to get API Key"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ borderRadius: "8px", border: "none" }}
                      />
                    </Box>
                  </InlineStack>
                </Box>
              </Layout.Section>
            </BlockStack>
          )}
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
