import multer from "multer";

const storage = multer.memoryStorage();

//single upload
export const singleUpload = multer({ storage: storage }).single("file");

//multiple upload
export const multipleUpload = multer({ storage: storage }).array("files");
