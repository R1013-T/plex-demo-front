// snake_case / camelCaseを変換する
import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

// ヘッダーはケバブケースのまま
const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  }),
  options
);

export default client;
