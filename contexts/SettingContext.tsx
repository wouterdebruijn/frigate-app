import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTag, UseQueryOptions, queryOptions, useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren, createContext, useContext } from "react";

interface SettingContextType {
  queryServerUrl: () => UseQueryOptions<string, Error, string, string[]> & {
    initialData?: undefined;
  } & {
    queryKey: DataTag<string[], string>;
  }
  saveServerUrl: (url: string) => Promise<void>;
}

const SettingContext = createContext<SettingContextType | null>(null);

export function SettingProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();

  function queryServerUrl() {
    return queryOptions({
      queryKey: ['serverUrl'],
      queryFn: async () => {
        const url = await AsyncStorage.getItem('serverUrl');
        return url || '';
      }
    });
  }

  async function saveServerUrl(url: string) {
    await AsyncStorage.setItem('serverUrl', url);
    queryClient.setQueryData(['serverUrl'], url);

    queryClient.invalidateQueries({
      queryKey: ['config']
    });
  }

  return (
    <SettingContext.Provider value={{
      queryServerUrl,
      saveServerUrl
    }}>
      {children}
    </SettingContext.Provider>
  );
}

export function useSetting() {
  const context = useContext(SettingContext);

  if (!context) {
    throw new Error("useSetting must be used within a SettingProvider");
  }
  return context;
}