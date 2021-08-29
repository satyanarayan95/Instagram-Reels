import React from 'react'
import wordLogo from "../images/word_logo.png"
import "../Styles/NaviBar.css"
function NaviBar({userData}) {
    return (
        <>
            <div className='navImage'>
                <div className="side1">
                    <div className='navName'>
                        <img src={wordLogo}  alt=""/>
                    </div>
                    <div className='logo'>
                        {/* <img src={logo} /> */}
                    </div>
                </div>
            </div>

        </>
    )
}

export default NaviBar
