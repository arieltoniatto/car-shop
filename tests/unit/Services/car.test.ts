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
});