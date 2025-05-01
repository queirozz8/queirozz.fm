import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Footer from './components/Footer'
/* Variável de contexto global que será usada em múltiplos arquivos */
import { CurrentFilterOnProvider } from './contexts/CurrentFilterOnContext'

export default function App() {
  return (
    /* Envolvemos toda a aplicação com o Provider, para que todos os arquivos possam usar o context */
    <CurrentFilterOnProvider>
      <Header />
      <main>
        <Sidebar />
      </main>
      <Footer />
    </CurrentFilterOnProvider>
  )
}