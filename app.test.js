const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;

const { agregarMensaje } = require('./app.js');

describe('agregarMensaje function', () => {

});
