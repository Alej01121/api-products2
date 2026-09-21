import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {
 constructor(
 private readonly productService: ProductService
 ) {}

 getAll = async (req: Request, res: Response) => {
 const products = await this.productService.getAll();
 res.status(200).json(products);
 };

 getById = async (req: Request, res: Response) => {
 const id = Number(req.params.id);
 const product = await this.productService.getById(id);
 res.status(200).json(product);
 };

 getByCategory = async (req: Request, res: Response) => {
 const { category } = req.params;
 const products = await this.productService.getByCategory(category);
 res.status(200).json(products);
 };

 create = async (req: Request, res: Response) => {
 const product = await this.productService.create(req.body);
 res.status(201).json(product);
 };

 update = async (req: Request, res: Response) => {
 const id = Number(req.params.id);
 const product = await this.productService.update(id, req.body);
 res.status(200).json(product);
 };

 remove = async (req: Request, res: Response) => {
 const id = Number(req.params.id);
 await this.productService.delete(id);
 res.status(204).send();
 };
}
