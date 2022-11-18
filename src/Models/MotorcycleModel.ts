import { Schema, UpdateQuery } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

export default class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    super(new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    }), 'Motorcycle');
  }

  public async create(motorcycle: IMotorcycle): Promise<IMotorcycle> {
    return this.model.create({ ...motorcycle });
  }

  public async findAll(): Promise<IMotorcycle[]> {
    return this.model.find({});
  }

  public async getById(id: string): Promise<IMotorcycle | null> {
    return this.model.findById({ _id: id });
  }

  public async update(id: string, motorcycle: IMotorcycle): Promise<IMotorcycle | null> {
    return this.model.findByIdAndUpdate(
      { _id: id },
      { ...motorcycle } as UpdateQuery<IMotorcycle>,
      { new: true },
    );
  }

  public async delete(id: string): Promise<IMotorcycle | null> {
    return this.model.findByIdAndDelete(id);
  }
}