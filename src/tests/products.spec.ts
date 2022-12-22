import openApi3Doc from '../docs/openapi3.json'
import { app, init as initApp } from '../app'
import jestOpenAPI from 'jest-openapi'
import request from 'supertest'

jestOpenAPI(JSON.parse(JSON.stringify(openApi3Doc)))
initApp()

describe('GET /products', () => {
    it(`Should return 1 product objects with pageSize=1`, async () => {
        const res = await request(app) //
            .get(`/products?pageSize=1`)
            .expect(200)

        expect(res.body.products).toHaveLength(1)
        expect(res).toSatisfyApiSpec()
    })

    /**
     * @todo Valid logic to be implemented to fetch CAD price to compare with actual result.
     */
    it(`Should return product objects in CAD price with currency=CAD`, async () => {
        const res = await request(app) //
            .get(`/products?currency=CAD`)
            .expect(200)

        expect(res).toSatisfyApiSpec()
    })

    it('Should return 400 when invalid value is sent for currency', async () => {
        const res = await request(app) //
            .get('/products?currency=JPY')
            .expect(400)

        expect(res).toSatisfyApiSpec()
    })
})

describe('GET /products/{id}', () => {
    it(`Should return 200 along with product when id is sent`, async () => {
        const res = await request(app) //
            .get(`/products/1`)
            .expect(200)

        expect(res).toSatisfyApiSpec()
    })

    it('Should return 400 when invalid value is sent for id', async () => {
        const res = await request(app) //
            .get(`/products/foo`)
            .expect(400)

        expect(res).toSatisfyApiSpec()
    })

    it('Should return 404 when non existent value is sent for id', async () => {
        const res = await request(app) //
            .get(`/products/1234567890`)
            .expect(404)

        expect(res).toSatisfyApiSpec()
    })
})

describe('GET /foo', () => {
    it(`Should return 405 method not allowed for non existent resource`, async () => {
        await request(app) //
            .get(`/foo`)
            .expect(405)
    })
})
