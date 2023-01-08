exports.Create = async (req, res) => {
    try {
        var item = req.body;
        console.log(item);
        res.status(200).send(item);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio");
    }
};