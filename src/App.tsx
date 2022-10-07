import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import ThreejsCanvas from './components/main/ThreejsCanvas';
import MainPage from './pages/main.page';
import './App.css'

const App: React.FC = (props) => {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <div className="App">
      {/* Threejs canvas */}
      <ThreejsCanvas />

      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  )
}

export default App;
