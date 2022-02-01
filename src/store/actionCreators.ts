import { ADD_ACCOUNT } from "./actionConstants";

export function addAccount(address: string) {
  return {
    type: ADD_ACCOUNT,
    payload: { address },
  };
}
