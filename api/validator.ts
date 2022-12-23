import axios, { AxiosResponse } from "axios";
import { ValidateError } from "../types";

export const validator = async (
  token: string,
  body: string,
  success: (response: AxiosResponse) => void,
  invalid: (validateError: ValidateError) => void,
  error: (reason: any) => void
) => {
  console.log(`validator token=${token},body=${JSON.stringify(body)}`);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await axios
    .post("https://api.line.me/v2/bot/message/validate/reply", body, {
      headers: headers,
    })
    .then((response) => {
      success(response);
    })
    .catch((reason) => {
      console.log(reason);
      if (!!reason && !!reason.response && !!reason.response.data) {
        const validateError: ValidateError = reason.response.data;
        invalid(validateError);
      } else {
        error(reason);
      }
    });
};
