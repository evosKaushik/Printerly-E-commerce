import multer from "multer";

const storage = multer.memoryStorage();

//single upload
export const singleUpload = multer({ storage: storage }).single("file");

//multiple upload
export const multipleUpload = multer({ storage: storage }).array("files");


//Multiple Product upload
export const productUpload = multer({ storage: storage }).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "gallery", maxCount: 10 },
]);
