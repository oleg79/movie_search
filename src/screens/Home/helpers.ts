import {
  FailResponse,
  SuccessResponse,
  ApiResponse
} from "./types";

export const isSuccessResponse = (response: ApiResponse): response is SuccessResponse => {
  if (response === null) {
    return false;
  }
  return (<SuccessResponse>response).Search !== undefined;
};

export const isFailResponse = (response: ApiResponse): response is FailResponse => {
  if (response === null) {
    return false;
  }
  return (<FailResponse>response).Error !== undefined;
};