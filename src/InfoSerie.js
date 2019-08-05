import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect,Link } from 'react-router-dom'
import {Badge} from 'reactstrap'

const  InfoSerie = ({match}) =>{
    const [dados,setDados] = useState({})
    const [sucesso,setSucesso] = useState(false)
    const [form,setForm] = useState({
        name: ''
    })
    const [genero,setGenero] = useState({})
    const [mode, setMode] = useState('INFO')
    const [genero_id, setGenero_id] = useState('')

    const trocaGenero = evt => {
        setGenero_id(evt.target.value)
    }

    useEffect(()=>{
        axios.get('/api/series/' + match.params.id).then(res =>{
            setDados(res.data)
            setForm(res.data)
        })

    }, [match.params.id])

    useEffect(()=>{
        axios.get('/api/genres/').then(res=>{
            setGenero(res.data.data)
            const genero = res.data.data
            const encontrado = genero.find(value=> dados.genero === value.name)
            if(encontrado){
                setGenero_id(encontrado.id)
            }
        })
    },[dados])

    const seleciona = valor => () =>{
        setForm({
            ...form,
            status: valor
        })
    }

    //customizar header
    const masterHeader ={
        height: '40vh',
        minHeight: '400px',
        backgroundImage: `url('${dados.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-reapeat'
    }


    const salvar = () =>{
        axios.put('/api/series/' + match.params.id,{
            ...form,
            genre_id: genero_id
             })
        .then(res => {
            setSucesso(true)
        })
    }

    const troca = field => evt =>{
       setForm({
           ...form,
           [field]: evt.target.value
       })
    }

    if(sucesso){
        return  <Redirect to='/series' />
    }

    return(
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{background: 'rgba(0,0,0,0.7)'}}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={dados.name} className='img-fluid img-thumbnail' src={dados.poster}/>
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white'>{dados.name}</h1>
                                <div className='lead text-white'>
                                   { dados.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>} 
                                   { dados.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge>}
                                    Gênero:{dados.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container'>
                <button onClick={() => setMode('EDIT')} className='btn btn-primary' >Editar</button>
                <Link to='/series/' className='btn btn-secondary'>Voltar</Link>
            </div>
            {
                mode === 'EDIT' &&
            <div className='container'>
                <h1>Nova Série</h1>
                <button onClick={() => setMode('INFO')} className='btn btn-secondary'>Cancelar edição</button>
                <form>
                    <div className="form-group">
                        <label htmlfor='name'>Nome</label>
                        <input type='text' value={form.name} onChange={troca('name')} className='form-control'
                        id='name' aria-describedby='emailHelp' placeholder='Nome da série'/>
                    </div>
                    <div className="form-group">
                        <label htmlfor='name'>Comentário</label>
                        <input type='text' value={form.comments} onChange={troca('comments')} className='form-control'
                        id='name' aria-describedby='emailHelp' placeholder='Nome da série'/>
                    </div>
                            <div className='form-group'>
                                <label for='name'>Gênero</label>
                                <select className="form-control" onChange={trocaGenero} value={genero_id}>
                                    {genero.map(genero => <option key={genero.id} value={genero.id}>{genero.name}</option>)}
                                </select>
                            </div>
                            <div className='form-check'>
                                <input class='form-check-input' type='radio' checked={form.status ==='ASSISTIDO'} name='status' id='assistido'
                                 value='ASSISTIDO' onChange={seleciona('ASSISTIDO')}/>
                                <label class='form-check-label' htmlfor='assistido'>
                                    Assistido
                                </label>
                            </div>
                            <div class='form-check'>
                                <input class='form-check-input' type='radio' checked={form.status ==='PARA_ASSISTIR'} name='status' id='paraAssistir'
                                 value='PARA_ASSISTIR' onChange={seleciona('PARA_ASSISTIR')}/>
                                <label class='form-check-label' htmlfor='paraAssistir'>
                                    Para Assistir
                                </label>
                            </div>  
                    <button type='button' onClick={salvar} className='btn btn-primary'>Salvar</button>
                    </form>
            </div>
            }
        </div>  
    )
}

export default InfoSerie