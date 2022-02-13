const allRoles = {
  user: ['getCourses'],
  admin: ['getUsers', 'manageUsers', 'manageCourses', 'getCourses'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
