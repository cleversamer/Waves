const AccessControl = require("accesscontrol");

const allRights = {
  "create:any": ["*"],
  "read:any": ["*"],
  "update:any": ["*"],
  "delete:any": ["*"],
};

let grantsObject = {
  admin: {
    profile: allRights,
    email: allRights,
  },
  user: {
    profile: {
      "read:own": ["*", "!password", "!_id"],
      "update:own": ["*"],
    },
    email: {
      "update:own": ["*"],
    },
  },
};

const roles = new AccessControl(grantsObject);

module.exports = {
  roles,
};
