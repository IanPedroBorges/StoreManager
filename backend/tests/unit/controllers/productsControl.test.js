const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productControl } = require('../../../src/controllers');

describe('Testa o controller de produtos', function () {
  afterEach(function () { return sinon.restore(); });
  it('Recuperando todos os produtos', async function () {
    const mockReq = {};
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(productsService, 'getAllProducts').resolves({ status: 'OK', data: [] });
    await productControl.getAllProducts(mockReq, mockRes);
    expect(mockRes.status).to.be.calledWith(200);
  });
  it('Recuperando um produto pelo id', async function () {
    const mockReq = { params: { id: 1 } };
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    sinon.stub(productsService, 'getProductById').resolves({ status: 'OK', data: {} });
    await productControl.getProductById(mockReq, mockRes);
    expect(mockRes.status).to.be.calledWith(200);
  });
  it('testando se falha quando deve falhar', async function () {
    const mockReq = {};
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    sinon.stub(productsService, 'getAllProducts').resolves({ status: 'ERRO_SERVIDOR', data: {} });
    await productControl.getAllProducts(mockReq, mockRes);
    expect(mockRes.status).to.be.calledWith(500);
  });
  it('testando se o novo produto é criado', async function () {
    const mockReq = {
      body: {
        name: 'newProduct',
      },
    };
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    sinon.stub(productsService, 'postProduct').resolves({ status: 'CREATED', data: {} });
    await productControl.postProduct(mockReq, mockRes);
    expect(mockRes.status).to.be.calledWith(201);
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
    sinon.stub(productsService, 'updateProduct').resolves({ status: 'OK', data: {} });
    await productControl.updateProduct(mockReq, mockRes);
    expect(mockRes.status).to.be.calledWith(200);
  });
  it('testando a função delete', async function () {
    const mockReq = {
      params: {
        id: 1,
      },
    };
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    sinon.stub(productsService, 'deleteProduct').resolves({ status: 'NO_CONTENT', data: {} });
    await productControl.deleteProduct(mockReq, mockRes);
    expect(mockRes.status).to.be.calledWith(204);
  });
  it('testando a função getProductsByName', async function () {
    const mockReq = {
      query: {
        q: 'newProduct',
      },
    };
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    sinon.stub(productsService, 'getProductsByName').resolves({ status: 'OK', data: {} });
    await productControl.getProductsByName(mockReq, mockRes);
    expect(mockRes.status).to.be.calledWith(200);
  });
});