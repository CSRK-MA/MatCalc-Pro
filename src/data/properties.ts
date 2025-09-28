import { Property } from '../types'

export const materialProperties: Property[] = [
  {
    id: 'density',
    name: 'Density',
    category: 'material',
    formula: 'ρ = m / V',
    description: 'Mass per unit volume of a material',
    unit: 'kg/m³',
    inputs: [
      { name: 'Mass', symbol: 'm', unit: 'kg', type: 'number', min: 0, step: 0.01 },
      { name: 'Volume', symbol: 'V', unit: 'm³', type: 'number', min: 0, step: 0.001 }
    ],
    example: 'Steel density ≈ 7850 kg/m³'
  },
  {
    id: 'stress',
    name: 'Stress',
    category: 'material',
    formula: 'σ = F / A',
    description: 'Internal force per unit area within materials',
    unit: 'Pa',
    inputs: [
      { name: 'Force', symbol: 'F', unit: 'N', type: 'number', min: 0, step: 0.1 },
      { name: 'Area', symbol: 'A', unit: 'm²', type: 'number', min: 0, step: 0.0001 }
    ],
    example: 'Typical steel yield stress ≈ 250 MPa'
  },
  {
    id: 'strain',
    name: 'Strain',
    category: 'material',
    formula: 'ε = ΔL / L₀',
    description: 'Deformation of a material relative to its original length',
    unit: 'dimensionless',
    inputs: [
      { name: 'Change in Length', symbol: 'ΔL', unit: 'm', type: 'number', step: 0.001 },
      { name: 'Original Length', symbol: 'L₀', unit: 'm', type: 'number', min: 0, step: 0.001 }
    ],
    example: 'Elastic strain typically < 0.005'
  },
  {
    id: 'youngs_modulus',
    name: 'Young\'s Modulus',
    category: 'material',
    formula: 'E = σ / ε',
    description: 'Measure of stiffness of a solid material',
    unit: 'Pa',
    inputs: [
      { name: 'Stress', symbol: 'σ', unit: 'Pa', type: 'number', min: 0, step: 1000 },
      { name: 'Strain', symbol: 'ε', unit: 'dimensionless', type: 'number', min: 0, step: 0.0001 }
    ],
    example: 'Steel E ≈ 200 GPa'
  },
  {
    id: 'pressure',
    name: 'Pressure',
    category: 'material',
    formula: 'P = F / A',
    description: 'Force applied perpendicular to surface per unit area',
    unit: 'Pa',
    inputs: [
      { name: 'Force', symbol: 'F', unit: 'N', type: 'number', min: 0, step: 0.1 },
      { name: 'Area', symbol: 'A', unit: 'm²', type: 'number', min: 0, step: 0.0001 }
    ],
    example: 'Atmospheric pressure ≈ 101,325 Pa'
  },
  {
    id: 'velocity',
    name: 'Velocity',
    category: 'material',
    formula: 'v = d / t',
    description: 'Rate of change of position with respect to time',
    unit: 'm/s',
    inputs: [
      { name: 'Distance', symbol: 'd', unit: 'm', type: 'number', min: 0, step: 0.1 },
      { name: 'Time', symbol: 't', unit: 's', type: 'number', min: 0, step: 0.1 }
    ],
    example: 'Sound in air ≈ 343 m/s'
  }
]

export const concentrationProperties: Property[] = [
  {
    id: 'molarity',
    name: 'Molarity',
    category: 'concentration',
    formula: 'M = n / V',
    description: 'Moles of solute per liter of solution',
    unit: 'mol/L',
    inputs: [
      { name: 'Moles of Solute', symbol: 'n', unit: 'mol', type: 'number', min: 0, step: 0.01 },
      { name: 'Volume of Solution', symbol: 'V', unit: 'L', type: 'number', min: 0, step: 0.1 }
    ],
    example: '1 M NaCl solution'
  },
  {
    id: 'molality',
    name: 'Molality',
    category: 'concentration',
    formula: 'm = n / kg',
    description: 'Moles of solute per kilogram of solvent',
    unit: 'mol/kg',
    inputs: [
      { name: 'Moles of Solute', symbol: 'n', unit: 'mol', type: 'number', min: 0, step: 0.01 },
      { name: 'Mass of Solvent', symbol: 'kg', unit: 'kg', type: 'number', min: 0, step: 0.1 }
    ],
    example: '0.5 m glucose solution'
  },
  {
    id: 'mass_percentage',
    name: 'Mass Percentage',
    category: 'concentration',
    formula: '% = (m_solute / m_solution) × 100',
    description: 'Percentage by mass of solute in solution',
    unit: '%',
    inputs: [
      { name: 'Mass of Solute', symbol: 'm_solute', unit: 'g', type: 'number', min: 0, step: 0.1 },
      { name: 'Mass of Solution', symbol: 'm_solution', unit: 'g', type: 'number', min: 0, step: 0.1 }
    ],
    example: '5% NaCl by mass'
  },
  {
    id: 'ppm',
    name: 'Parts Per Million',
    category: 'concentration',
    formula: 'ppm = (m_solute / m_solution) × 10⁶',
    description: 'Concentration in parts per million by mass',
    unit: 'ppm',
    inputs: [
      { name: 'Mass of Solute', symbol: 'm_solute', unit: 'mg', type: 'number', min: 0, step: 0.1 },
      { name: 'Mass of Solution', symbol: 'm_solution', unit: 'kg', type: 'number', min: 0, step: 0.1 }
    ],
    example: '50 ppm chlorine in water'
  },
  {
    id: 'mole_fraction',
    name: 'Mole Fraction',
    category: 'concentration',
    formula: 'χ = n_component / n_total',
    description: 'Ratio of component moles to total moles',
    unit: 'dimensionless',
    inputs: [
      { name: 'Moles of Component', symbol: 'n_component', unit: 'mol', type: 'number', min: 0, step: 0.01 },
      { name: 'Total Moles', symbol: 'n_total', unit: 'mol', type: 'number', min: 0, step: 0.01 }
    ],
    example: 'Ethanol in water mixture'
  }
]

export const allProperties = [...materialProperties, ...concentrationProperties]