import cookieParser from 'cookie-parser'
import debuger from 'debug';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { ExpressValidator } from 'express-validator';
import http from 'http'
import morgan from 'morgan'
import mongoose from 'mongoose';
import compression from 'compression';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { body, validationResult } from 'express-validator';

const validator = new ExpressValidator()


export const app = express()
export const asynchHandler = expressAsyncHandler
export const connect = mongoose.connect
export const cookie_parser = cookieParser
export const compressor = compression()
export const debug = debuger
export const helmetSecurity = helmet()
export const httphandler = http
export const json = express.json
export const logger = morgan
export const model = mongoose.model
export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
})
export const router = express.Router()
export const Schema = mongoose.Schema
export const statics = express.static
export const urlencoded = express.urlencoded

export {mongoose, body, validationResult}