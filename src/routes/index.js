
import usersRouter from './users'
import commentsRouter from './comments'
import profileRouter from './profiles'
import { AppError } from '../utils'
import { httpStatus } from '../constants'

const RouteData = [
  { path: '/user', router: usersRouter },
  { path: '/comments', router: commentsRouter },
  { path: '/profile', router: profileRouter }
]

const { BASE_URL } = process.env

export const Routes = (app) => {
  // Setting application routes
  RouteData.forEach((route) => app.use(BASE_URL + route.path, route.router))

  app.use(function (req, res, next) { throw new AppError('No route found', httpStatus.NOT_FOUND) })
}
