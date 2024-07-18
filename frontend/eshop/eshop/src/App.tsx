
import './App.css'
import { ProdutoData } from './interface/ProdutoData';
import {Card} from './components/card/card'
import { useProdutoData } from './hooks/useProdutoData';

function App() {
 const { data=[] } = useProdutoData();

  return (
    <>
     <div className="container mx-auto">
      <h1 className='text-3xl font-bold text-center my-8'>eShop!</h1>
      <div className='grid grid-cols-3 gap-4'>

      {data?.map(produtoData => 
      <Card 
      name={produtoData.name} 
      descricao={produtoData.descricao} 
      img={produtoData.img}
      />)
      }

      </div>
     </div>
    </>
  )
}

export default App
