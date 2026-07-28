import { useQuery } from "@tanstack/react-query";
import { CARD_STATEMENTS_QUERY_KEY, cardStatementService } from "@/services/card-statements";

export const useQueryCardStatements = (creditCardId?: string) => {
	return useQuery({
		queryKey: [...CARD_STATEMENTS_QUERY_KEY, { creditCardId: creditCardId ?? "all" }] as const,
		queryFn: () => cardStatementService.getAll(creditCardId),
	});
};
