const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const { validateNameProduct } = require('../../src/middlewares');

describe('testando o middleware de validação do produto', function () {
  it('testando se passa', async function () {
    const mockReq = { body: { name: 'newProduct' } };
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    await validateNameProduct(mockReq, mockRes, next);
    // expect(next).to.have.been.called;
  });
  it('testando se não passa', async function () {
    const mockReq = { body: { name: '' } };
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    await validateNameProduct(mockReq, mockRes, next);
    expect(mockRes.status).to.have.been.calledWith(500);
    expect(mockRes.json).to.have.been.calledWith({ message: '"name" is not allowed to be empty' });
  });
});