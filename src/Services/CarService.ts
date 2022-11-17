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
    const carODM = new CarODM();
    const oneCar = await carODM.getById(id);

    if (!oneCar) return null;

    return this.createCarDomain(oneCar);
  }

  public async updateOne(id: string, car: ICar) {
    const carODM = new CarODM();
    const updatedCar = await carODM.update(id, car as ICar);
    if (!updatedCar) return null;

    return this.createCarDomain(updatedCar);
  }
}