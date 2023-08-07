import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
	sub: string;
}

export function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// receive the token
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).end();
	}

	const [, token] = authToken.split(" ");

	try {
		// validate if token is valid
		const { sub } = verify(token, process.env.JWT_SECRET!) as Payload;

		req.user_id = sub;

		return next();
	} catch (err) {
		return res.status(401).end();
	}
}
