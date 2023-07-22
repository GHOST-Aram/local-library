import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import debuger from 'debug';
import http from 'http'

export const app = express()
export const router = express.Router()
export const json = express.json
export const encordUrl = express.urlencoded
export const statics = express.static
export const logger = morgan
export const cookie_parser = cookieParser
export const debug = debuger
export const httphandler = http