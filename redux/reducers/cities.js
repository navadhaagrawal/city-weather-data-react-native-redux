import { ADD_CITY } from "../actionTypes";

const initialState = {
  city_list: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CITY: {
      const { city, weather } = action.payload
      return {
        ...state,
        city_list: [ ...state.city_list, { city, weather }]
      };
    }
    default:
      return state;
  }
}
