import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/services/profile";
import { useProfileStorage } from "@/storage/profile/profileStorage";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";
import { PROFILE_QUERY_KEY } from "./useQueryProfile";

export const useUpdateProfile = () => {
	const queryClient = useQueryClient();
	const setProfile = useProfileStorage((state) => state.setProfile);

	return useMutation({
		mutationFn: (payload: UpdateProfilePayload) => profileService.updateProfile(payload),
		onSuccess: (updatedProfile: Profile) => {
			setProfile(updatedProfile);
			queryClient.setQueryData(PROFILE_QUERY_KEY, updatedProfile);
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar el perfil");
		},
	});
};
