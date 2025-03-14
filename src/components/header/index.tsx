import React from 'react'
import ThemeToggle from '../theme-toggle'
import './style.css'

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">Air Quality Dashboard</h1>
      <ThemeToggle />
    </header>
  )
}

export default Header
