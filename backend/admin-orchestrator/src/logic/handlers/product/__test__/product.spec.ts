// @ts-nocheck
import { handleProductDelete, handleProductGet, handleProductGetAll, handleProductPost, handleProductPut, handleProductPutAll } from '../';
import { APIGatewayEvent } from 'aws-lambda';
import { ProductRepository } from '@repository_module';
import { Product } from 'aws-sdk/clients/ssm';

describe('test handler functions for products ', () => {
    let event: APIGatewayEvent;
    let product: Product;
    let products: Product[];
    let repo: ProductRepository;

    beforeEach(async () => {
        event = {
            pathParameters: { uuid: 'uuid' },
            body: '{}',
        } as unknown as APIGatewayEvent;
        repo = new ProductRepository();
        await repo.putItem({ uuid: 'uuid', name: 'product 1', price: 10 });
        product = await repo.getItem('uuid');
        products = await repo.getAllItems();
    });

    afterEach(async () => {
        await repo.deleteItem('uuid');
    });

    it('tests handleProductDelete', async () => {
        const spy = jest.spyOn(repo, 'deleteItem');

        await handleProductDelete(event, 'dev');
        expect(spy).toHaveBeenCalledWith('uuid');
    });

    it('tests handleProductGet', async () => {
        const result = await handleProductGet(event, 'dev');

        expect(result).toEqual(product);
    });

    it('tests handleProductGetAll', async () => {
        const result = await handleProductGetAll(event, 'dev');

        expect(result).toEqual(products);
    });

    it('tests handleProductPost', async () => {
        const spy = jest.spyOn(repo, 'putItem');

        await handleProductPost(event, 'dev');
        expect(spy).toHaveBeenCalledWith(product);
    });

    it('tests handleProductPut', async () => {
        const spy = jest.spyOn(repo, 'putItem');

        await handleProductPut(event, 'dev');
        expect(spy).toHaveBeenCalledWith(product);
    });

    it('tests handleProductPutAll', async () => {
        const spy = jest.spyOn(repo, 'putItems');

        const body = [{ uuid: 'uuid1', name: 'product 2', price: 20 }, { uuid: 'uuid2', name: 'product 3', price: 30 }];
        event.body = JSON.stringify(body);
        const expectedProducts = body.map((productData: any) => ({ ...productData, quantity: 1 }));

        await handleProductPutAll(event, 'dev');
        expect(spy).toHaveBeenCalledWith(expectedProducts);
    });
});
