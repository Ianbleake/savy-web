import { useQuery } from "@tanstack/react-query";
import { profileService } from "@/services/profile";

const ONBOARDING_VALIDATION_QUERY_KEY = ["onboarding-validation"] as const;

export const useValidateOnboarding = () => {
	return useQuery({
		queryKey: ONBOARDING_VALIDATION_QUERY_KEY,
		queryFn: () => profileService.validateOnboarding(),
	});
};
