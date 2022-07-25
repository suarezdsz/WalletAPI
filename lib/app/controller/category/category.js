const { resp } = require('express');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//response
const response = require('../../response/index.response');


const putCategory = async(req, res = resp) => {

    const { id } = req.params;
    const { name, user_id } = req.body;
    let data = {};

    try {
        // Verificar si el user existe
        let category = await prisma.category.findUnique({
            where: { id  }
        });

        if ( !category ) return  response.error(res, 'Category does not exist');

        for (const item in req.body) {
            data[item] = req.body[item]
        }

        category = await prisma.category.update({
            where: { id },
            data
        });

        response.success(res, 'Updated successfully', category);

    } catch (error) {
        console.log(error)
        response.error(res, error.toString(), null, 500);
    }

}

const getByIDCategory = async(req, res = resp) => {

    const { id } = req.params;

    try {
        // Verificar si el user existe
        const category = await prisma.category.findUnique({
            where: { id  }
        });

        if ( !category ) return  response.error(res, 'Category does not exist');

        response.success(res, 'Category By Id', category);

    } catch (error) {
        console.log(error)
        response.error(res, error.toString(), null, 500);
    }
}

const deleteCategory = async(req, res = resp) => {

    const { id } = req.params;

    try {

        // Verificar si el user existe
        let category = await prisma.categories.findUnique({
            where: { id  }
        });

        if ( !category ) return  response.error(res, 'Category does not exist');

        // Verificar si el user existe
        category = await prisma.categories.delete({
            where: { id  }
        });


        response.success(res, 'Deleted Successfully');

    } catch (error) {
        console.log(error)
        response.error(res, error.toString(), null, 500);
    }

}

const postCategory = async( req, res = resp ) => {

    const { name, user_id } = req.body;

    try {
        // Verificar si el user existe
        const user = await prisma.user.findUnique({
            where: { id : user_id }
        });

        if ( !user ) return  response.error(res, 'User does not exist');

        let category = await prisma.categories.create({
            data: {
              name,
              user_id
            },
            select: {
                id: true,
                name : true,
                user_id : true,
            }
          });

        response.success(res, 'Category created', category, 201);

    } catch (error) {
        console.log(error)
        response.error(res, error.toString(), null, 500);
    }
}

const getCategory = async(req, res = resp) => {

    const { id } = req.params;

    try {

        const category = await prisma.categories.findMany({
            where: { id },
        });

        if ( !category ) return  response.error(res, 'Category does not exist');

        response.success(res, 'List of Categories' , category);

    } catch (error) {
        console.log(error)
        response.error(res, error.toString(), null, 500);
    }

}

module.exports = {
    putCategory,
    postCategory,
    getCategory,
    getByIDCategory,
    deleteCategory
}
