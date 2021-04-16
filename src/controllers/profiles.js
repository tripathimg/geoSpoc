import { Profiles } from '../models'
import { AppError } from '../utils'
import multer from 'multer'
import { httpStatus, POPULATE_FIELDS } from '../constants'

export const profilesController = {
  addProfile,
  getProfile
}

async function addProfile (req, res) {
  const { name, work, cover, web, email } = req.body
  try {
    await Profiles.create({ name, work, cover, web, email, attachments: req.file.filename })
    return res.json({ status: httpStatus.ok, msg: 'Profile uploaded' })
  } catch (error) {
    return res.json({ status: 'error', error })
  }
}

async function getProfile (req, res) {
  const { profile } = res.query || {}
  try {
    const profiles = await Profiles.find({ profile }).populate(Object.values(POPULATE_FIELDS)).lean()
    return res.json({ status: httpStatus.ok, data: profiles })
  } catch (error) {
    return res.json({ status: 'error', error })
  }
}

const fileFilter = function (req, file, cb) {
  if (!['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
    return cb(new AppError('Only pdf, jpg, jpeg, png formats are allowed', httpStatus.UNPROCESSABLE_ENTITY, file))
  }
  cb(null, true)
}

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + '.' + file.originalname.split('.').pop())
  }
})
export const uploadToLocal = () => multer({ fileFilter, storage: diskStorage }).single('file')
