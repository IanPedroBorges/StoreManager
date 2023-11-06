const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const mockProductList = require('../../models/mocks/mockProductList');
const { productsModel } = require('../../../src/models');

describe('Testa o service de produtos', function () {
  afterEach(function () { return sinon.restore(); });
  it('Recuperando todos os produtos', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(mockProductList);
    const allProducts = await productsService.getAllProducts();
    expect(allProducts.status).to.be.equal('OK');
    expect(allProducts.data).to.be.an('array');
  });
  it('Recuperando um produto pelo id', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(mockProductList[0]);
    const product = await productsService.getProductById(1);
    expect(product.status).to.be.equal('OK');
    expect(product.data).to.be.an('object');
  });
  it('testando se falha quando deve falhar', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves([]);
    const allProducts = await productsService.getAllProducts();
    expect(allProducts.status).to.be.equal('NOT_FOUND');
  });
  it('testando se falha quando nao encontra o id', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(undefined);
    const product = await productsService.getProductById(1);
    expect(product.status).to.be.equal('NOT_FOUND');
    expect(product.data).to.be.an('object');
    expect(product.data.message).to.be.equal('Product not found');
  });
  it('testando o serviço de post Product funciona quando tem q funcionar', async function () {
    sinon.stub(productsModel, 'postProduct').resolves(1);
    const newProduct = await productsService.postProduct({ name: 'newProduct' });
    expect(newProduct.data).to.be.an('object');
    expect(newProduct.status).to.be.equal('CREATED');
    expect(newProduct.data.id).to.be.equal(1);
  });
  it('testando se o serviço de post retorna erro quando nao encontrado', async function () {
    sinon.stub(productsModel, 'postProduct').resolves(null);
    const newProduct = await productsService.postProduct({ name: 'newProduct' });
    expect(newProduct.data).to.be.an('object');
    expect(newProduct.status).to.be.equal('ERROR_SERVIDOR');
    expect(newProduct.data.message).to.be.equal('ERROR SERVIDOR');
  });
  it('testando se a função update funciona corretamente', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(mockProductList[0]);
    sinon.stub(productsModel, 'updateProduct').resolves(1);
    const product = await productsService.updateProduct({ name: 'newProduct' }, 1);
    expect(product.status).to.be.equal('OK');
    expect(product.data).to.be.an('object');
    expect(product.data.id).to.be.equal(1);
  });
  it('verificando a função update quando passado um id que nao existe', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(undefined);
    const product = await productsService.updateProduct({ name: 'newProduct' }, 1);
    expect(product.status).to.be.equal('NOT_FOUND');
    expect(product.data).to.be.an('object');
    expect(product.data.message).to.be.equal('Product not found');
  });
  it('verificando se ocorrer um error no servidor pela função update', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(mockProductList[0]);
    sinon.stub(productsModel, 'updateProduct').resolves(0);
    const product = await productsService.updateProduct({ name: 'newProduct' }, 1);
    expect(product.status).to.be.equal('ERROR_SERVIDOR');
    expect(product.data).to.be.an('object');
    expect(product.data.message).to.be.equal('ERROR SERVIDOR');
  });
  it('verificando se a função delete funciona corretamente', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(mockProductList[0]);
    sinon.stub(productsModel, 'deleteProduct').resolves(1);
    const product = await productsService.deleteProduct(1);
    expect(product.status).to.be.equal('NO_CONTENT');
  });
  it('verificando se a função delete retorna erro quando nao encontra o id', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(undefined);
    const product = await productsService.deleteProduct(1);
    expect(product.status).to.be.equal('NOT_FOUND');
    expect(product.data).to.be.an('object');
    expect(product.data.message).to.be.equal('Product not found');
  });
  it('verificando se a função delete retorna erro quando o servidor para', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(mockProductList[0]);
    sinon.stub(productsModel, 'deleteProduct').resolves(0);
    const product = await productsService.deleteProduct(1);
    expect(product.status).to.be.equal('ERROR_SERVIDOR');
    expect(product.data).to.be.an('object');
    expect(product.data.message).to.be.equal('ERROR SERVIDOR');
  });
  it('verificando se a função getProductsByName funciona corretamente', async function () {
    sinon.stub(productsModel, 'getProductsByName').resolves(mockProductList);
    const product = await productsService.getProductsByName('ola');
    expect(product.status).to.be.equal('OK');
    expect(product.data).to.be.an('array');
    expect(product.data[0]).to.be.an('object');
    expect(product.data[0]).to.have.property('id');
    expect(product.data[0]).to.have.property('name');
    expect(product.data[0].id).to.be.a('number');
    expect(product.data[0].name).to.be.a('string');
  });
  it('verificando se a função getProductsByName retorna erro quando nao encontra o nome', async function () {
    sinon.stub(productsModel, 'getProductsByName').resolves([]);
    const product = await productsService.getProductsByName('ola');
    expect(product.status).to.be.equal('OK');
    expect(product.data).to.be.an('array');
  });
});