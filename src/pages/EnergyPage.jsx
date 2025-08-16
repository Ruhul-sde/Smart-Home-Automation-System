
import EnergyMonitor from '../components/EnergyMonitor'

const EnergyPage = ({ energyData, devices, rooms }) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <EnergyMonitor 
          energyData={energyData} 
          devices={devices} 
          rooms={rooms}
          timeRange="24h"
        />
      </div>
    </div>
  )
}

export default EnergyPage
