import { Comments, Profiles } from '../models'
import { httpStatus } from '../constants'

export const commentsController = {
  addComments,
  getComments
}

async function addComments (req, res) {
  const { comment, profile } = req.body
  const { id } = res.user
  try {
    const commentId = await Comments.create({ comment, addedBy: id, updatedBy: id })
    await Profiles.findByIdAndUpdate(profile, { $push: { comments: commentId } })
    return res.json({ status: httpStatus.ok, msg: 'Comments added' })
  } catch (error) {
    return res.json({ status: 'error', error })
  }
}

async function getComments (req, res) {
  const { commentId } = req.params
  const commentData = await Comments.findOne({ id: commentId }).lean()
  return res.json({ data: commentData })
}
