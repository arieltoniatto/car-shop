import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { describe } from 'mocha';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

const motorcycleOutput = {
  id: '507f1f77bcf86cd799439011',
  model: 'Honda CG Titan 125',
  year: 1983,
  color: 'Red',
  buyValue: 1000,
  category: 'Street',
  engineCapacity: 125,
};

const motorcycleDomain = new Motorcycle(motorcycleOutput as IMotorcycle);

const motorcycleInput = {
  model: 'Honda CG Titan 125',
  year: 1983,
  color: 'Red',
  buyValue: 1000,
  category: 'Street',
  engineCapacity: 125,
};

describe('', () => {
  afterEach(function () { sinon.restore(); });

  const service = new MotorcycleService();

  it('Verify if its possible to register a car', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const result = await service.create(motorcycleInput as IMotorcycle);

    expect(result).to.be.deep.equal(motorcycleDomain);
  });

  it('Verify if its possibile to find all cars', async function () {
    sinon.stub(Model, 'find').resolves([motorcycleOutput, motorcycleOutput]);

    const result = await service.findAll();

    expect(result).to.be.deep.equal([motorcycleDomain, motorcycleDomain]);
  });

  it('Verify if its possibile to find a cars by id', async function () {
    sinon.stub(Model, 'findById').resolves(motorcycleOutput);

    const result = await service.findById('507f1f77bcf86cd799439011');

    expect(result).to.be.deep.equal(motorcycleDomain);
  });

  it('Verify if its not possibile to find a car with an inexistent id', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const result = await service.findById('507f1f77bcf86cd799439012');

    expect(result).to.be.deep.equal(null);
  });

  it('Verify if its possibile to update a car by id', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);

    const result = await service
      .updateOne('507f1f77bcf86cd799439011', motorcycleInput as IMotorcycle);

    expect(result).to.be.deep.equal(motorcycleDomain);
  });

  it('Verify if its NOT possibile to update a car with an inexistent id', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    const result = await service
      .updateOne('507f1f77bcf86cd799439012', motorcycleInput as IMotorcycle);

    expect(result).to.be.deep.equal(null);
  });

  it('Verify if its possibile to delete a car by id', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves({});

    const result = await service.delete('507f1f77bcf86cd799439011');

    expect(result).to.be.deep.equal({});
  });
});