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
    brand: allRights,
    product: allRights,
  },
  user: {
    profile: {
      "read:own": ["*", "!password", "!_id"],
      "update:own": ["*"],
    },
    email: {
      "update:own": ["*"],
    },
    brand: {
      "read:any": ["*"],
    },
    product: {
      "read:any": ["*"],
    },
  },
};

const roles = new AccessControl(grantsObject);

module.exports = {
  roles,
};
