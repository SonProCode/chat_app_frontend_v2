import {useMutation} from "@tanstack/react-query";
import {instanceCoreApi} from "@/service/setupAxios.ts";

type SignInRequest = {
    email: string;
    password: string;
}
export const useSignIn = () => {
    return useMutation({
        mutationFn: async (props: SignInRequest) => {
            await instanceCoreApi.post("/auth/login", props);
        }
    })
}