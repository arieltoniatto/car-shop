import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarModel';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async findAll() {
    const carODM = new CarODM();
    const allCars = await carODM.findAll();
    const mapCars = allCars.map((car) => this.createCarDomain(car));
    return mapCars;
  }

  public async findById(id: string) {
    if (!isValidObjectId(id)) return { message: 'Invalid Mongo id' };
    const carODM = new CarODM();
    const oneCar = await carODM.getById(id);

    if (!oneCar) return null;

    return this.createCarDomain(oneCar);
  }
}