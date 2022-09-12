'use strict';

/*const Server = require('../server.js');
const supertest = require('supertest');
const request = supertest(Server.app);*/

describe('Test Server', () => {
    it( 'should respond with 404 on an invalid route', async () => {
        const res = await request.get( '/foo' );
        expect( res.status ).toEqual( 404 );
    } );
    it('Home page works', async () => {
        const res = await request.get('/');
        expect(res.status).toEqual(200);
        expect(res.text).toEqual({
            'message': 'Hello World',
            'code': '200'
        });
    });

});