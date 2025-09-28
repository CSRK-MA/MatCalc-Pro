import React, { useState } from 'react'
import { Property, Calculation, CalculationFormData } from './types'
import { allProperties, materialProperties, concentrationProperties } from './data/properties'
import { useCalculations } from './hooks/useCalculations'
import { useLocalStorage } from './hooks/useLocalStorage'

import { Navbar } from './components/Navbar'
import { Dashboard } from './components/Dashboard'
import { PropertyCard } from './components/PropertyCard'
import { CalculationForm } from './components/CalculationForm'
import { CalculationResult } from './components/CalculationResult'
import { CalculationHistory } from './components/CalculationHistory'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/Card'
import { Button } from './components/ui/Button'
import { Badge } from './components/ui/Badge'
import { Select } from './components/ui/Select'

import { Wrench, Beaker, Filter } from 'lucide-react'

type View = 'dashboard' | 'calculator' | 'history' | 'form' | 'result'

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [lastCalculation, setLastCalculation] = useState<Calculation | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)
  
  const { calculations, addCalculation, clearCalculations, exportToCSV } = useCalculations()

  const filteredProperties = categoryFilter === 'all' 
    ? allProperties 
    : allProperties.filter(prop => prop.category === categoryFilter)

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property)
    setCurrentView('form')
  }

  const handleCalculate = (inputs: CalculationFormData, result: number) => {
    if (!selectedProperty) return

    const calculation = addCalculation({
      propertyId: selectedProperty.id,
      propertyName: selectedProperty.name,
      inputs,
      result,
      unit: selectedProperty.unit
    })

    setLastCalculation(calculation)
    setCurrentView('result')
  }

  const handleNavigation = (view: string) => {
    setCurrentView(view as View)
    if (view !== 'form' && view !== 'result') {
      setSelectedProperty(null)
      setLastCalculation(null)
    }
  }

  const handleNewCalculation = () => {
    setCurrentView('calculator')
    setSelectedProperty(null)
    setLastCalculation(null)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-blue-50'
    }`}>
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigation}
        calculationCount={calculations.length}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && (
          <Dashboard
            calculations={calculations}
            onNewCalculation={handleNewCalculation}
            onViewHistory={() => setCurrentView('history')}
          />
        )}

        {currentView === 'calculator' && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose a Property</h1>
              <p className="text-gray-600 text-lg">
                Select from our comprehensive collection of material and concentration calculations
              </p>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filter Properties
                  </CardTitle>
                  <Badge variant="secondary">
                    {filteredProperties.length} properties
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-center">
                  <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="material">Material Properties</option>
                    <option value="concentration">Concentration</option>
                  </Select>
                  
                  <div className="flex gap-2">
                    <Button
                      variant={categoryFilter === 'material' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCategoryFilter('material')}
                      className="flex items-center gap-2"
                    >
                      <Wrench className="h-4 w-4" />
                      Material ({materialProperties.length})
                    </Button>
                    <Button
                      variant={categoryFilter === 'concentration' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCategoryFilter('concentration')}
                      className="flex items-center gap-2"
                    >
                      <Beaker className="h-4 w-4" />
                      Concentration ({concentrationProperties.length})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={handlePropertySelect}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'form' && selectedProperty && (
          <CalculationForm
            property={selectedProperty}
            onCalculate={handleCalculate}
            onBack={() => setCurrentView('calculator')}
          />
        )}

        {currentView === 'result' && selectedProperty && lastCalculation && (
          <CalculationResult
            property={selectedProperty}
            calculation={lastCalculation}
            onNewCalculation={handleNewCalculation}
            onViewHistory={() => setCurrentView('history')}
          />
        )}

        {currentView === 'history' && (
          <CalculationHistory
            calculations={calculations}
            onExportCSV={exportToCSV}
            onClearHistory={clearCalculations}
          />
        )}
      </main>
    </div>
  )
}

export default App