import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect,Link } from 'react-router-dom'

const  EditarGenero = ({match}) =>{
    useEffect(()=>{
        axios.get('/api/genres/'+ match.params.id).then(res =>{
            setName(res.data.name)
        })
    },[match.params.id])

    const Editar = () =>{
        axios.put('/api/genres/' + match.params.id,{
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
            <h1>Editar Gênero</h1>
            <form>
                <div className="form-group">
                    <label htmlfor='name'>Nome</label>
                    <input type='text' value={name} onChange={troca} className='form-control'
                     id='name' aria-describedby='emailHelp' placeholder='Editar gênero'/>
                </div>
                <button type='button' onClick={Editar} className='btn btn-primary'>Editar</button>
                <Link to='/generos/' className='btn btn-secondary'>Voltar</Link>
            </form>
        </div>
    )
}

export default EditarGenero