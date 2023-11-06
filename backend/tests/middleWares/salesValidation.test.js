const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const { saleValidation } = require('../../src/middlewares');

describe('testando o middleware de sales', function () {
  afterEach(function () { return sinon.restore(); });
  it('testando se a validação passa', function () {
    const mockReq = { body: [{ productId: 1, quantity: 1 }] };
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    saleValidation(mockReq, mockRes, next);
  });
  it('testando se a validação da erro sem o ProductId', function () {
    const mockReq = { body: [{ quantity: 1 }] };
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    saleValidation(mockReq, mockRes, next);
    expect(mockRes.status).to.have.been.calledWith(400);
    expect(mockRes.json).to.have.been.calledWith({ message: '"productId" is required' });
  });
  it('testando se a validação da erro sem o quantity', function () {
    const mockReq = { body: [{ productId: 1 }] };
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    saleValidation(mockReq, mockRes, next);
    expect(mockRes.status).to.have.been.calledWith(400);
    expect(mockRes.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });
});