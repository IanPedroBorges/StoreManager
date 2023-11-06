const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const mockProductList = require('../../models/mocks/mockProductList');

describe('Testa o model de produtos', function () {
  afterEach(function () { return sinon.restore(); });
  it('Recuperando todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([mockProductList]);
    const allProducts = await productsModel.getAllProducts();
    expect(allProducts).to.be.an('array');
    expect(allProducts[0]).to.be.an('object');
    expect(allProducts[0]).to.have.property('id');
    expect(allProducts[0]).to.have.property('name');
    expect(allProducts[0].id).to.be.a('number');
    expect(allProducts[0].name).to.be.a('string');
  });
  it('Recuperando um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([mockProductList]);
    const product = await productsModel.getProductById(1);
    expect(product).to.be.an('object');
    expect(product).to.have.property('id');
    expect(product).to.have.property('name');
    expect(product.id).to.be.a('number');
  });
  it('Criando um produto novo', async function () {
    const id = {
      insertId: 1,
    };
    sinon.stub(connection, 'execute').resolves([id]);
    const newProduct = await productsModel.postProduct({ name: 'ola' });
    expect(newProduct).to.be.equal(1);
  });
  it('verificando se o update funciona corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const updateProduct = await productsModel.updateProduct({ name: 'ola' }, 1);
    expect(updateProduct).to.be.equal(1);
  });
  it('testando se o delete funciona corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const deleteProduct = await productsModel.deleteProduct(1);
    expect(deleteProduct).to.be.equal(1);
  });
  it('testando se o getProductsByName funciona corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([mockProductList]);
    const getProductsByName = await productsModel.getProductsByName('ola');
    expect(getProductsByName).to.be.an('array');
    expect(getProductsByName[0]).to.be.an('object');
    expect(getProductsByName[0]).to.have.property('id');
    expect(getProductsByName[0]).to.have.property('name');
    expect(getProductsByName[0].id).to.be.a('number');
    expect(getProductsByName[0].name).to.be.a('string');
  });
});