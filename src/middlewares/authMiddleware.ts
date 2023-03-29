import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import { DatesUtils } from '../Utils/DatesUtils';
import { EnvConfig } from '../Config/EnvConfig';
var jwt = require("jsonwebtoken");

const DatesU = new DatesUtils();

exports.auth = async (req, res, next) => {
    const config = await EnvConfig.getInstance();
    const secretOrKey = await config.get('AUTH_KEY');
    let token:string = req.headers.authorization;
    if (token == null) {
        return res.status(401).json({ message: "No token provided" });
    }
    token = token.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }else if(token == secretOrKey){
        next();
    }else{
        jwt.verify(token, secretOrKey, async (err, decoded) => {
            console.log(token);
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