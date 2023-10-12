import {useQuery} from "@tanstack/react-query";
import {USER_API} from "@/server/apis";
import {instanceCoreApi} from "@/provider/setupAxios.ts";

export const useGetAllUsers = ( ) => {
    return useQuery({
        queryKey: ["get-all-users"],
        queryFn: async () => {
            await instanceCoreApi.get(USER_API.GET_ALL);
        }
    })
}