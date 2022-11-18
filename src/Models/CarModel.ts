import { Schema, UpdateQuery } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

export default class CarODM extends AbstractODM<ICar> {
  constructor() {
    super(new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    }), 'Cars');
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async findAll(): Promise<ICar[]> {
    return this.model.find({});
  }

  public async getById(id: string): Promise<ICar | null> {
    return this.model.findById({ _id: id });
  }

  public async update(id: string, car: ICar): Promise<ICar | null> {
    return this.model.findByIdAndUpdate(
      { _id: id },
      { ...car } as UpdateQuery<ICar>,
      { new: true },
    );
  }

  public async delete(id: string): Promise<ICar | null> {
    return this.model.findByIdAndDelete(id);
  }
}