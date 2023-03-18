import { Request } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

// Define the function that generates the dynamic destination path
function getDynamicDestination(req: any, file: any) {
  const { _id } = req.user;
  return `public/images/${_id}/`;
}

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    // Check if the uploads directory exists
    if (!fs.existsSync(getDynamicDestination(req, file))) {
      // Create the uploads directory if it doesn't exist
      fs.mkdirSync(getDynamicDestination(req, file));
    }

    // Call the callback function with the destination path
    cb(null, getDynamicDestination(req, file));
  },
  filename(req: any, file: any, cb: any) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const Upload = multer({
  storage,
  limits: { fileSize: 4000000 },
  fileFilter(req: Request, file: any, cb: any) {
    checkFileType(file, cb);
  },
}).single("image");
// Check File Type
function checkFileType(file: any, cb: any) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Formt image not valid!");
  }
}
export default Upload;
