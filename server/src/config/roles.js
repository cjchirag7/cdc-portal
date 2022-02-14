const allRoles = {
  user: ['getCourses', 'getBranches'],
  admin: ['getUsers', 'manageUsers', 'manageCourses', 'getCourses', 'manageBranches', 'getBranches'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
