import { ProductService } from '../ProductService';
import { productsCurrent, productsEdit, isProductsEdited } from '@/state/products';
import { createProduct } from '../../../../../page_cls_module/src/mockFactories';
import axios from 'axios';

jest.mock('axios');
jest.mock('@/state/products');

describe('ProductService', () => {
    const adminUrl = 'http://localhost';
    let productService: ProductService;

    beforeEach(() => {
        productService = new ProductService(adminUrl);
    });

    it('should reset products', () => {
        productsCurrent.value = [createProduct({ uuid: 'uuid1' }), createProduct({ uuid: 'uuid2' })];
        productService.resetProducts();
        expect(productsEdit.value).toEqual(productsCurrent.value);
    });

    it('should fetch Product', async () => {
        const product = createProduct({ uuid: 'uuid1' });
        axios.get.mockResolvedValue({ data: product });
        const result = await productService.fetchProduct('uuid1');
        expect(result).toEqual(product);
    });

    it('should fetch all Products', async () => {
        const products = [createProduct({ uuid: 'uuid1' }), createProduct({ uuid: 'uuid2' })];
        axios.get.mockResolvedValue({ data: products });
        const result = await productService.fetchProductAll();
        expect(result).toEqual(products);
    });

    it('should get all Products', async () => {
        const products = [createProduct({ uuid: 'uuid1' }), createProduct({ uuid: 'uuid2' })];
        productService.fetchProductAll = jest.fn().mockResolvedValue(products);
        await productService.getProductAll();
        expect(productsCurrent.value).toEqual(products);
        expect(productsEdit.value).toEqual(products);
    });

    it('should throw error when saveProducts is called without edits', async () => {
        const products = [createProduct({ uuid: 'uuid1' }), createProduct({ uuid: 'uuid2' })];
        isProductsEdited.value = false;
        productsEdit.value = products;
        await expect(productService.saveProducts(products)).rejects.toThrow('cannot save products if they are not edited');
    });

    it('should throw error when saveProducts is called with undefined productsEdit.value', async () => {
        const products = [createProduct({ uuid: 'uuid1' }), createProduct({ uuid: 'uuid2' })];
        isProductsEdited.value = true;
        productsEdit.value = undefined;
        await expect(productService.saveProducts(products)).rejects.toThrow('productsEdit.value cannot be undefined');
    });

    it('should set products', () => {
        const products = [createProduct({ uuid: 'uuid1' }), createProduct({ uuid: 'uuid2' })];
        productService.setProducts(products);
        expect(productsCurrent.value).toEqual(products);
        expect(productsEdit.value).toEqual(products);
    });
});
