const allRoles = {
  user: ['getCourses', 'getBranches', 'getOrEditCompanies'],
  admin: [
    'getUsers',
    'manageUsers',
    'manageCourses',
    'getCourses',
    'manageBranches',
    'getBranches',
    'getOrEditCompanies',
    'createOrDeleteCompanies',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
