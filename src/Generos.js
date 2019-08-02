import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Generos = () =>{
    const [dados,setDados] = useState([])

    useEffect(()=>{
        axios.get('/api/genres').then(resp => {
            setDados(resp.data.data)
        })
    },[])

    const deletaGenero = id =>{
        axios.delete('/api/genres/' + id).then(res =>{
            const filtrado = dados.filter(item => item.id !== id)
            setDados(filtrado)
        })
    }

    const renderizaLinha = record =>{
        return(
            <tr key={record.id}>
                <th scope='row'>{record.id}</th>
                <td>{record.name}</td>
                <td><button className="btn btn-danger" onClick={() => deletaGenero(record.id)}>Remover</button>
                    <Link to={'/generos//'+record.id} className='btn btn-warning' >Editar</Link>
                </td>
            </tr>
        )
    } 

    if(dados.length === 0){
        return(
            <div className='container'>
                <h1>Gêneros</h1>
                <div className='alert alert-success' role='alert'>
                Você não tem gêneros cadastrados
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <h1>Gêneros</h1>
            <div><Link to='/generos/novo' className='btn btn-primary'>Novo gênero</Link></div>
                <table className='table table-dark'>
                    <thead>
                        <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Nome</th>
                        <th scope='col'>ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map(renderizaLinha)}
                    </tbody>
                </table>
        </div>
    )
  }

export default Generos  