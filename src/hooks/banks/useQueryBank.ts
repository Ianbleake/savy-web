import { useQuery } from "@tanstack/react-query";
import { bankService } from "@/services/banks";

export const useQueryBank = (id: string) => {
	return useQuery({
		queryKey: ["banks", id] as const,
		queryFn: () => bankService.getById(id),
		enabled: !!id,
	});
};
