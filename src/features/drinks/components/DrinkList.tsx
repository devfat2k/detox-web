import React from "react";
import type { Drink } from "@/data/drinks";
import { DrinkCatalog } from "./DrinkCatalog";

export interface DrinkListProps {
  drinks: readonly Drink[];
}

export function DrinkList({}: DrinkListProps) {
  return <DrinkCatalog />;
}
