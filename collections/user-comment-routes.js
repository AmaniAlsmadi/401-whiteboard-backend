'use strict';

class PostCommentRoutes {
    constructor(model) {
        this.model = model;
    }

    async create(obj) {
        try {
            return await this.model.create(obj);
        } catch (e) {
            console.error('ERROR DURING THE CREATION');
        }
    }

    async read(id) {
        try {
            if (id) {
                return await this.model.findOne({ where: { id: id } });
            } else {
                return await this.model.findAll();
            }
        } catch (e) {
            console.error(`ERROR IN READING DATA WITH THE ID ${id}`);
        }
    }

    async update(id, obj) {
        try {
            const dataById = await this.model.findOne({ where: {id}});
            return await dataById.update(obj);
        } catch (e) {
            console.error(`ERROR WHILE UPDATING DATA WITH ID ${id}`);
        }
    }

    async delete(id) {
        try {
            return await this.model.destroy({ where: { id } });
        } catch (e) {
            console.error(`ERROR WHILE DELETING DATA WITH ID ${id}`);
        }
    }

    async readWithComments(comment) {
        try {
            return await this.model.findAll({ include: [comment] });
        } catch (e) {
            console.error(`ERROR WHILE READING COMMENTS ${this.model.name}`);
        }
    }

    async readOneWithComments ( id,Comment ) {
        try {
            return await this.model.findOne( {where: { id } ,include: [ Comment ] } );
        } catch ( e ) {
            console.error( `ERROR WHILE READING COMMENTS FOR MODEL ID ${id}` );
        }
    }

}
module.exports = PostCommentRoutes;