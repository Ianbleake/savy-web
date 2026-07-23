import { z } from "zod";

export const withNone = <T extends z.ZodTypeAny>(schema: T) =>
	z.union([z.literal("__none__"), schema]);