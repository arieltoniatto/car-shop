import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleModel';

export default class MotorcycleService {
  constructor(
    private _motorcycleODM = new MotorcycleODM(),
  ) {}

  private createMotorcycleDomain(motorcycle: IMotorcycle): Motorcycle {
    return new Motorcycle(motorcycle);
  }

  public async create(motorcycle: IMotorcycle) {
    const newMotorcycle = await this._motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async findAll() {
    const allMotorcycles = await this._motorcycleODM.findAll();
    const mapMotorcycles = allMotorcycles.map(
      (motorcycle) => this.createMotorcycleDomain(motorcycle),
    );
    return mapMotorcycles;
  }

  public async findById(id: string) {
    const oneMotorcycle = await this._motorcycleODM.getById(id);

    if (!oneMotorcycle) return null;

    return this.createMotorcycleDomain(oneMotorcycle);
  }

  public async updateOne(id: string, car: IMotorcycle) {
    const updatedMotorcycle = await this._motorcycleODM.update(id, car as IMotorcycle);
    if (!updatedMotorcycle) return null;

    return this.createMotorcycleDomain(updatedMotorcycle);
  }

  public async delete(id: string) {
    const result = await this._motorcycleODM.delete(id);

    return result;
  }
}