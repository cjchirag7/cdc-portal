const allRoles = {
  user: ['getCourses', 'getBranches', 'getOrEditCompanies', 'manageJnfs', 'getJnfs'],
  admin: [
    'getUsers',
    'manageUsers',
    'manageCourses',
    'getCourses',
    'manageBranches',
    'getBranches',
    'getOrEditCompanies',
    'createOrDeleteCompanies',
    'getJnfs',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
