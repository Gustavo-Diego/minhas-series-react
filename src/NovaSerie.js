import React, {useState} from 'react'
import axios from 'axios'
import { Redirect,Link } from 'react-router-dom'

const  NovaSerie = () =>{
    const salvar = () =>{
        axios.post('/api/series',{
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
      return  <Redirect to='/series' />
    }

    return(
         <div className='container'>
            <h1>Nova Série</h1>
            <form>
                <div className="form-group">
                    <label htmlfor='name'>Nome</label>
                    <input type='text' value={name} onChange={troca} className='form-control'
                     id='name' aria-describedby='emailHelp' placeholder='Nome da série'/>
                </div>
                <button type='button' onClick={salvar} className='btn btn-primary'>Salvar</button>
                <Link to='/series/' className='btn btn-secondary'>Voltar</Link>
            </form>
        </div>
    )
}

export default NovaSerie