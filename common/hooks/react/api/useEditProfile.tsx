import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import { type EditProfilePayload, type EditProfileResponse } from "~/types/api/IEditProfile";

export function useEditProfile(): UseMutationResult<EditProfileResponse, Error, EditProfilePayload, unknown> {
    return useMutation({
        mutationKey: ["UpdateUserProfileJson"],
        mutationFn: async (editProfileDetails) => {
            return await new Promise((resolve) => {
                CallApi({
                    url: `${MS_URL.USER}api/User/UserRegistrationAPI`,
                    type: "POST",
                    data: JSON.stringify(editProfileDetails),
                    MicroserviceName: "SaaS_Users_Microservice",
                    OnError: (msg) => {
                        resolve(msg);
                    },
                    OnSuccess: (res) => {
                        resolve(res);
                    }
                });
            });
        }
    });
}
