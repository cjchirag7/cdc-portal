const allRoles = {
  user: ['getOrEditCompanies'],
  admin: ['getUsers', 'manageUsers', 'getOrEditCompanies', 'createOrDeleteCompanies'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
