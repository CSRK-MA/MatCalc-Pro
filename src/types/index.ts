export interface Property {
  id: string
  name: string
  category: 'material' | 'concentration'
  formula: string
  description: string
  inputs: PropertyInput[]
  unit: string
  example?: string
}

export interface PropertyInput {
  name: string
  symbol: string
  unit: string
  type: 'number'
  min?: number
  max?: number
  step?: number
}

export interface Calculation {
  id: string
  propertyId: string
  propertyName: string
  inputs: Record<string, number>
  result: number
  unit: string
  timestamp: Date
}

export interface CalculationFormData {
  [key: string]: number
}