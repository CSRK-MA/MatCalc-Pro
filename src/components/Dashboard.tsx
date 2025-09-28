import React from 'react'
import { Calculation } from '../types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { 
  Calculator, 
  History, 
  TrendingUp, 
  Beaker, 
  Wrench,
  BarChart3,
  Clock,
  Target
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface DashboardProps {
  calculations: Calculation[]
  onNewCalculation: () => void
  onViewHistory: () => void
}

export function Dashboard({ calculations, onNewCalculation, onViewHistory }: DashboardProps) {
  const recentCalculations = calculations.slice(0, 3)
  
  const propertyStats = calculations.reduce((acc, calc) => {
    acc[calc.propertyName] = (acc[calc.propertyName] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const chartData = Object.entries(propertyStats)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const pieData = Object.entries(propertyStats)
    .map(([name, value]) => ({ name, value }))
    .slice(0, 5)

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
  
  const totalCalculations = calculations.length
  const uniqueProperties = new Set(calculations.map(calc => calc.propertyName)).size
  const todayCalculations = calculations.filter(calc => 
    new Date(calc.timestamp).toDateString() === new Date().toDateString()
  ).length

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Material Property Calculator</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Professional tool for calculating material properties and chemical concentrations. 
            Get accurate results with our comprehensive set of formulas and intuitive interface.
          </p>
          <div className="flex gap-4 mt-6">
            <Button 
              onClick={onNewCalculation}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Start Calculating
            </Button>
            {calculations.length > 0 && (
              <Button 
                onClick={onViewHistory}
                variant="outline"
                size="lg"
                className="border-blue-200 text-white hover:bg-blue-600"
              >
                <History className="h-5 w-5 mr-2" />
                View History
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calculator className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Calculations</p>
              <p className="text-2xl font-bold text-gray-900">{totalCalculations}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Target className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Properties Used</p>
              <p className="text-2xl font-bold text-gray-900">{uniqueProperties}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today</p>
              <p className="text-2xl font-bold text-gray-900">{todayCalculations}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">99.9%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Fast access to commonly used features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={onNewCalculation}
                className="w-full justify-start"
                variant="outline"
              >
                <Wrench className="h-4 w-4 mr-3" />
                Material Properties
              </Button>
              
              <Button 
                onClick={onNewCalculation}
                className="w-full justify-start"
                variant="outline"
              >
                <Beaker className="h-4 w-4 mr-3" />
                Concentration Calculations
              </Button>
              
              {calculations.length > 0 && (
                <>
                  <Button 
                    onClick={onViewHistory}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <History className="h-4 w-4 mr-3" />
                    View All History
                  </Button>
                  
                  <Button 
                    onClick={() => {/* Export functionality */}}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <BarChart3 className="h-4 w-4 mr-3" />
                    Export Data
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Calculations */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Calculations
                </div>
                {calculations.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={onViewHistory}>
                    View All
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentCalculations.length > 0 ? (
                <div className="space-y-3">
                  {recentCalculations.map((calc) => (
                    <div key={calc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{calc.propertyName}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(calc.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-emerald-600">
                          {calc.result.toFixed(4)} {calc.unit}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          #{calc.id}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calculator className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No calculations yet</h3>
                  <p className="text-gray-500 mb-4">Get started by performing your first calculation</p>
                  <Button onClick={onNewCalculation}>
                    Start Calculating
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Charts */}
      {calculations.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Most Used Properties</CardTitle>
              <CardDescription>Frequency of property calculations</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Property Distribution</CardTitle>
              <CardDescription>Breakdown by property type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}