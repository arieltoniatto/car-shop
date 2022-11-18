import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleModel';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async findAll() {
    const motorcycleODM = new MotorcycleODM();
    const allMotorcycles = await motorcycleODM.findAll();
    const mapMotorcycles = allMotorcycles.map(
      (motorcycle) => this.createMotorcycleDomain(motorcycle),
    );
    return mapMotorcycles;
  }

  public async findById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const oneMotorcycle = await motorcycleODM.getById(id);

    if (!oneMotorcycle) return null;

    return this.createMotorcycleDomain(oneMotorcycle);
  }
}