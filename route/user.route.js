import express from 'express';
import { userCheck,createUser } from '../controller/user.controller.js';
const Router = express.Router();
Router.post('/checkUser',userCheck);
Router.post('/createUser',createUser);
export default Router;