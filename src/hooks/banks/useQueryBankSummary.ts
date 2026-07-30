import { useQuery } from "@tanstack/react-query";
import { bankService } from "@/services/banks";

export const useQueryBankSummary = (id: string, period: PeriodType) => {
	return useQuery({
		queryKey: ["banks", id, "summary", period] as const,
		queryFn: () => bankService.getSummary(id, period),
		enabled: !!id,
	});
};
