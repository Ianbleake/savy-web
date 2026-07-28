import { useQuery } from "@tanstack/react-query";
import { CREDIT_CARDS_QUERY_KEY, creditCardService } from "@/services/credit-cards";

export const useQueryCreditCards = () => {
	return useQuery({
		queryKey: CREDIT_CARDS_QUERY_KEY,
		queryFn: () => creditCardService.getAll(),
	});
};
