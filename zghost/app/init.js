import cookieParser from 'cookie-parser'
import debuger from 'debug';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { ExpressValidator } from 'express-validator';
import http from 'http'
import morgan from 'morgan'
import mongoose from 'mongoose';

const validator = new ExpressValidator()


export const app = express()
export const asynchHandler = expressAsyncHandler
export const body = validator.body
export const connect = mongoose.connect
export const cookie_parser = cookieParser
export const debug = debuger
export const httphandler = http
export const json = express.json
export const logger = morgan
export const model = mongoose.model
export const router = express.Router()
export const Schema = mongoose.Schema
export const statics = express.static
export const urlencoded = express.urlencoded
export const validationResult = validator.validationResult
export {mongoose}