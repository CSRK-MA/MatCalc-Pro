# Material Property Calculator

A modern, web-based cross-platform application built with React and TypeScript for calculating material properties and chemical concentrations. Features a professional interface with real-time calculations, comprehensive history tracking, and data visualization.

![Material Property Calculator](https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🚀 Features

### Core Functionality
- **Material Properties Calculator**: Density, Stress, Strain, Young's Modulus, Pressure, Velocity
- **Concentration Calculator**: Molarity, Molality, Mass Percentage, Parts Per Million, Mole Fraction
- **Dynamic Form Generation**: Forms automatically generated based on selected property requirements
- **Real-time Calculation Preview**: See results update as you type
- **Input Validation**: Comprehensive validation with proper error handling

### User Interface
- **Modern Design**: Clean, professional interface with gradient backgrounds and glass-morphism effects
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Interactive Components**: Smooth animations and micro-interactions throughout
- **Accessibility**: WCAG compliant with proper contrast ratios and keyboard navigation

### Data Management
- **Calculation History**: Track all calculations with timestamps and detailed inputs
- **Search & Filter**: Find specific calculations by property type or date
- **Export Functionality**: Download calculation history as CSV files
- **Local Storage**: Persistent data storage in browser

### Analytics & Visualization
- **Usage Statistics**: View calculation counts and property usage trends
- **Interactive Charts**: Bar charts and pie charts showing calculation patterns
- **Dashboard Overview**: Quick access to recent calculations and statistics

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom component library with shadcn/ui patterns
- **Forms**: React Hook Form with Yup validation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/material-property-calculator.git
   cd material-property-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🎯 Usage

### Getting Started

1. **Dashboard**: Start from the main dashboard to see an overview of your calculations
2. **Choose Property**: Select from material properties or concentration calculations
3. **Enter Values**: Fill in the required inputs with proper units
4. **Calculate**: Get instant results with detailed breakdowns
5. **Save & Track**: All calculations are automatically saved to your history

### Supported Calculations

#### Material Properties
- **Density** (ρ = m/V): Mass per unit volume
- **Stress** (σ = F/A): Internal force per unit area
- **Strain** (ε = ΔL/L₀): Deformation relative to original length
- **Young's Modulus** (E = σ/ε): Measure of material stiffness
- **Pressure** (P = F/A): Force per unit area
- **Velocity** (v = d/t): Rate of change of position

#### Concentration Calculations
- **Molarity** (M = n/V): Moles of solute per liter of solution
- **Molality** (m = n/kg): Moles of solute per kilogram of solvent
- **Mass Percentage** (% = (m_solute/m_solution) × 100): Percentage by mass
- **Parts Per Million** (ppm): Concentration in parts per million
- **Mole Fraction** (χ = n_component/n_total): Ratio of component moles to total moles

### Example Calculation

**Calculating Steel Density:**
1. Navigate to "Calculate" → Select "Density"
2. Enter Mass: `785` kg
3. Enter Volume: `0.1` m³
4. Result: `7,850 kg/m³` (typical steel density)

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── Dashboard.tsx    # Main dashboard component
│   ├── PropertyCard.tsx # Property selection cards
│   ├── CalculationForm.tsx # Dynamic calculation forms
│   ├── CalculationResult.tsx # Result display
│   └── CalculationHistory.tsx # History management
├── data/                # Static data and configurations
│   └── properties.ts    # Property definitions and formulas
├── hooks/               # Custom React hooks
│   ├── useCalculations.ts # Calculation management
│   └── useLocalStorage.ts # Local storage utilities
├── lib/                 # Utility functions
│   └── utils.ts         # Helper functions
├── types/               # TypeScript type definitions
│   └── index.ts         # Application types
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6) - Main actions and highlights
- **Secondary**: Emerald (#10B981) - Success states and positive actions
- **Accent**: Amber (#F59E0B) - Warnings and attention-grabbing elements
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Bold, clear hierarchy with proper spacing
- **Body Text**: Readable font sizes with 150% line height
- **Code/Formulas**: Monospace font for technical content

### Spacing
- **8px Grid System**: Consistent spacing throughout the application
- **Responsive Breakpoints**: Mobile-first approach with proper scaling

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for any environment-specific configurations:

```env
VITE_APP_NAME=Material Property Calculator
VITE_APP_VERSION=1.0.0
```

### Customization
- **Properties**: Add new material properties in `src/data/properties.ts`
- **Styling**: Modify the design system in `tailwind.config.js`
- **Components**: Extend UI components in `src/components/ui/`

## 📊 Features in Detail

### Dynamic Form Generation
Forms are automatically generated based on property definitions, ensuring consistency and reducing code duplication.

### Real-time Validation
Input validation provides immediate feedback with clear error messages and visual indicators.

### Responsive Design
The application adapts seamlessly to different screen sizes with optimized layouts for mobile, tablet, and desktop.

### Data Persistence
All calculations are stored locally in the browser, providing a persistent experience across sessions.

### Export Capabilities
Users can export their calculation history as CSV files for further analysis or record-keeping.

## 🚀 Performance

- **Fast Loading**: Optimized bundle size with code splitting
- **Smooth Animations**: 60fps animations with hardware acceleration
- **Efficient Rendering**: React optimizations for smooth user experience
- **Responsive Images**: Optimized images from Pexels CDN

## 🔒 Security

- **Input Sanitization**: All user inputs are validated and sanitized
- **XSS Protection**: Proper escaping of user-generated content
- **Safe Calculations**: Formula evaluation with proper error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting
- Write descriptive commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern material design principles
- **Icons**: Lucide React icon library
- **Images**: Pexels for high-quality stock photography
- **Charts**: Recharts for beautiful data visualization
- **UI Components**: Inspired by shadcn/ui design patterns

## 📞 Support

For support, questions, or feature requests:
- Create an issue on GitHub
- Contact the development team
- Check the documentation for common solutions

## 🗺️ Roadmap

### Upcoming Features
- [ ] User authentication and profiles
- [ ] Cloud data synchronization
- [ ] Advanced formula editor
- [ ] PDF export functionality
- [ ] Mobile app (React Native)
- [ ] API integration for material databases
- [ ] Collaborative calculations
- [ ] Advanced analytics dashboard

### Version History
- **v1.0.0**: Initial release with core functionality
- **v1.1.0**: Enhanced UI and additional properties (planned)
- **v2.0.0**: Backend integration and user accounts (planned)

---

**Built with ❤️ using React and TypeScript**

*Professional material property calculations made simple and accessible.*
