import { productService } from "../controllers/product.controller.js";

export const productValidator = (req, res, next) => {
    if (!req.body.title || !req.body.price || !req.body.thumbnail) return res.status(400).send({error: "Falta informacion"});
    next();
}

export const productIDValidator = async (req, res, next) => {
    if (isNaN(req.params.id)) return res.status(400).send({error: "El ID debe ser numerico"});
    let prod = await productService.findById(req.params.id);
    if(prod[0] == undefined) return res.status(400).send({ error: 'No existe producto con ese id' });
    next();
}