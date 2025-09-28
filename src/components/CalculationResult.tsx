import React from 'react'
import { Property, Calculation } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { CheckCircle, Copy, Save } from 'lucide-react'
import { formatDate } from '../lib/utils'

interface CalculationResultProps {
  property: Property
  calculation: Calculation
  onNewCalculation: () => void
  onViewHistory: () => void
}

export function CalculationResult({ 
  property, 
  calculation, 
  onNewCalculation, 
  onViewHistory 
}: CalculationResultProps) {
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

  const copyResult = () => {
    const resultText = `${property.name}: ${formatNumber(calculation.result)} ${calculation.unit}`
    navigator.clipboard.writeText(resultText)
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-semibold">Calculation Complete</h2>
              <p className="text-emerald-100">Your {property.name.toLowerCase()} result is ready</p>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Result</h3>
                <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
                  <CardContent className="p-6 text-center">
                    <div className="space-y-3">
                      <div className="text-4xl font-bold text-emerald-700">
                        {formatNumber(calculation.result)}
                      </div>
                      <Badge variant="success" className="text-base px-3 py-1">
                        {calculation.unit}
                      </Badge>
                      <p className="text-sm text-gray-600 font-medium">
                        {property.name} of the material
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={copyResult}
                  variant="outline"
                  className="flex-1 flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy Result
                </Button>
                <Button 
                  onClick={onViewHistory}
                  variant="outline"
                  className="flex-1 flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  View History
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Calculation Details</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Property</span>
                      <Badge variant="default">{property.name}</Badge>
                    </div>
                    <div className="text-center font-mono text-sm text-gray-600 mb-3">
                      {property.formula}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Input Values Used</h4>
                    {Object.entries(calculation.inputs).map(([key, value], index) => {
                      const input = property.inputs[parseInt(key.split('_')[1])]
                      return (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">
                            {input.symbol} ({input.name})
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {value} {input.unit}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Calculation Info</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Calculated at:</span>
                    <span>{formatDate(calculation.timestamp)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Calculation ID:</span>
                    <span className="font-mono">#{calculation.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center pt-6 border-t">
            <Button onClick={onNewCalculation} size="lg">
              New Calculation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}