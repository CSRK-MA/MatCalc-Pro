import React from 'react'
import { useForm } from 'react-hook-form'
import { Property, CalculationFormData } from '../types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Badge } from './ui/Badge'
import { ArrowLeft, Calculator } from 'lucide-react'

interface CalculationFormProps {
  property: Property
  onCalculate: (inputs: CalculationFormData, result: number) => void
  onBack: () => void
}

export function CalculationForm({ property, onCalculate, onBack }: CalculationFormProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<CalculationFormData>()
  
  const watchedValues = watch()
  
  const calculateResult = (data: CalculationFormData): number => {
    const inputs = Object.values(data)
    
    switch (property.id) {
      case 'density':
        return inputs[0] / inputs[1] // mass / volume
      case 'stress':
      case 'pressure':
        return inputs[0] / inputs[1] // force / area
      case 'strain':
        return inputs[0] / inputs[1] // change in length / original length
      case 'youngs_modulus':
        return inputs[0] / inputs[1] // stress / strain
      case 'velocity':
        return inputs[0] / inputs[1] // distance / time
      case 'molarity':
        return inputs[0] / inputs[1] // moles / volume
      case 'molality':
        return inputs[0] / inputs[1] // moles / mass
      case 'mass_percentage':
        return (inputs[0] / inputs[1]) * 100 // (mass solute / mass solution) * 100
      case 'ppm':
        return (inputs[0] / (inputs[1] * 1000)) * 1000000 // (mg solute / kg solution) * 10^6
      case 'mole_fraction':
        return inputs[0] / inputs[1] // component moles / total moles
      default:
        return 0
    }
  }
  
  const onSubmit = (data: CalculationFormData) => {
    const result = calculateResult(data)
    onCalculate(data, result)
  }
  
  const formatNumber = (value: number): string => {
    if (Math.abs(value) >= 1000000) {
      return (value / 1000000).toFixed(2) + 'M'
    } else if (Math.abs(value) >= 1000) {
      return (value / 1000).toFixed(2) + 'k'
    } else if (Math.abs(value) < 0.01 && value !== 0) {
      return value.toExponential(3)
    } else {
      return value.toFixed(4)
    }
  }
  
  const previewResult = () => {
    const allFieldsFilled = property.inputs.every((_, index) => {
      const fieldName = `input_${index}`
      return watchedValues[fieldName] && !isNaN(Number(watchedValues[fieldName]))
    })
    
    if (allFieldsFilled) {
      const result = calculateResult(watchedValues)
      return formatNumber(result)
    }
    return '---'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Properties
        </Button>
      </div>
      
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center gap-3">
            <Calculator className="h-6 w-6" />
            <div>
              <h2 className="text-xl font-semibold">{property.name} Calculator</h2>
              <p className="text-blue-100 text-sm">{property.description}</p>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Formula</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-lg text-center text-gray-700">
                  {property.formula}
                </div>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h3 className="font-medium text-gray-900">Input Values</h3>
                
                {property.inputs.map((input, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {input.name} ({input.symbol})
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        step={input.step || "any"}
                        min={input.min}
                        max={input.max}
                        placeholder={`Enter ${input.name.toLowerCase()}`}
                        {...register(`input_${index}` as keyof CalculationFormData, {
                          required: `${input.name} is required`,
                          valueAsNumber: true,
                          min: input.min ? { value: input.min, message: `Must be at least ${input.min}` } : undefined,
                          max: input.max ? { value: input.max, message: `Must be at most ${input.max}` } : undefined
                        })}
                        className={errors[`input_${index}` as keyof CalculationFormData] ? 'border-red-500' : ''}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Badge variant="secondary" className="text-xs">
                          {input.unit}
                        </Badge>
                      </div>
                    </div>
                    {errors[`input_${index}` as keyof CalculationFormData] && (
                      <p className="text-sm text-red-600">
                        {errors[`input_${index}` as keyof CalculationFormData]?.message}
                      </p>
                    )}
                  </div>
                ))}
                
                <Button type="submit" className="w-full" size="lg">
                  Calculate Result
                </Button>
              </form>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Live Preview</h3>
                <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
                  <CardContent className="p-6 text-center">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Result</p>
                      <div className="text-3xl font-bold text-emerald-700">
                        {previewResult()}
                      </div>
                      <Badge variant="success" className="text-sm">
                        {property.unit}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Input Summary</h3>
                <div className="space-y-2">
                  {property.inputs.map((input, index) => {
                    const value = watchedValues[`input_${index}`]
                    return (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">
                          {input.symbol} ({input.name})
                        </span>
                        <span className="text-sm text-gray-900">
                          {value ? `${value} ${input.unit}` : '—'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              {property.example && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Example</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">{property.example}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}