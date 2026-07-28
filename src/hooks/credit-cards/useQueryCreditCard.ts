import { useQuery } from "@tanstack/react-query";
import { creditCardService } from "@/services/credit-cards";

export const useQueryCreditCard = (id: string) => {
	return useQuery({
		queryKey: ["credit-cards", id] as const,
		queryFn: () => creditCardService.getById(id),
		enabled: !!id,
	});
};
