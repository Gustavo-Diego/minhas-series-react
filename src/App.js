import React, {useState, useEffect} from 'react'
import Header from './Header'
import Generos from './Generos'
import NovoGenero from './NovoGenero'
import EditarGenero from './EditarGenero'
import Axios from 'axios'
import{
  BrowserRouter as Rota,
  Route
} from 'react-router-dom'

const Home = () =>{
  return <h1>Home</h1>
}

function App() {
  
  const [data,setData] = useState({}) 

  useEffect(() => {
    Axios.get("/api").then(res => {
      setData(res.data)
    })
  },[])
  return (
    <Rota>
      <div>
        <Header /> 
        <Route path="/" exact component={Home} />
        <Route path="/generos" exact component={Generos} />
        <Route path="/generos/novo" exact component={NovoGenero} />
        <Route path="/generos//:id" exact component={EditarGenero} />
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Rota>
 
  );
}

export default App;

// o Header poderia ter qualquer nome mas precisa começar com letra maiuscula 