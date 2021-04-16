export const SCHEMA_NAMES = {
  PROFILE: 'PROFILE',
  USER: 'USER',
  COMMENT: 'COMMENT'
}

export const POPULATE_FIELDS = {
  COMMENT: { path: 'comment', populate: [{ path: 'user' }, { path: 'comment' }] }
}
