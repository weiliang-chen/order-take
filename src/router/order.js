const express = require('express')
const Order = require('../model/order')
const router = new express.Router()
const distance = require('../../utils/map')

router.post('/orders', async (req, res) => {
    function createorder (order) {
        distance(Number(req.body.origin[0]), Number(req.body.origin[1]), Number(req.body.destination[0]), Number(req.body.destination[1]), (error, data) => {
            if (error) {
                return res.status(400).send({ Error: error})
            }
            order.distance = data.distance
            order.save()
            return res.status(200).send(order)
        })
    }
    try {
        var order = new Order(req.body)
        order.status = "UNASSIGNED"
        createorder(order)      
    } catch (Error) {
        res.status(400).send({error: Error.message})
    }
})

router.patch('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id })
        if (!order) {
            return res.status(404).send({ error: 'order not exist'})
        }

        if (req.body.status == "TAKEN") {
            if (order.status == "SUCCESS") {
                return res.status(400).send({ Error: 'Order has been taken'})
            }
            order.status = 'SUCCESS'
            await order.save()
            res.status(200).send(order)
        } else {
            return res.status(400).send({ error: 'Order taken fail'})
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/orders/:id', async(req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id }) 
        if (!order) {
            return res.status(404).send({ error: 'order not exist'})
        }

        res.status(200).send(order)

    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/orders', async (req, res) => {
    try {
        if (req.query.page) {
            if (!Number.isInteger(Number(req.query.page))) {
                return res.status(400).send({ Error: "page or limit must be an integer"})
            }
        }

        if (req.query.limit) {
            if (!Number.isInteger(Number(req.query.limit))) {
                return res.status(400).send({ Error: "page or limit must be an integer"})
            }
        }
        
        if (req.query.page < 1) {
            return res.status(400).send({ Error: "page number must greater than 0"})
        }

        const limit = parseInt(req.query.limit)
        const page = parseInt(req.query.page)
        
        const order = await Order.find({}).skip(page-1).limit(limit)
        res.status(200).send(order)

    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router