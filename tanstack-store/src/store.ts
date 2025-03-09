import { Store } from "@tanstack/react-store";

export type Animal = "dogs" | "cats";

export const countStore = new Store(0);
export const animalsStore = new Store({ dogs: 0, cats: 0 });
