import DatauriParser from "datauri/parser.js";
import path from "path";

const parser = new DatauriParser();

const getDataUri = (file) => {
  const exitName = path.extname(file.originalname).toString();
  return parser.format(exitName, file.buffer).content;
};

export default getDataUri
