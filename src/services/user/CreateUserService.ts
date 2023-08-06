import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface UserRequest {
	name: string;
	email: string;
	password: string;
}

class CreateUserService {
	async execute({ name, email, password }: UserRequest) {
		// verify if email has sent
		if (!email) {
			throw new Error("Email incorrect");
		}

		// verify if email is signed up already
		const userAlreadyExists = await prismaClient.user.findFirst({
			where: {
				email: email
			}
		});

		if (userAlreadyExists) {
			throw new Error("User already exists");
		}

		const passwordHash = await hash(password, 8);

		const user = await prismaClient.user.create({
			data: {
				name,
				email,
				password: passwordHash
			},
			select: {
				id: true,
				name: true,
				email: true
			}
		});

		return user;
	}
}

export { CreateUserService };
