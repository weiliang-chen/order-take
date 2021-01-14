const express = require('express')
const Order = require('../model/order')
const router = new express.Router()

router.post('/orders', async (req, res) => {
    const order = new Order(req.body)
    order.status = "UNASSIGNED"

    try {
        await order.save()
        res.status(200).send({ id: order.id, status: order.status})
    } catch (e) {
        res.status(500).send({error: 'Something went wrong'})
    }
})

router.patch('/orders/:id', async (req, res) => {
    try{
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

router.get('/orders', async (req, res) => {
    try {
        if (req.query.page < 1) {
            res.status(400).send({ Error: "page number must greater than 0"})
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