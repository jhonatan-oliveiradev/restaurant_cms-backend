import { Request, Response, Router } from "express";

import { AuthUserController } from "./controllers/User/AuthUserController";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { DetailUserController } from "./controllers/User/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";

const router = Router();

// Routes for User
router.post("/session", new AuthUserController().handle);
router.post("/users", new CreateUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

// Routes for Category
router.post(
	"/category",
	isAuthenticated,
	new CreateCategoryController().handle
);

export { router };
