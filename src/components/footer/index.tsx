import React from 'react'
import './style.css'

const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} Air Quality Monitoring. All rights reserved.</p>
    </footer>
  )
}

export default Footer
