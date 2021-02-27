import axios from "../../services/httpService";
import * as actions from "../api";
import { messageClear } from "../message";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const {
    url,
    method,
    data,
    onStart,
    token,
    onSuccess,
    onError,
    onSuccessMessage,
    onSuccessAdmin,
    onErrorMessage,
  } = action.payload;

  if (onStart) dispatch({ type: onStart });

  dispatch(messageClear());
  next(action);

  const baseURL = process.env.REACT_APP_API_URL;
  try {
    if (token) axios.setJwt(token);
    const response = await axios.request({
      baseURL,
      url,
      method,
      data,
    });
    console.log(response);
    dispatch(actions.apiCallSuccess(response.data));
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    if (onSuccessAdmin)
      dispatch({ type: onSuccessAdmin, payload: response.data });
    if (onSuccessMessage)
      dispatch({ type: onSuccessMessage, payload: response.data });
  } catch (error) {
    if (error.response) {
      dispatch(actions.apiCallFailed(error.response.data));
      if (onError) dispatch({ type: onError, payload: error.response.data });
      if (onErrorMessage)
        dispatch({ type: onErrorMessage, payload: error.response.data });
    } else {
      if (onErrorMessage)
        dispatch({
          type: onErrorMessage,
          payload: {
            message: "Błąd połączenia z serwisem autoryzacyjnym",
            messageType: "error",
          },
        });
      if (onError) dispatch({ type: onError, payload: null });
    }
  }
};

export default api;
