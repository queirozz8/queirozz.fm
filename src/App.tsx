import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Main from './components/main/Main'
import Footer from './components/footer/Footer'
/* Variável de contexto global que será usada em múltiplos arquivos */
import CurrentFilterOnProvider from './contexts/currentFilterOn/CurrentFilterOnProvider'
import ItemsProvider from './contexts/items/ItemsProvider'
import SearchInputValueProvider from './contexts/searchInputValue/inputValue/SearchInputProvider'
import ShouldFilterProvider from './contexts/searchInputValue/shouldFilter/ShouldFilterProvider'
import IsFullscreenProvider from './contexts/fullscreen/FullscreenProvider'

export default function App() {
  return (
    /* Envolvemos toda a aplicação com os Providers, para que todos os arquivos possam usar os contexts */
    <CurrentFilterOnProvider>
      <ItemsProvider>
        <SearchInputValueProvider>
          <ShouldFilterProvider>
            <IsFullscreenProvider>
              
              <Header />
              <div className='flex flex-col h-[99vh]'>
                <div className='flex flex-grow h-0 gap-2'>
                  <Sidebar />
                  <Main />
                </div>
              
                <Footer />
              </div>

            </IsFullscreenProvider>
          </ShouldFilterProvider>
        </SearchInputValueProvider>
      </ItemsProvider>
    </CurrentFilterOnProvider>
  )
}