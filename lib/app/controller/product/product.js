const { resp } = require('express');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//response
const response = require('../../response/index.response');


const putProduct = async(req, res = resp) => {

    const { id } = req.params;
    const { name, categroy_id, img } = req.body;
    let data = {};

    try {
        // Verificar si el user existe
        let product = await prisma.product.findUnique({
            where: { id  }
        });

        if ( !product ) return  response.error(res, 'Product does not exist');

        for (const item in req.body) {
            data[item] = req.body[item]
        }

        product = await prisma.product.update({
            where: { id },
            data
        });

        response.success(res, 'Updated successfully', product);

    } catch (error) {
        console.log(error)
        response.error(res, error.toString(), null, 500);
    }

}

const getByIDProduct = async(req, res = resp) => {

    const { id } = req.params;

    try {
        // Verificar si el user existe
        const product = await prisma.product.findUnique({
            where: { id  }
        });

        if ( !product ) return  response.error(res, 'Product does not exist');

        response.success(res, 'Product By Id', product);

    } catch (error) {
        console.log(error)
        response.error(res, error.toString(), null, 500);
    }
}

const deleteProduct = async(req, res = resp) => {

    const { id } = req.params;

    try {

        // Verificar si el user existe
        let product = await prisma.product.findUnique({
            where: { id  }
        });

        if ( !product ) return  response.error(res, 'Product does not exist');

        // Verificar si el user existe
        product = await prisma.product.delete({
            where: { id  }
        });


        response.success(res, 'Deleted Successfully');

    } catch (error) {
        console.log(error)
        response.error(res, error.toString(), null, 500);
    }

}

const postProduct = async( req, res = resp ) => {

    const { user_id, name, currency,  price } = req.body;

    try {


        let product = await prisma.products.create({
            data: { user_id, name, currency,  price 
            },
            select: {
                id: true,
                user_id: true,
                name : true,
                currency : true,
                price : true,
         
            }
          });

        response.success(res, 'Product created', product, 201);

    } catch (error) {
        console.log(error)
        response.error(res, error.toString(), null, 500);
    }
}

const getProduct = async(req, res = resp) => {

    const { id } = req.params;

    try {

        const product = await prisma.products.findMany({
            where: {       user_id: id },
        });


        response.success(res, 'List of Products' , product);

    } catch (error) {
        console.log(error)
        response.error(res, error.toString(), null, 500);
    }

}

module.exports = {
    putProduct,
    postProduct,
    getProduct,
    getByIDProduct,
    deleteProduct
}
