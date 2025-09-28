import React from 'react'
import { Button } from './ui/Button'
import { Calculator, Home, History, Settings, Sun, Moon } from 'lucide-react'
import { Badge } from './ui/Badge'

interface NavbarProps {
  currentView: string
  onNavigate: (view: string) => void
  calculationCount: number
  darkMode: boolean
  onToggleDarkMode: () => void
}

export function Navbar({ 
  currentView, 
  onNavigate, 
  calculationCount,
  darkMode,
  onToggleDarkMode 
}: NavbarProps) {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MatCalc Pro</h1>
                <p className="text-xs text-gray-500">Material Property Calculator</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
            
            <Button
              variant={currentView === 'calculator' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('calculator')}
              className="flex items-center gap-2"
            >
              <Calculator className="h-4 w-4" />
              Calculate
            </Button>
            
            <Button
              variant={currentView === 'history' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('history')}
              className="flex items-center gap-2"
            >
              <History className="h-4 w-4" />
              History
              {calculationCount > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {calculationCount}
                </Badge>
              )}
            </Button>
            
            <div className="h-4 w-px bg-gray-300" />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleDarkMode}
              className="flex items-center gap-2"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}