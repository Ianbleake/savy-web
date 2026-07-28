import { useQuery } from "@tanstack/react-query";
import { accountService } from "@/services/accounts";

export const useQueryAccount = (id: string) => {
	return useQuery({
		queryKey: ["accounts", id] as const,
		queryFn: () => accountService.getById(id),
		enabled: !!id,
	});
};
