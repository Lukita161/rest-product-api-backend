import request from "supertest"
import server from "../../server"
import { conectionDB } from "../../server"
import db from "../../config/db"




describe('To send a product for the DB', ()=> {
    it('Sending the product', async()=> {
        const response = await request(server).post('/api/products').send(
            {
                name: "Monitor curvo -- Testing",
                price: 400
            })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
})
    it('should display validation errors', async()=> {
        const response = await request(server).post('/api/products').send({})
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveLength(3)

        expect(response.body).not.toHaveProperty('data')
        expect(response.status).not.toBe(201)
    })
    it('sending a non price product', async()=> {
        const response = await request(server).post('/api/products').send({
            name: "Monitor curvo -- Testing",
            price: 0
        })
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveLength(1)

        expect(response.status).not.toBe(201)
        expect(response.body).not.toHaveProperty('data')

    })
})

describe('Geting the products', ()=> {
    it('Get all the product by GET', async()=> {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.header['content-type']).toMatch(/json/)
        expect(response.body).not.toHaveProperty('error')
        expect(response.status).not.toBe(404)
    })
    it('check if the url exist', async()=> {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.status).not.toBe(404)
    })
})

describe('Testing the get product by id', ()=> {
    it('Send the get with a non existing id', async()=> {
        const id = 1000
        const response = await request(server).get(`/api/products/${id}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.status).not.toBe(200)
    })
    it('Send the get to a inexistent URL', async()=> {
        const response = await request(server).get('/api/non-existent-url')
        expect(response.status).toBe(404)
        expect(response.header['content-type']).toMatch(/html/)
        expect(response.header['content-type']).not.toMatch(/json/)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('Getting the correct product', async()=> {
        const response = await request(server).get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.header['content-type']).toMatch(/json/)
        expect(response.status).not.toBe(404)
    })
})

describe('Testing the PUT method', ()=> {
    it('Testing the good error msg with sending empty object', async()=> {
        let id = 1
        const response = await request(server).put(`/api/products/${id}`).send({})
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveLength(3)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('should the price is -0', async()=> {
        const response = await request(server).put('/api/products/1').send({
            name: 'Televisor --Testing',
            price: -50
        })
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveLength(1)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('sending the request for a non existing url', async()=> {
        const response = await request(server).put('/api/non-existing-url')
        expect(response.status).toBe(404)
        expect(response.status).not.toBe(200)
    })
    it('send the request for a non existing id', async()=> {
        let id = 2000
        const response = await request(server).put(`/api/products/${id}`).send(
            {name: "Televisor -- Testing",
            price: 100}
        )
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.header['content-type']).toMatch(/json/)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('sending a correct product, and updated', async()=> {
        const response = await request(server).put(`/api/products/1`).send(
            {name: "Televisor -- Testing",
            price: 500}
        )
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.header['content-type']).toMatch(/json/)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe('Testing the Patch method', ()=> {
    it('Id non exist', async()=> {
        let id = 4000
        const response = await request(server).patch(`/api/products/${id}`)
        expect(response.status).toBe(404)
        expect(response.header['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('error')
        expect(response.status).not.toBe(200)
    })
    it('Correct update', async()=> {
        const response = await request(server).patch('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.header['content-type']).toMatch(/json/)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe('Testing the DELETE method', ()=> {
    it('Testing the incorrect url, correct error msg', async()=> {
        const response = await request(server).delete('/api/products/incorrect')
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.header['content-type']).toMatch(/json/)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('Testing the result of a non existing id', async()=> {
        let id = 4000
        const response = await request(server).delete(`/api/products/${id}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.header['content-type']).toMatch(/json/)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('Deleting a item correctly', async()=> {
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.header['content-type']).toMatch(/json/)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
    })
})

