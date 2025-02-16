import * as dao_user from "./dao_user";
import * as dao_profile from "./dao_profile";
import * as dao_health from "./dao_health";

const dao = {
  ...dao_user,
  ...dao_profile,
  ...dao_health,
};

export default dao;
