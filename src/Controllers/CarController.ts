import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
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
    const result = await this.service.findById(this.req.params.id);
    if (!result) return this.res.status(404).json({ message: 'Car not found' });
    if (!isValidObjectId(this.req.params.id)) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
    return this.res.status(200).json(result);
  }
}