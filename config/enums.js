export const STATUS = {
  bad_request: 400,
  non_authorization: 401,
  created: 201,
  updated: 202,
  non_content: 204,
  ok: 200,
  fall_server: 500,
};

export const USER_CODE = {
  ok: 200,
  error_server: 500,
};

export const LAYER = {
  global: 'global',
  action: 'action',
  service: 'service',
  repository: 'repository',
};

export const STRENGTH_BCRYCT = 12;

export const ROLES = {
  teacher: 'teacher',
  student: 'student',
  admin: 'admin',
};

const sharedPermissions = [
  'auth:login',
  'auth:get-by-id',
  'record:get-records',
  'record:get-by-id',
];

const editPermissions = ['record:create', 'record:update'];

export const PERMISSIONS = {
  admin: [
    ...sharedPermissions,
    ...editPermissions,
    'auth:delete',
    'auth:update',
    'auth:get-users',
    'auth:registration',
    'record:delete',
  ],
  teacher: [...sharedPermissions, ...editPermissions],
  student: [...sharedPermissions],
};
