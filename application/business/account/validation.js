import { ACCOUNT_TYPES } from "./types";
class AccountValidation {
  constructor(user) {
    this.count = user.getCountTopics();
  }

  canAdd() {
    return false;
  }
}

class AccountFree extends AccountValidation {
  canAdd() {
    if (this.count > ACCOUNT_TYPES.free.limit) {
      return {
        status: false,
        message: "Conta ultrapassou o limite de topicos"
      };
    } else {
      return {
        status: true,
        message: ""
      };
    }
  }
}

class AccountPremium extends AccountValidation {
  canAdd() {
    return this.count < ACCOUNT_TYPES.premium.limit;
  }
}

class AccountTop extends AccountValidation {
  canAdd() {
    return this.count < ACCOUNT_TYPES.top.limit;
  }
}

export { AccountFree, AccountPremium, AccountTop };
