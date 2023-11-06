const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesServices } = require('../../../src/services');
const { salesControl } = require('../../../src/controllers');

describe('testando o Controller Sales', function () {
  afterEach(function () { return sinon.restore(); });
  it('Recuperando todos os sales', async function () {
    const mockReq = {};
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    sinon.stub(salesServices, 'getAllSales').resolves({ status: 'OK', data: [] });
    await salesControl.getAllSales(mockReq, mockRes);
    expect(mockRes.status).to.be.calledWith(200);
  });
  it('Recuperando um sale por id', async function () {
    const mockReq = { params: { id: 1 } };
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // const next = sinon.stub()
    // expect(next).to.be.called()
    sinon.stub(salesServices, 'getSaleById').resolves({ status: 'OK', data: {} });
    await salesControl.getSaleById(mockReq, mockRes);
    expect(mockRes.status).to.be.calledWith(200);
  });
  it('Testando se falha o control sales', async function () {
    const mockReq = {
      params: { id: 1 },
    };
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    sinon.stub(salesServices, 'getSaleById').resolves({ status: 'NOT_FOUND', data: {} });
    await salesControl.getSaleById(mockReq, mockRes);
    expect(mockRes.status).to.be.calledWith(404);
  });
  it('testando a criação de salesProduct', async function () {
    const mockReq = { body: [] };
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    sinon.stub(salesServices, 'createSaleProduct').resolves({ status: 'CREATED', data: {} });
    await salesControl.createSale(mockReq, mockRes);
    expect(mockRes.status).to.be.calledWith(201);
  });
  it('testando o deleteSales', async function () {
    const mockReq = { params: { id: 1 } };
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    sinon.stub(salesServices, 'deleteSale').resolves({ status: 'OK', data: {} });
    await salesControl.deleteSale(mockReq, mockRes);
    expect(mockRes.status).to.be.calledWith(200);
  });
  it('testando a função update', async function () {
    const mockReq = {
      body: {
        name: 'newProduct',
      },
      params: {
        id: 1,
      },
    };
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    sinon.stub(salesServices, 'updateSale').resolves({ status: 'OK', data: {} });
    await salesControl.updateSale(mockReq, mockRes);
    expect(mockRes.status).to.be.calledWith(200);
  });
});