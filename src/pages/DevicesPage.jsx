
import DeviceGrid from '../components/DeviceGrid'

const DevicesPage = ({ devices, onToggle, onUpdate, rooms }) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <DeviceGrid 
          devices={devices} 
          onToggle={onToggle}
          onUpdate={onUpdate}
          rooms={rooms}
        />
      </div>
    </div>
  )
}

export default DevicesPage
