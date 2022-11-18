import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;
  private invalidMongoId: string;
  private notFound: string;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
    this.invalidMongoId = 'Invalid mongo id';
    this.notFound = 'Motorcycle not found';
  }

  public async create() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status ? this.req.body.status : false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.create(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (err) {
      return this.res.status(500).json({ err });
    }
  }

  public async findAll() {
    const allMotorcycles = await this.service.findAll();

    return this.res.status(200).json(allMotorcycles);
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