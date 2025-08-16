
import AutomationPanel from '../components/AutomationPanel'

const AutomationPage = ({ automations, onToggle, onAdd, devices, rooms }) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <AutomationPanel 
          automations={automations}
          onToggle={onToggle}
          onAdd={onAdd}
          devices={devices}
          rooms={rooms}
        />
      </div>
    </div>
  )
}

export default AutomationPage
