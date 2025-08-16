
import Dashboard from '../components/Dashboard'

const DashboardPage = ({ devices, rooms, energyData, automations, quickActions, notifications }) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Dashboard 
          devices={devices} 
          rooms={rooms} 
          energyData={energyData}
          automations={automations}
          quickActions={quickActions}
          notifications={notifications.slice(0, 3)}
        />
      </div>
    </div>
  )
}

export default DashboardPage
