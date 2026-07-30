type BankCardProps = {
	account: import("@/services/accounts/accounts").Account;
	bankName: string;
	bankColor: string | null;
	creditCard?: import("@/services/credit-cards/credit-cards").CreditCard;
	onClick?: () => void;
	className?: string;
};