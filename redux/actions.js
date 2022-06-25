import { ADD_CITY } from "./actionTypes";

export const addCity = (city,weather) => ({
  type: ADD_CITY,
  payload: {
    city: city,
    weather: weather
  }
});

