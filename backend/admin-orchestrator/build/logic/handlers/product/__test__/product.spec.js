"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const __1 = require("../");
const _repository_module_1 = require("@repository_module");
describe('test handler functions for products ', () => {
    let event;
    let product;
    let products;
    let repo;
    beforeEach(async () => {
        event = {
            pathParameters: { uuid: 'uuid' },
            body: '{}',
        };
        repo = new _repository_module_1.ProductRepository();
        await repo.putItem({ uuid: 'uuid', name: 'product 1', price: 10 });
        product = await repo.getItem('uuid');
        products = await repo.getAllItems();
    });
    afterEach(async () => {
        await repo.deleteItem('uuid');
    });
    it('tests handleProductDelete', async () => {
        const spy = jest.spyOn(repo, 'deleteItem');
        await (0, __1.handleProductDelete)(event, 'dev');
        expect(spy).toHaveBeenCalledWith('uuid');
    });
    it('tests handleProductGet', async () => {
        const result = await (0, __1.handleProductGet)(event, 'dev');
        expect(result).toEqual(product);
    });
    it('tests handleProductGetAll', async () => {
        const result = await (0, __1.handleProductGetAll)(event, 'dev');
        expect(result).toEqual(products);
    });
    it('tests handleProductPost', async () => {
        const spy = jest.spyOn(repo, 'putItem');
        await (0, __1.handleProductPost)(event, 'dev');
        expect(spy).toHaveBeenCalledWith(product);
    });
    it('tests handleProductPut', async () => {
        const spy = jest.spyOn(repo, 'putItem');
        await (0, __1.handleProductPut)(event, 'dev');
        expect(spy).toHaveBeenCalledWith(product);
    });
    it('tests handleProductPutAll', async () => {
        const spy = jest.spyOn(repo, 'putItems');
        const body = [{ uuid: 'uuid1', name: 'product 2', price: 20 }, { uuid: 'uuid2', name: 'product 3', price: 30 }];
        event.body = JSON.stringify(body);
        const expectedProducts = body.map((productData) => ({ ...productData, quantity: 1 }));
        await (0, __1.handleProductPutAll)(event, 'dev');
        expect(spy).toHaveBeenCalledWith(expectedProducts);
    });
});
//# sourceMappingURL=product.spec.js.map