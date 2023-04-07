import * as flv from './flv'
import * as mpegTs from './mpeg-ts'
import * as mp4 from './mp4'
import * as model from './model'
import { Logger } from './utils'

export default {
  ...flv,
  ...mpegTs,
  ...mp4,
  ...model,
  Logger
}
