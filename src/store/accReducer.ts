import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AccountState {
  address: string;
}

const initialState: AccountState = {
  address: "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setAccount: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
});

export const { setAccount } = accountSlice.actions;

export const selectAccount = (state: RootState) => state.account;

export default accountSlice.reducer;
