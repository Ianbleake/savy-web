import { ACCOUNT_TYPE_LABELS } from "@/content/banks/bankContent";

export const getAccountTypeLabel = (type: AccountType): string => ACCOUNT_TYPE_LABELS[type] ?? type;
