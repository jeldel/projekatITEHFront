import React from 'react'
import { Link } from 'react-router-dom'



function Header() {
  if(localStorage.getItem('korisnik') === null){
    return (
      <div className='header'>
          <Link to='/'>Home</Link>
          <Link to='/zakazi'>Zakazi</Link>
          <Link to='/mojiTermini'>Moji Termini</Link>
          <Link to='/vesti'>Vesti</Link>
      </div>
    )

  }
  else{
    if(JSON.parse(localStorage.getItem("korisnik")).admin === false){
      return (
        <div className='header'>
            <Link to='/'>Home</Link>
            <Link to='/zakazi'>Zakazi</Link>
            <Link to='/mojiTermini'>Moji Termini</Link>
            <Link to='/vesti'>Vesti</Link>
        </div>
      )
    }
    else{
      return (
        <div className='header'>
            <Link to='/'>Home</Link>
            <Link to='/terminiMup'>Termini</Link>

        </div>
      )
    }
  }


}

export default Header