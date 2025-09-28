import React, { useState } from 'react'
import { Calculation } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { Select } from './ui/Select'
import { Input } from './ui/Input'
import { History, Download, Search, Filter, Trash2 } from 'lucide-react'
import { formatDate } from '../lib/utils'

interface CalculationHistoryProps {
  calculations: Calculation[]
  onExportCSV: () => void
  onClearHistory: () => void
}

export function CalculationHistory({ calculations, onExportCSV, onClearHistory }: CalculationHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProperty, setSelectedProperty] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  
  const uniqueProperties = Array.from(new Set(calculations.map(calc => calc.propertyName)))
  
  const filteredCalculations = calculations
    .filter(calc => {
      const matchesSearch = calc.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesProperty = selectedProperty === '' || calc.propertyName === selectedProperty
      return matchesSearch && matchesProperty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        case 'oldest':
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        case 'property':
          return a.propertyName.localeCompare(b.propertyName)
        default:
          return 0
      }
    })

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="h-5 w-5 text-blue-600" />
              <CardTitle>Calculation History</CardTitle>
              <Badge variant="secondary">{calculations.length} calculations</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={onExportCSV}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                disabled={calculations.length === 0}
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button
                onClick={onClearHistory}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
                disabled={calculations.length === 0}
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search calculations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  placeholder="All Properties"
                >
                  <option value="">All Properties</option>
                  {uniqueProperties.map(property => (
                    <option key={property} value={property}>{property}</option>
                  ))}
                </Select>
                
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="property">By Property</option>
                </Select>
              </div>
            </div>
            
            {filteredCalculations.length === 0 ? (
              <div className="text-center py-12">
                <History className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {calculations.length === 0 ? 'No calculations yet' : 'No matching calculations'}
                </h3>
                <p className="text-gray-500">
                  {calculations.length === 0 
                    ? 'Start by performing your first calculation'
                    : 'Try adjusting your search or filter criteria'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCalculations.map((calculation) => (
                  <Card key={calculation.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="grid md:grid-cols-4 gap-4 items-center">
                        <div>
                          <h4 className="font-medium text-gray-900">{calculation.propertyName}</h4>
                          <p className="text-sm text-gray-500">#{calculation.id}</p>
                        </div>
                        
                        <div>
                          <div className="text-lg font-semibold text-emerald-700">
                            {formatNumber(calculation.result)} {calculation.unit}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-600">
                            {Object.entries(calculation.inputs).map(([key, value], index) => (
                              <div key={index}>
                                Input {index + 1}: {value}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            {formatDate(calculation.timestamp)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}