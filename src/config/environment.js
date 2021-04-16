export const MONGO_CONFIG = {
  URI: process.env.MONGO_URI
}
const { BASE_URL } = process.env

export const AUTH = {
  SIGNATURE: process.env.AUTH_SIGNATURES.split(','),
  CALLERS: JSON.parse(process.env.AUTH_CALLERS),
  SIGNATURE_PATHS: [
    `${BASE_URL}/application/resume`
  ].map(ele => new RegExp(ele))
}

const NO_AUTH_PATHS = [
  `${BASE_URL}/user/signup`,
  `${BASE_URL}/user/login`,
  `${BASE_URL}/profile/upload`
].map(ele => new RegExp(ele))

export const JWT_CONFIG = {
  SECERET: process.env.JWT_SECERET,
  TOKEN_VALIDITY: process.env.TOKEN_VALIDITY,
  NO_AUTH_PATHS
}
