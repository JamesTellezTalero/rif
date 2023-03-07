import { PayPalBusiness } from "../Business/PayPalBusiness"

const PayPalB = new  PayPalBusiness();

exports.Authentication = async (req, res) => {
    let resp = await PayPalB.Authentication()
    res.status(200).send(resp)
} 

exports.CreateOrder = async (req, res) => {
    let resp = await PayPalB.CreateOrder()
    res.status(200).send(resp)
} 

exports.ShowOrder = async (req, res) => {
    let resp = await PayPalB.ShowOrder()
    res.status(200).send(resp)
} 