import * as dao_users from "./dao_users";
import * as dao_profiles from "./dao_profiles";
import * as dao_health from "./dao_health";
import * as dao_swipes from "./dao_swipes";
import * as dao_matches from "./dao_matches";
import * as dao_images from "./dao_images";
import * as dao_preferences from "./dao_preferences";

const dao = {
  ...dao_users,
  ...dao_profiles,
  ...dao_health,
  ...dao_swipes,
  ...dao_matches,
  ...dao_images,
  ...dao_preferences,
};

export default dao;
