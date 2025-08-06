# Hensis - Hazard Analysis & Risk Management System

A comprehensive React Native application for conducting Hazard Identification (HAZID) and Hazard & Operability (HAZOP) studies with advanced AI-powered features.

## 🚀 Features

### Core Functionality
- **HAZID Analysis**: Complete hazard identification workflow with risk assessment matrix
- **HAZOP Analysis**: Detailed hazard and operability studies with guide words and parameters
- **Project Management**: Hierarchical project structure (Customer → Projects → Nodes/Systems)
- **Risk Assessment**: Configurable 5x5 risk matrix with impact levels A-E and probability ratings 1-5
- **Inventory Management**: Pre-populated dropdowns with custom entry capability

### AI-Powered Features
- **Text Polishing**: Automatically improve grammar and clarity of user inputs
- **Speech-to-Text**: Voice input for efficient data entry
- **Adaptive Learning**: AI learns from corrections (70-90% accuracy improvement)
- **Smart Analysis**: Intelligent expansion of abbreviated inputs

### Client Customization
- **Multi-tenancy**: Support for multiple clients with different configurations
- **Custom Risk Matrices**: Configurable matrix sizes (5x5, 5x4, 4x4, 6x6)
- **Industry Standards**: Pre-configured settings for Oil & Gas, Chemical, Pharmaceutical industries
- **Terminology Flexibility**: Support for different risk assessment terms

### Responsive Design
- **Cross-platform**: Works on iOS, Android, and Web
- **Modern UI**: Beautiful, intuitive interface with Tailwind CSS styling
- **Responsive Layout**: Adapts to different screen sizes and orientations

## 🛠 Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **NativeWind** (Tailwind CSS for React Native)
- **React Navigation** for routing
- **Expo Vector Icons** for icons
- **React Native Paper** for UI components

## 📱 Screens

### Dashboard
- Overview of active projects and statistics
- Quick access to HAZID and HAZOP analysis
- Recent projects with progress tracking
- AI features highlight

### HAZID Screen
- Hazard identification form with categories and subcategories
- Interactive risk assessment matrix
- Inventory management with dropdowns and custom entries
- Real-time risk level calculation

### HAZOP Screen
- HAZOP worksheet with guide words and parameters
- Design and operating parameters display
- Deviation analysis with cause and consequence tracking
- Safeguard identification and recommendations

### Projects Screen
- Project management with client filtering
- Hierarchical node structure
- Progress tracking and risk profiles
- Search and filter capabilities

### Settings Screen
- Client and industry configuration
- Risk matrix customization
- AI feature settings
- System preferences

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hensis-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   # For web
   npm run web
   
   # For iOS (requires macOS)
   npm run ios
   
   # For Android
   npm run android
   ```

## 📁 Project Structure

```
src/
├── screens/           # Main application screens
│   ├── DashboardScreen.tsx
│   ├── HAZIDScreen.tsx
│   ├── HAZOPScreen.tsx
│   ├── ProjectsScreen.tsx
│   └── SettingsScreen.tsx
├── components/        # Reusable UI components
├── navigation/        # Navigation configuration
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── hooks/            # Custom React hooks
└── constants/        # Application constants
```

## 🎯 Key Features Implementation

### Risk Assessment Matrix
- Interactive 5x5 matrix with color-coded risk levels
- Configurable impact levels (A-E) and probability ratings (1-5)
- Real-time risk level calculation

### AI Integration
- Text polishing for improved grammar and clarity
- Speech-to-text functionality for voice input
- Adaptive learning system for continuous improvement

### Multi-client Support
- Client-specific configurations
- Industry-standard templates
- Customizable terminology and risk matrices

### Project Hierarchy
- Customer → Projects → Nodes/Systems structure
- Unique identification numbers for all entities
- Progress tracking at each level

## 🔧 Configuration

### Risk Matrix Settings
- Matrix size: 5x5, 5x4, 4x4, 6x6
- Impact levels: A (Catastrophic) to E (Negligible)
- Probability levels: 1 (Very Unlikely) to 5 (Very Likely)

### AI Settings
- Text polishing: On/Off
- Speech-to-text: On/Off
- Adaptive learning: On/Off

### Client Settings
- Active client selection
- Industry configuration
- Risk assessment terminology

## 📊 Data Structure

### HAZID Items
```typescript
interface HazardItem {
  id: string;
  category: string;
  subcategory: string;
  source: string;
  threat: string;
  consequence: string;
  impact: 'A' | 'B' | 'C' | 'D' | 'E';
  probability: 1 | 2 | 3 | 4 | 5;
  riskLevel: 'High' | 'Medium' | 'Low';
}
```

### HAZOP Items
```typescript
interface HAZOPItem {
  id: string;
  deviation: string;
  cause: string;
  consequence: string;
  safeguards: string;
  recommendations: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Closed' | 'In Progress';
}
```

### Projects
```typescript
interface Project {
  id: string;
  name: string;
  client: string;
  status: 'Active' | 'Completed' | 'Pending' | 'Archived';
  progress: number;
  lastUpdated: string;
  nodes: Node[];
  riskProfile: {
    high: number;
    medium: number;
    low: number;
  };
}
```

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Adapts to different screen sizes
- **Color-coded Risk Levels**: Visual risk assessment indicators
- **Interactive Elements**: Touch-friendly buttons and forms
- **Progress Indicators**: Visual progress tracking
- **Status Badges**: Clear status indicators for projects and items

## 🔮 Future Enhancements

- **Report Generation**: Automated report creation with charts and tables
- **Drawing Integration**: Import and analyze plant drawings
- **Change Detection**: Automated detection of drawing modifications
- **Project Replication**: Copy existing projects for revalidation
- **Advanced Analytics**: Risk trend analysis and reporting
- **Offline Support**: Work without internet connection
- **Multi-language Support**: Internationalization

## 📝 License

This project is proprietary software developed for Hensis.

## 🤝 Contributing

This is a client project. Please contact the development team for contribution guidelines.

---

**Hensis** - Making hazard analysis smarter, faster, and more accurate with AI-powered insights. 