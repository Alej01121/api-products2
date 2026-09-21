import { products } from "../data/products.data";
import { Product } from "../models/product.model";
import {
 CreateProductDto,
 UpdateProductDto
} from "../dtos/product.dto";

export class ProductRepository {
 findAll(): Product[] {
 return products;
 }

 findById(id: number): Product | undefined {
 return products.find(product => product.id === id);
 }

 findByName(name: string): Product | undefined {
 return products.find(
 product => product.name.toLowerCase() === name.toLowerCase()
 );
 }

 findByCategory(category: string): Product[] {
 return products.filter(
 product => product.category.toLowerCase() === category.toLowerCase()
 );
 }

 create(data: CreateProductDto): Product {
 const nextId = products.length > 0
 ? Math.max(...products.map(product => product.id)) + 1
 : 1;

 const newProduct: Product = {
 id: nextId,
 ...data
 };

 products.push(newProduct);
 return newProduct;
 }

 update(id: number, data: UpdateProductDto): Product | undefined {
 const index = products.findIndex(product => product.id === id);

 if (index === -1) {
 return undefined;
 }

 products[index] = {
 id,
 ...data
 };

 return products[index];
 }

 delete(id: number): boolean {
 const index = products.findIndex(product => product.id === id);

 if (index === -1) {
 return false;
 }

 products.splice(index, 1);
 return true;
 }
}
