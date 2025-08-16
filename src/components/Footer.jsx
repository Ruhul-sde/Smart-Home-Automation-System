
const Footer = () => {
  return (
    <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SH</span>
              </div>
              <h3 className="text-white font-bold text-lg">Smart Home</h3>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Control your smart home devices with style and efficiency.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-colors">
                📱
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-colors">
                💻
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-colors">
                🔗
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Dashboard</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Device Control</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Automation</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Energy Monitor</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Community</a></li>
            </ul>
          </div>

          {/* Status */}
          <div>
            <h4 className="text-white font-semibold mb-4">System Status</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-slate-300 text-sm">All systems operational</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-slate-300 text-sm">Cloud services online</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-slate-300 text-sm">Last updated: just now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-400 text-sm">
            © 2024 Smart Home Control. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
