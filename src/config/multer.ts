import crypto from "crypto";
import multer from "multer";
import { extname, resolve } from "path";

export default {
	upload(folder: string) {
		return {
			storage: multer.diskStorage({
				destination: resolve(__dirname, "..", "..", folder),
				filename: (req, file, cb) => {
					const fileHash = crypto.randomBytes(16).toString("hex");
					const fileName = `${fileHash}-${file.originalname}`;

					return cb(null, fileName);
				}
			})
		};
	}
};
