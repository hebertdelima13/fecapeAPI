import multer from "multer";
import path from "path";

const Multer = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb: any) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
      cb(new Error("Invalid file extension!"), false);
      return;
    }
    cb(null, true);
  },
});

export { Multer };
