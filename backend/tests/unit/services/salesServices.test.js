const { expect } = require('chai');
const sinon = require('sinon');
const { salesServices } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');
const mockSales = require('../../models/mocks/mockSalesList');

describe('Testa o service de sales', function () {
  afterEach(function () { return sinon.restore(); });
  it('Recuperando todos os sales', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(mockSales.mockSaleList);
    const allSales = await salesServices.getAllSales();
    expect(allSales.status).to.be.equal('OK');
    expect(allSales.data).to.be.an('array');
  });
  it('Recuperando o sales quando se passa um id', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(mockSales.mockSaleId);
    const sale = await salesServices.getSaleById(1);
    expect(sale.status).to.be.equal('OK');
    expect(sale.data).to.be.an('object');
  });
  it('testando se falha quando nao encontra sales', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves([]);
    const allSales = await salesServices.getAllSales();
    expect(allSales.status).to.be.equal('NOT_FOUND');
    expect(allSales.data).to.have.property('message');
  });
  it('testando se falha quando nao encontra um id', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves([]);
    const sale = await salesServices.getSaleById(1);
    expect(sale.status).to.be.equal('NOT_FOUND');
    expect(sale.data).to.be.an('object');
    expect(sale.data.message).to.be.equal('Sale not found');
  });
  it('testando a criação de salesProduct', async function () {
    sinon.stub(productsModel, 'getProductById').resolves([false]);
    sinon.stub(salesModel, 'createSale').resolves(1);
    sinon.stub(salesModel, 'createSaleProduct').resolves();
    sinon.stub(salesServices, 'verifyProductId').resolves([false]);
    const sale = await salesServices.createSaleProduct([]);
    expect(sale.status).to.be.equal('CREATED');
    expect(sale.data).to.be.an('object');
  });
  it('testando a criação de salesProduct com erro', async function () {
    sinon.stub(salesServices, 'verifyProductId').resolves([]);
    const sale = await salesServices.createSaleProduct([]);
    // expect(sale.status).to.be.equal('NOT_FOUND');
    expect(sale.data).to.be.an('object');
    // expect(sale.data.message).to.be.equal('Product not found');
  });
  it('testando a função verifyProductId retorna false', async function () {
    sinon.stub(productsModel, 'getProductById').resolves([{ id: 1 }]);
    const sale = await salesServices.verifyProductId({ productId: 1 });
    expect(sale).to.be.equal(false);
  });
  it('testando a função verifyProductId retorna true', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(undefined);
    const sale = await salesServices.verifyProductId({ productId: 1 });
    expect(sale).to.be.equal(true);
  });
  it('testando a função deleteSale', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves([{ id: 1 }]);
    sinon.stub(salesModel, 'deleteSaleProducts').resolves(1);
    sinon.stub(salesModel, 'deleteSale').resolves(1);
    const sale = await salesServices.deleteSale(1);
    expect(sale.status).to.be.equal('NO_CONTENT');
  });
  it('testando a função delete com erro de nenhuma linha alterada', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves([{ id: 1 }]);
    sinon.stub(salesModel, 'deleteSaleProducts').resolves(0);
    sinon.stub(salesModel, 'deleteSale').resolves(0);
    const sale = await salesServices.deleteSale(1);
    expect(sale.status).to.be.equal('ERROR_SERVIDOR');
    expect(sale.data.message).to.be.equal('ERROR SERVIDOR');
  });
});