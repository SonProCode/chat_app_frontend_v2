import { useQuery } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { RELATIONSHIP_API } from "@/server/apis";

type Filter = {
  page?: number;
  pagesize?: number;
  sort?: string;
  sortBy?: string;
};

export const useListFriends = (filter: Filter) => {
  return useQuery({
    queryKey: ["list-friends"],
    queryFn: async () => {
      await instanceCoreApi.post(RELATIONSHIP_API.LIST_FRIEND, filter);
    },
  });
};
