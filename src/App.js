import React from 'react'
import Header from './Header'
import Generos from './Generos'
import NovoGenero from './NovoGenero'
import EditarGenero from './EditarGenero'
import Series from './Series'
import NovaSerie from './NovaSerie'
import InfoSerie from './InfoSerie'
import{
  BrowserRouter as Rota,
  Route,
  Switch
} from 'react-router-dom'

const Home = () =>{
  return <h1>Home</h1>
}

function App() {
  return (
    <Rota>
      <div>
        <Header /> 
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/generos" exact component={Generos} />
        <Route path="/generos/novo" exact component={NovoGenero} />
        <Route path="/generos/:id" exact component={EditarGenero} />
        <Route path="/series/" exact component={Series} />
        <Route path="/series/novo" exact component={NovaSerie} />
        <Route path="/series/:id" exact component={InfoSerie} />
        </Switch>      
      </div>
    </Rota>
  );
}

export default App;

// o Header poderia ter qualquer nome mas precisa começar com letra maiuscula 