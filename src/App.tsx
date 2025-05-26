import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Footer from './components/footer/Footer'
/* Variável de contexto global que será usada em múltiplos arquivos */
import CurrentFilterOnProvider from './contexts/currentFilterOn/CurrentFilterOnProvider'
import ItemsProvider from './contexts/items/ItemsProvider'
import SearchInputValueProvider from './contexts/searchInputValue/inputValue/SearchInputProvider'
import ShouldFilterProvider from './contexts/searchInputValue/shouldFilter/ShouldFilterProvider'

export default function App() {
  return (
    /* Envolvemos toda a aplicação com os Providers, para que todos os arquivos possam usar os contexts */
    <CurrentFilterOnProvider>
      <ItemsProvider>
        <SearchInputValueProvider>
          <ShouldFilterProvider>
  
            <Header />
            <div className='flex w-screen gap-2'>
                <Sidebar />
              <main className='flex-[97%] mr-2 rounded-lg bg-[#121212]'>

              </main>
            </div>
            <Footer />

          </ShouldFilterProvider>
        </SearchInputValueProvider>
      </ItemsProvider>
    </CurrentFilterOnProvider>
  )
}