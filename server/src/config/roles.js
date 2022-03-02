const allRoles = {
  user: ['getCourses', 'getBranches', 'getOrEditCompanies', 'manageJnfs', 'getJnfs', 'manageInfs', 'getInfs', 'getGradYear'],
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
    'getInfs',
    'manageGradYear',
    'getGradYear',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
