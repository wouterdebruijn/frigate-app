import { queryOptions } from "@tanstack/react-query";

interface ConfigQueryOptions {
  serverUrl: string;
}

interface Camera {
  name: string;
}

export function configQuery({ serverUrl }: ConfigQueryOptions) {
  return queryOptions({
    queryKey: ['config', serverUrl],
    queryFn: async () => {
      const response = await fetch(`${serverUrl}api/config`);

      const data = await response.json();
      const cameras = Object.keys(data.cameras).map((key) => {
        return {
          name: key
        }
      });

      return cameras as Camera[];
    },
    retry: false,
  })
}