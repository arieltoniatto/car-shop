import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { describe } from 'mocha';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

const carOutput = {
  id: '507f1f77bcf86cd799439011',
  model: 'Fusca',
  year: 1969,
  color: 'Blue',
  buyValue: 25000,
  doorsQty: 2,
  seatsQty: 2,
};

const carDomain = new Car(carOutput);

const carInput = {
  model: 'Fusca',
  year: 1969,
  color: 'Blue',
  buyValue: 25000,
  doorsQty: 2,
  seatsQty: 2,
};

describe('', () => {
  afterEach(function () { sinon.restore(); });

  const service = new CarService();

  it('Verify if its possible to register a car', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const result = await service.create(carInput);

    expect(result).to.be.deep.equal(carDomain);
  });

  it('Verify if its possibile to find all cars', async function () {
    sinon.stub(Model, 'find').resolves([carOutput, carOutput]);

    const result = await service.findAll();

    expect(result).to.be.deep.equal([carDomain, carDomain]);
  });

  it('Verify if its possibile to find a cars by id', async function () {
    sinon.stub(Model, 'findById').resolves(carOutput);

    const result = await service.findById('507f1f77bcf86cd799439011');

    expect(result).to.be.deep.equal(carDomain);
  });

  it('Verify if its not possibile to find a car with an inexistent id', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const result = await service.findById('507f1f77bcf86cd799439012');

    expect(result).to.be.deep.equal(null);
  });

  it('Verify if its possibile to update a car by id', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);

    const result = await service.updateOne('507f1f77bcf86cd799439011', carInput);

    expect(result).to.be.deep.equal(carDomain);
  });

  it('Verify if its NOT possibile to update a car with an inexistent id', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    const result = await service.updateOne('507f1f77bcf86cd799439012', carInput);

    expect(result).to.be.deep.equal(null);
  });

  it('Verify if its possibile to delete a car by id', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves({});

    const result = await service.delete('507f1f77bcf86cd799439011');

    expect(result).to.be.deep.equal({});
  });
});