import React from 'react'
import { Property } from '../types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Calculator, Info } from 'lucide-react'

interface PropertyCardProps {
  property: Property
  onSelect: (property: Property) => void
}

export function PropertyCard({ property, onSelect }: PropertyCardProps) {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
              {property.name}
            </CardTitle>
            <Badge variant={property.category === 'material' ? 'default' : 'success'}>
              {property.category === 'material' ? 'Material' : 'Concentration'}
            </Badge>
          </div>
          <Calculator className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <CardDescription className="text-sm leading-relaxed">
            {property.description}
          </CardDescription>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Formula</span>
            <Info className="h-3 w-3 text-gray-400" />
          </div>
          <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm text-gray-700">
            {property.formula}
          </div>
        </div>
        
        <div className="space-y-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Required Inputs ({property.inputs.length})
          </span>
          <div className="flex flex-wrap gap-1">
            {property.inputs.map((input, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {input.symbol} ({input.unit})
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="pt-2">
          <Button 
            onClick={() => onSelect(property)}
            className="w-full group-hover:bg-blue-700 transition-colors"
          >
            Calculate {property.name}
          </Button>
        </div>
        
        {property.example && (
          <div className="text-xs text-gray-500 italic">
            Example: {property.example}
          </div>
        )}
      </CardContent>
    </Card>
  )
}