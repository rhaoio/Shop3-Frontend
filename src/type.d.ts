interface IProduct {
  name: string; //name from contract
  description?: string; //description from contract
  location?: string; //location from contract
  price: BigNumber | number; //price from contract
  qty: BigNumber | number; //qty from contract
  externalId: string; // externalId from contract
  id: BigNumber | number; // internal ID used by contract
}

interface Window {
  ethereum: any;
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
