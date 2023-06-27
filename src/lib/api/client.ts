// snake_case / camelCaseを変換する
import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

// ヘッダーはケバブケースのまま
const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: "http://localhost:3001/api/v1",
  }),
  options
);

export default client;
