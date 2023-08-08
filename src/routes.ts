import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/multer";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { AddItemController } from "./controllers/order/AddItemController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

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
router.get(
	"/category/product",
	isAuthenticated,
	new ListByCategoryController().handle
);

// Routes for Order
router.post("/order", isAuthenticated, new CreateOrderController().handle);
router.delete("/order", isAuthenticated, new RemoveOrderController().handle);
router.post("/order/add", isAuthenticated, new AddItemController().handle);
router.delete(
	"/order/remove",
	isAuthenticated,
	new RemoveItemController().handle
);
router.put("/order/send", isAuthenticated, new SendOrderController().handle);
router.get("/orders", isAuthenticated, new ListOrdersController().handle);
router.get(
	"/order/detail",
	isAuthenticated,
	new DetailOrderController().handle
);
router.put(
	"/order/checkout",
	isAuthenticated,
	new FinishOrderController().handle
);

export { router };
