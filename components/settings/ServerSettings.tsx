import ThemedTextInput from "@/components/form/ThemedTextInput";
import { useSetting } from "@/contexts/SettingContext";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Keyboard } from "react-native";
import ThemedButton from "../ThemedButton";

/**
 * Component for editing the Frigate Server URL setting. Provides a text input for the URL and a save button.
 * @returns ServerSettings component
 */
export default function ServerSettings() {
  const { queryServerUrl, saveServerUrl } = useSetting();
  const { data: savedServerUrl, isPending } = useSuspenseQuery({ ...queryServerUrl() });
  const [serverUrl, setServerUrl] = useState(savedServerUrl);

  const hasChanged = savedServerUrl !== serverUrl;

  const anyLoading = isPending;

  /**
   * Validate the given url by creating a URL object and checking the protocol.
   * Valid URLs are saved to the SettingContext.
   * @param url The Frigate Server URL to validate and save
   */
  async function validateAndSave(url: string) {
    const parsed = new URL(url);

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      throw new Error('Invalid URL');
    }

    await saveServerUrl(parsed.href);
    await setServerUrl(parsed.href);
  }

  async function submitButton() {
    try {

      await validateAndSave(serverUrl);

    } catch (error) {
      await validateAndSave(`http://${serverUrl}`);
    } finally {
      Keyboard.dismiss();
    }
  }

  return (
    <>
      <ThemedTextInput value={serverUrl} onChangeText={setServerUrl} label="Server URL:" loading={anyLoading} autoComplete="url" />
      <ThemedButton title="Save" onPress={() => { submitButton() }} disabled={!hasChanged} />
    </>
  )

}