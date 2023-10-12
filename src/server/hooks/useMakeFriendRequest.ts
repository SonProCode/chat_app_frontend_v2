import {useMutation} from "@tanstack/react-query";
import {instanceCoreApi} from "@/provider/setupAxios.ts";
import {RELATIONSHIP_API} from "@/server/apis";

type MakeFriendRequestRequest = {
    userId: string;
    friendId: string;
}

export const useMakeFriendRequest = () => {
    return useMutation({
        mutationKey: ["make-friend-request"],
        mutationFn: async (data: MakeFriendRequestRequest) => {
            await instanceCoreApi.post(RELATIONSHIP_API.MAKE_FRIEND_REQUEST, data);
        }
    })
}