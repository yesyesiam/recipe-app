import React from 'react'

const Sidebar = ({menu, onClose, children}) => {
    let styles = {transition: 'transform .22s ease-in'}
    if(menu){
        styles={...styles, transform: 'translateX(0%)'}
    }
    
    return (
        <>
        <ul className="sidenav" style={styles} >
            {children}
        </ul>
        {
            menu&&
            <div 
                className="sidenav-overlay" 
                style={{display: 'block', opacity: 1}} 
                onClick={onClose.bind(null, false)}
                >
            </div>
        }
        </>
    )
}

export default Sidebar

