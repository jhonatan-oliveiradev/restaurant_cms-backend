import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

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

		return { ok: true };
	}
}

export { AuthUserService };
