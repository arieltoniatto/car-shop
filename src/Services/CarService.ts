import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarModel';

export default class CarService {
  constructor(
    private _carODM = new CarODM(),
  ) {}

  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    const newCar = await this._carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async findAll() {
    const allCars = await this._carODM.findAll();
    const mapCars = allCars.map((car) => this.createCarDomain(car));
    return mapCars;
  }

  public async findById(id: string) {
    const oneCar = await this._carODM.getById(id);

    if (!oneCar) return null;

    return this.createCarDomain(oneCar);
  }

  public async updateOne(id: string, car: ICar) {
    const updatedCar = await this._carODM.update(id, car as ICar);
    if (!updatedCar) return null;

    return this.createCarDomain(updatedCar);
  }

  public async delete(id: string) {
    const result = await this._carODM.delete(id);

    return result;
  }
}