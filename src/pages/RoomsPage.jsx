
import RoomControls from '../components/RoomControls'

const RoomsPage = ({ rooms, devices, onDeviceToggle, onDeviceUpdate, setRooms }) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <RoomControls 
          rooms={rooms} 
          devices={devices} 
          onDeviceToggle={onDeviceToggle}
          onDeviceUpdate={onDeviceUpdate}
          setRooms={setRooms}
        />
      </div>
    </div>
  )
}

export default RoomsPage
