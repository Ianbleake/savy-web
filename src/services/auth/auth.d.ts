type AuthUser = {
	id: string;
	email: string;
};

type AuthResponse = {
	accessToken: string;
	refreshToken: string;
	user: AuthUser;
};

type LoginPayload = {
	email: string;
	password: string;
};

type RegisterPayload = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

type ForgotPasswordPayload = {
	email: string;
};

type ResetPasswordPayload = {
	accessToken: string;
	refreshToken: string;
	newPassword: string;
};

