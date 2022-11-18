import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;
  private invalidMongoId: string;
  private notFound: string;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
    this.invalidMongoId = 'Invalid mongo id';
    this.notFound = 'Car not found';
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status ? this.req.body.status : false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
    } catch (err) {
      return this.res.status(500).json({ err });
    }
  }

  public async findAll() {
    const allCars = await this.service.findAll();
    return this.res.status(200).json(allCars);
  }

  public async getById() {
    if (!isValidObjectId(this.req.params.id)) {
      return this.res.status(422).json({ message: this.invalidMongoId });
    }
    const result = await this.service.findById(this.req.params.id);
    if (!result) return this.res.status(404).json({ message: this.notFound });
    return this.res.status(200).json(result);
  }

  public async updateById() {
    if (!isValidObjectId(this.req.params.id)) {
      return this.res.status(422).json({ message: this.invalidMongoId });
    }
    const result = await this.service.updateOne(this.req.params.id, this.req.body);
    if (!result) return this.res.status(404).json({ message: this.notFound });
    return this.res.status(200).json(result);
  }

  public async delete() {
    if (!isValidObjectId(this.req.params.id)) {
      return this.res.status(422).json({ message: this.invalidMongoId });
    }
    const result = await this.service.delete(this.req.params.id);
    if (!result) return this.res.status(404).json({ message: this.notFound });
    return this.res.sendStatus(204);
  }
}