import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ScrollToHash } from './components/ScrollToHash'
import { HomePage } from './pages/HomePage'
import { F1ProjectPage } from './pages/F1ProjectPage'
import { UnoProjectPage } from './pages/UnoProjectPage'
import { ChattyProjectPage } from './pages/ChattyProjectPage'
import { BioBERTProjectPage } from './pages/BioBERTProjectPage'
import { ChipProjectPage } from './pages/ChipProjectPage'

function App() {
  return (
    <Layout>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/f1" element={<F1ProjectPage />} />
        <Route path="/projects/uno" element={<UnoProjectPage />} />
        <Route path="/projects/chatty" element={<ChattyProjectPage />} />
        <Route path="/projects/biobert" element={<BioBERTProjectPage />} />
        <Route path="/projects/chip" element={<ChipProjectPage />} />
      </Routes>
    </Layout>
  )
}

export default App
