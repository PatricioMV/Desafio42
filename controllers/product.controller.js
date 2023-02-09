import ProductService from '../services/product.service.js';
import ProductDTO from '../dtos/product.dto.js';
export let productService = new ProductService(); 


const getAll = async (req, res) => {
    let result = await productService.findAll();
    let resultDTO = result.map(prod => new ProductDTO(prod));
    res.status(200).send(result);
}

const getByID = async (req, res) => {
    let result = await productService.findById(req.params.id);
    let resultDTO = result.map(prod => new ProductDTO(prod));
    res.status(200).send(resultDTO);
}

const createProduct = async (req, res) => {
    let result = await productService.create(req.body);
    let resultDTO = result.map(prod => new ProductDTO(prod));
    res.status(200).send(resultDTO);
}

const updateProduct = async (req, res) => {
    let result = await productService.update(req.params.id, req.body);
    let resultDTO = result.map(prod => new ProductDTO(prod));
    res.status(200).send(resultDTO);
}

const deleteProduct = async (req, res) => {
    await productService.delete(req.params.id);
    let result = await productService.findAll();
    let resultDTO = result.map(prod => new ProductDTO(prod));
    res.status(200).send(resultDTO);
}

export default {
    getAll, getByID, createProduct, updateProduct, deleteProduct, productService
}