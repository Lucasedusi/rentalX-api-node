import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able create a new car", async () => {
    await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      licence_plate: "321ABC",
      fine_amount: 60,
      brand: "Branda",
      category_id: "category",
    });
  });

  it("Should not be able to create a car with exists licence plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "Description Car",
        daily_rate: 100,
        licence_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Branda",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Car2",
        description: "Description Car",
        daily_rate: 100,
        licence_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Branda",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
