import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { RELATIONSHIP_API } from "@/server/apis";

type MakeFriendRequestRequest = {
  userID: string;
  friendID: string;
};

export const useMakeFriendRequest = () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["make-friend-request"],
    mutationFn: async (data: MakeFriendRequestRequest) => {
      await instanceCoreApi.post(RELATIONSHIP_API.MAKE_FRIEND_REQUEST, data);
    },
    onSuccess: async () => {
      await client.invalidateQueries(["get-all-not-friend-users"]);
    },
  });
};
