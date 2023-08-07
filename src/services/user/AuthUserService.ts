import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import prismaClient from "../../prisma";

interface AuthRequest {
	email: string;
	password: string;
}

class AuthUserService {
	async execute({ email, password }: AuthRequest) {
		// verify if email already exists
		const user = await prismaClient.user.findFirst({
			where: {
				email: email
			}
		});

		if (!user) {
			throw new Error("User/Password incorrect");
		}

		// verify if password is correct
		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new Error("User/Password incorrect");
		}

		// generate token JWT and return user data
		const token = sign(
			{
				name: user.name,
				email: user.email
			},
			process.env.JWT_SECRET!,
			{
				subject: user.id,
				expiresIn: "30d"
			}
		);

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			token: token
		};
	}
}

export { AuthUserService };
