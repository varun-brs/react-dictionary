import axios from "axios";

const BaseURL = process.env.REACT_APP_API_ENDPOINT;

export const HttpGet = async (aParams) => {
  const oURL = BaseURL + aParams;
  let oResponse = await axios.get(oURL);
  return oResponse?.data;
};
