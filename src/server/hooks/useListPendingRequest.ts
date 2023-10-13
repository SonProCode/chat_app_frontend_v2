import { RELATIONSHIP_API } from "@/server/apis";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { useQuery } from "@tanstack/react-query";

export const useListPendingRequest = (props: { userID: string }) => {
  const { userID } = props;

  return useQuery({
    queryKey: ["list-pending-request"],
    queryFn: async () => {
      const data = await instanceCoreApi.get(
        RELATIONSHIP_API.LIST_PENDING_REQUEST,
        {
          params: {
            userID,
          },
        },
      );
      return data.data.data;
    },
  });
};
