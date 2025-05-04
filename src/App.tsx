import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Footer from './components/Footer'
/* Variável de contexto global que será usada em múltiplos arquivos */
import CurrentFilterOnProvider from './contexts/currentFilterOn/CurrentFilterOnProvider'
import SearchInputValueProvider from './contexts/searchInputValue/SearchInputProvider'

export default function App() {
  return (
    /* Envolvemos toda a aplicação com os Providers, para que todos os arquivos possam usar os contexts */
    <CurrentFilterOnProvider>
      <SearchInputValueProvider>
        <Header />
        <main>
          <Sidebar />
        </main>
        <Footer />
      </SearchInputValueProvider>
    </CurrentFilterOnProvider>
  )
}