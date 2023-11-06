const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { mockSaleList, mockSaleId } = require('../../models/mocks/mockSalesList');

describe('testando a model de sales', function () {
  afterEach(function () { return sinon.restore(); });
  it('Recuperando todas as Sales', async function () {
    sinon.stub(connection, 'execute').resolves([mockSaleList]);
    const allSales = await salesModel.getAllSales();
    expect(allSales).to.be.an('array');
    expect(allSales[0]).to.be.an('object');
    expect(allSales[0]).to.have.property('saleId');
    expect(allSales[0]).to.have.property('date');
    expect(allSales[0].saleId).to.be.a('number');
    expect(allSales[0].date).to.be.a('string');
  });
  it('Recuperando a Sales com a id', async function () {
    sinon.stub(connection, 'execute').resolves([[mockSaleId]]);
    const sale = await salesModel.getSalesById(1);
    expect(sale).to.be.an('array');
  });
  it('testando a criação de salesProduct', async function () {
    const exec = sinon.stub(connection, 'execute');
    await salesModel.createSaleProduct([]);
    expect(exec.called);
  });
  it('testando a criação de sales', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const sale = await salesModel.createSale();
    expect(sale).to.be.a('number');
  });
  it('testando a função deleteSale', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const sale = await salesModel.deleteSale(1);
    expect(sale).to.be.a('number');
    expect(sale).to.be.equal(1);
  });
  it('testando a função deleteSaleProduct', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const sale = await salesModel.deleteSaleProducts(1);
    expect(sale).to.be.a('number');
    expect(sale).to.be.equal(1);
  });
  it('testando a função updateSale', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const sale = await salesModel.updateSale(1);
    expect(sale).to.be.a('number');
    expect(sale).to.be.equal(1);
  });
});