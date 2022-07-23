const AccessControl = require("accesscontrol");

const allRights = {
  "create:any": ["*"],
  "read:any": ["*"],
  "update:any": ["*"],
  "delete:any": ["*"],
};

let grantsObject = {
  admin: {
    user: allRights,
    profile: allRights,
    email: allRights,
    brand: allRights,
    product: allRights,
    site: allRights,
    cart: allRights,
  },
  user: {
    user: {
      "read:own": ["*"],
    },
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
    site: {
      "read:any": ["*"],
    },
    cart: {
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
    },
  },
};

const roles = new AccessControl(grantsObject);

module.exports = {
  roles,
};
