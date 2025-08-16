const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health check
  async checkHealth() {
    return this.request('/health');
  }

  // Devices
  async getDevices() {
    return this.request('/devices');
  }

  async getDevice(id) {
    return this.request(`/devices/${id}`);
  }

  async updateDevice(id, updates) {
    return this.request(`/devices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async toggleDevice(id) {
    return this.request(`/devices/${id}/toggle`, {
      method: 'POST',
    });
  }

  // Rooms
  async getRooms() {
    return this.request('/rooms');
  }

  async getRoom(id) {
    return this.request(`/rooms/${id}`);
  }

  async updateRoom(id, updates) {
    return this.request(`/rooms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Automations
  async getAutomations() {
    return this.request('/automations');
  }

  async createAutomation(automation) {
    return this.request('/automations', {
      method: 'POST',
      body: JSON.stringify(automation),
    });
  }

  async updateAutomation(id, updates) {
    return this.request(`/automations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteAutomation(id) {
    return this.request(`/automations/${id}`, {
      method: 'DELETE',
    });
  }

  // Notifications
  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationAsRead(id) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  async clearAllNotifications() {
    return this.request('/notifications', {
      method: 'DELETE',
    });
  }

  // Energy
  async getEnergyData() {
    return this.request('/energy');
  }

  // Settings
  async getSettings() {
    return this.request('/settings');
  }

  async updateSettings(settings) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // Quick Actions
  async executeAllOff() {
    return this.request('/quick-actions/all-off', {
      method: 'POST',
    });
  }

  async executeSleepMode() {
    return this.request('/quick-actions/sleep-mode', {
      method: 'POST',
    });
  }

  async executeAwayMode() {
    return this.request('/quick-actions/away-mode', {
      method: 'POST',
    });
  }

  async executeMovieNight() {
    return this.request('/quick-actions/movie-night', {
      method: 'POST',
    });
  }

  // User Management
  async getUsers() {
    return this.request('/users');
  },

  async getUser(id) {
    return this.request(`/users/${id}`);
  },

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  },

  // Scene Management
  async getScenes() {
    return this.request('/scenes');
  },

  async createScene(sceneData) {
    return this.request('/scenes', {
      method: 'POST',
      body: JSON.stringify(sceneData),
    });
  },

  async updateScene(id, sceneData) {
    return this.request(`/scenes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sceneData),
    });
  },

  async deleteScene(id) {
    return this.request(`/scenes/${id}`, {
      method: 'DELETE',
    });
  },

  async activateScene(id) {
    return this.request(`/scenes/${id}/activate`, {
      method: 'POST',
    });
  },

  // Analytics
  async getDeviceAnalytics() {
    return this.request('/analytics/devices');
  },

  async getRoomAnalytics() {
    return this.request('/analytics/rooms');
  },
}

export default new ApiService();