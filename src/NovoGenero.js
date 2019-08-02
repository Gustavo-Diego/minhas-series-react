import React, {useState} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const  NovoGenero = () =>{
    const salvar = () =>{
        axios.post('/api/genres',{
            name
        }).then(res => {
            setSucesso(true)
        })
    }
    const [sucesso,setSucesso] = useState(false)
    const [name,setName] = useState('')
    const troca = evt =>{
        setName(evt.target.value)
    }

    if(sucesso){
      return  <Redirect to='/generos' />
    }

    return(
         <div className='container'>
            <h1>Novo Gênero</h1>
            <form>
                <div className="form-group">
                    <label htmlfor='name'>Nome</label>
                    <input type='text' value={name} onChange={troca} className='form-control'
                     id='name' aria-describedby='emailHelp' placeholder='Nome do gênero'/>
                </div>
                <button type='button' onClick={salvar} className='btn btn-primary'>Salvar</button>
            </form>
        </div>
    )
}

export default NovoGenero