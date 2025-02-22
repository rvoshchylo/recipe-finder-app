import { Ingredient } from './Ingradient';

export interface Equipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface StepLength {
  number: number;
  unit: string;
}

export interface InstructionStep {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
  length?: StepLength;
}