
import { useState } from 'react'

const AutomationPanel = ({ automations, onToggle, onAdd }) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAutomation, setNewAutomation] = useState({
    name: '',
    trigger: 'time',
    time: '07:00',
    actions: []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newAutomation.name && newAutomation.actions.length > 0) {
      onAdd({...newAutomation, active: true})
      setNewAutomation({ name: '', trigger: 'time', time: '07:00', actions: [] })
      setShowAddForm(false)
    }
  }

  const addAction = (action) => {
    setNewAutomation(prev => ({
      ...prev,
      actions: [...prev.actions, action]
    }))
  }

  const removeAction = (index) => {
    setNewAutomation(prev => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index)
    }))
  }

  const commonActions = [
    'Turn on lights', 'Turn off lights', 'Lock doors', 'Unlock doors',
    'Start coffee maker', 'Turn on AC', 'Turn off AC', 'Arm security',
    'Disarm security', 'Close blinds', 'Open blinds', 'Play music'
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Automation Rules</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
        >
          + Add Rule
        </button>
      </div>

      {/* Existing Automations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {automations.map(automation => (
          <div key={automation.id} className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">{automation.name}</h3>
              <button
                onClick={() => onToggle(automation.id)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  automation.active 
                    ? 'bg-green-500 shadow-lg shadow-green-500/30' 
                    : 'bg-slate-600'
                }`}
              >
                <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform duration-300 ${
                  automation.active ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-lg">🕒</span>
                <span>
                  {automation.trigger === 'time' ? `Every day at ${automation.time}` : automation.trigger}
                </span>
              </div>

              <div>
                <h4 className="text-white font-medium mb-2">Actions:</h4>
                <div className="space-y-2">
                  {automation.actions.map((action, index) => (
                    <div key={index} className="bg-white/5 px-3 py-2 rounded-lg text-slate-300 text-sm">
                      • {action}
                    </div>
                  ))}
                </div>
              </div>

              <div className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                automation.active 
                  ? 'bg-green-500/20 text-green-200 border border-green-500/30' 
                  : 'bg-gray-500/20 text-gray-200 border border-gray-500/30'
              }`}>
                {automation.active ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Automation Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 p-6 rounded-2xl border border-white/10 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Create New Automation</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={newAutomation.name}
                  onChange={(e) => setNewAutomation(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-slate-400"
                  placeholder="Enter automation name"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Trigger</label>
                <select
                  value={newAutomation.trigger}
                  onChange={(e) => setNewAutomation(prev => ({ ...prev, trigger: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                >
                  <option value="time">Time-based</option>
                  <option value="location">Location-based</option>
                  <option value="sensor">Sensor-based</option>
                </select>
              </div>

              {newAutomation.trigger === 'time' && (
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Time</label>
                  <input
                    type="time"
                    value={newAutomation.time}
                    onChange={(e) => setNewAutomation(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Actions</label>
                <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
                  {newAutomation.actions.map((action, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg">
                      <span className="text-slate-300 text-sm">{action}</span>
                      <button
                        type="button"
                        onClick={() => removeAction(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addAction(e.target.value)
                      e.target.value = ''
                    }
                  }}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                >
                  <option value="">Select an action</option>
                  {commonActions.map(action => (
                    <option key={action} value={action}>{action}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-blue-500/30 px-4 py-2 rounded-lg text-white font-medium transition-all"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AutomationPanel
