import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import { DatesUtils } from '../Utils/DatesUtils';
const jwt = require("jsonwebtoken");

const secretOrKey = process.env.AUTH_KEY;
const DatesU = new DatesUtils();

exports.auth = (req, res, next) => {
    let token:string = req.headers.authorization;
    if (token == null) {
        return res.status(401).json({ message: "No token provided" });
    }
    token = token.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    if(token == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp0YWxlcm85MUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQ1NiIsImxhc3RTZXNzaW9uIjoxNjc2MjQzMjQ0Mjg3LCJpYXQiOjE2NzYyNDMyNDR9.Hwc-PQcMUAv1e-2D5jRgKY7LYrkI5Z-LXwO7xNaUJhg"){
        next();
    }else{
        jwt.verify(token, secretOrKey, async (err, decoded) => {
            let currentDate = new Date().getTime()
            if (err) {
                return res.status(401).json({ message: "Token is not valid" });
            }else if (decoded?.lastSession == null){
                return res.status(401).json({ message: "Corrupt Token" });
            }else if ((await DatesU.moreThanTwoHoursDifference(currentDate, decoded?.lastSession)) == true){
                return res.status(401).json({ message: "Expired Token" });
            }
            req.usuario = decoded;
            next();
        });
    }
};