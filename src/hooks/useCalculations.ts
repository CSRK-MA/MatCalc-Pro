import { useState } from 'react'
import { Calculation } from '../types'
import { useLocalStorage } from './useLocalStorage'

export function useCalculations() {
  const [calculations, setCalculations] = useLocalStorage<Calculation[]>('calculations', [])

  const addCalculation = (calculation: Omit<Calculation, 'id' | 'timestamp'>) => {
    const newCalculation: Calculation = {
      ...calculation,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    setCalculations(prev => [newCalculation, ...prev])
    return newCalculation
  }

  const clearCalculations = () => {
    setCalculations([])
  }

  const exportToCSV = () => {
    if (calculations.length === 0) return

    const headers = ['Property', 'Inputs', 'Result', 'Unit', 'Timestamp']
    const rows = calculations.map(calc => [
      calc.propertyName,
      Object.entries(calc.inputs).map(([key, value]) => `${key}: ${value}`).join('; '),
      calc.result.toString(),
      calc.unit,
      calc.timestamp.toISOString()
    ])

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `material-calculations-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    calculations,
    addCalculation,
    clearCalculations,
    exportToCSV
  }
}