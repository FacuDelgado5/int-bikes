import { describe, expect, test, beforeEach } from "vitest";
import { Rental } from "../Rental.ts";
import { RentalList } from "../RentalList.ts";

describe("RentalList", () => {
  let list: RentalList;
  let rental: Rental;
  let rental2: Rental;

  beforeEach(() => {
    list = new RentalList();
    rental = new Rental({
      customer: "Juan Gómez",
      bikeCode: "B-123",
      bikeType: "urban",
      hours: 3,
      pricePerHour: 100,
    });
    rental2 = new Rental({
      customer: "Juan",
      bikeCode: "B-124",
      bikeType: "urban",
      hours: 3,
      pricePerHour: 150,
    });
  });

  test("Create an empty rental list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a rental", () => {
    list.add(rental);
    expect(list.getItems()).toEqual([rental]);
  });

  test("reject a bike that is already rented", () => {
    list.add(rental);
    expect(() => list.add(rental)).toThrow();
  });

  test("filter rentals by type", () => {
    list.add(rental);
    expect(list.getByType("urban")).toEqual([rental]);
    expect(list.getByType("electric")).toEqual([]);
  });

  test("total income", () => {
    list.add(rental);
    expect(list.totalIncome()).toBe(300);
  });

  test("total late fees", () => {
    rental.lateHours = 2;
    list.add(rental);
    expect(list.totalLateFees()).toBe(400);
  });

  test("total late fees without delays", () => {
    list.add(rental);
    expect(list.totalLateFees()).toBe(0);
  });

  test("total late fees with an empty list", () => {
    expect(list.totalLateFees()).toBe(0);
  });

  test("total late fees with two rentals", () => {
    rental.lateHours = 2;
    list.add(rental);
    rental2.lateHours = 3;
    list.add(rental2);
    expect(list.totalLateFees()).toBe(1300);
  });

  test("total late fees with two rentals without delays", () => {
    list.add(rental);
    list.add(rental2);
    expect(list.totalLateFees()).toBe(0);
  });

  test("remove a rental", () => {
    list.add(rental);
    list.remove("B-123");
    expect(list.getItems()).toEqual([]);
  });

  test("reject removing a rental that does not exist", () => {
    expect(() => list.remove("B-999")).toThrow();
  });
});
