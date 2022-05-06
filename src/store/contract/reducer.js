import {types} from "./actions"

const initialState = {}

export default (appState = initialState, {type, payload}) => {
  console.log("here is reducer", {...payload});
  switch(type) {
    case types.CONTRACT_DEPLOYED:
      return {...payload};
    default: 
      return appState;
  }
}