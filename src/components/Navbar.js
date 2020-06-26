import React, { useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import { Link } from 'react-router-dom'

const Navbar = ({isLogin=false}) => {
    const [menu, setMenu] = useState(false)

    const renderLinks = (links, sidenav=false)=>{
        if(sidenav){
            return links.map((link, index)=>{
                return(
                    <li key={index}>
                        <Link to={link.to} onClick={setMenu.bind(null, false)}>
                            {link.label}
                        </Link>
                    </li>
                )
            })
        }
        return links.map((link, index)=>{
            return(
                <li key={index}>
                    <Link to={link.to}>{link.label}</Link>
                </li>
            )
        })

    }

    const links = [
        {to: '/', label: 'Главная'},
    ]

    if(isLogin){
        links.push({to: '/add', label: 'Добавить'})
        links.push({to: '/auth', label: 'Выход'})
    }else{
        links.push({to: '/auth', label: 'Вход'})
    }

    return (
        <>
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo center">
                    Рецепты
                    {isLogin&&<i className='tiny material-icons'>account_box</i>}
                </Link>
                <span style={{cursor: 'pointer'}} className="sidenav-trigger" onClick={setMenu.bind(null, true)}>
                    <i className="material-icons">menu</i>
                </span>
                <ul className="left hide-on-med-and-down">
                    {renderLinks(links)}
                </ul>
            </div>
        </nav>
        <Sidebar menu={menu} onClose={setMenu}>
            {renderLinks(links, true)}
        </Sidebar>
        </>
    )
}

export default Navbar