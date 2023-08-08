import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/multer";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

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
router.get("/category", isAuthenticated, new ListCategoryController().handle);

// Routes for Products
router.post(
	"/product",
	isAuthenticated,
	upload.single("file"),
	new CreateProductController().handle
);

export { router };
