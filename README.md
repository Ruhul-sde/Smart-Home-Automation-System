
# Smart Home Automation System

A modern, responsive smart home control dashboard built with React, Vite, and TailwindCSS. This application provides a comprehensive interface for managing smart home devices, automation, energy monitoring, and security systems.

## 🏠 Features

### Core Functionality
- **Dashboard Overview** - Real-time status of all connected devices and systems
- **Room Controls** - Manage devices by room with environmental monitoring
- **Device Management** - Individual device control with detailed settings
- **Automation System** - Create and manage automated routines and schedules
- **Energy Monitoring** - Track energy usage and optimize consumption
- **Security System** - Monitor and control security devices and alerts
- **Notifications** - Real-time alerts and system notifications
- **Settings** - Customize preferences and system configuration

### UI/UX Features
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern Interface** - Glass-morphism design with gradient backgrounds
- **Dark Theme** - Optimized for low-light environments
- **Animated Transitions** - Smooth interactions and hover effects
- **Navigation Bar** - Sticky navigation with mobile-responsive menu
- **Footer** - System status and quick links

## 🚀 Technology Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Styling**: TailwindCSS 4.1.12
- **Icons**: Emoji-based icon system
- **State Management**: React useState/useEffect hooks

## 📁 Project Structure

```
smart-home-automation/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/          # Reusable UI components
│   │   ├── AutomationPanel.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DeviceGrid.jsx
│   │   ├── EnergyMonitor.jsx
│   │   ├── Footer.jsx       # Footer component
│   │   ├── Navbar.jsx       # Navigation component
│   │   ├── Notifications.jsx
│   │   ├── RoomControls.jsx
│   │   ├── SecuritySystem.jsx
│   │   └── Settings.jsx
│   ├── pages/               # Page-level components
│   │   ├── AutomationPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── DevicesPage.jsx
│   │   ├── EnergyPage.jsx
│   │   ├── NotificationsPage.jsx
│   │   ├── RoomsPage.jsx
│   │   ├── SecurityPage.jsx
│   │   └── SettingsPage.jsx
│   ├── App.css
│   ├── App.jsx              # Main application component
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── .replit
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## 🛠️ Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd smart-home-automation
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

## 🎯 Quick Start

The application starts with a pre-configured set of mock devices, rooms, and automation rules. You can:

1. **Explore the Dashboard** - View system overview and quick actions
2. **Control Devices** - Toggle lights, adjust temperature, manage locks
3. **Create Automations** - Set up scheduled or trigger-based actions
4. **Monitor Energy** - Track consumption and optimize usage
5. **Check Security** - Monitor cameras, alarms, and access controls

## 📱 Device Types Supported

- **Lighting**: Smart bulbs, switches, dimmers
- **Climate**: Thermostats, AC units, fans
- **Security**: Cameras, locks, alarms, sensors
- **Entertainment**: TVs, speakers, media players
- **Utilities**: Sprinklers, garage doors, appliances

## 🔧 Configuration

### Environment Variables
The application currently uses mock data. To connect real devices, you would need to:

1. Set up device APIs in environment variables
2. Implement device communication protocols
3. Configure authentication for smart home platforms

### Customization
- **Theme Colors**: Modify TailwindCSS classes in components
- **Device Types**: Add new device categories in the devices state
- **Automation Rules**: Extend the automation system with new triggers
- **Layout**: Adjust grid layouts and responsive breakpoints

## 🚀 Deployment

### Local Development
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

### Replit Deployment
This project is configured to run on Replit with automatic deployment. The `.replit` file contains the necessary configuration.

## 📊 Performance

- **Fast Refresh**: Hot module replacement during development
- **Optimized Build**: Vite's efficient bundling for production
- **Responsive Design**: Smooth performance across all device sizes
- **Lazy Loading**: Components load efficiently as needed

## 🔒 Security Features

- **Mock Security System**: Simulated camera feeds and alarm states
- **Access Control**: Device-level permissions (ready for implementation)
- **Secure Communication**: Placeholder for encrypted device communication
- **User Authentication**: Framework ready for user management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the excellent framework
- Vite for the fast build tool
- TailwindCSS for the utility-first CSS framework
- The open-source community for inspiration and resources

## 🔮 Future Enhancements

- **Real Device Integration**: Connect with actual smart home platforms
- **Voice Control**: Integration with voice assistants
- **Mobile App**: React Native companion app
- **Advanced Analytics**: Historical data and predictive insights
- **Multi-User Support**: Family account management
- **Third-Party Integrations**: Weather, calendar, and other services

---

**Built with ❤️ using React + Vite + TailwindCSS**
