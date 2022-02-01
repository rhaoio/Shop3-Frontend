interface IProduct {
  name: string;
  description?: string;
  location?: string;
  qty: BigNumber;
  externalId: string;
}

interface IAccount {
  address: string;
  loggedIn?: boolean;
}

interface AccountState {
  address: string;
}

type AccountAction = {
  type: string;
  account: IAccount;
};

type DispatchType = (args: AccountAction) => AccountAction;
