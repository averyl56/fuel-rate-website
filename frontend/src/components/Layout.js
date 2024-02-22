import React, {useState,useEffect} from 'react';
import Navbar from './Navbar.js';
import '../css/layout.css';

function TopHeader(props) {

    const [scrolled,setScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;

        if (offset > 150) {
            setScrolled(true);
        } 

        else {
            setScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll',handleScroll)
    });

    useEffect(() => {
        const nav = document.getElementById("navbox");
        if (scrolled) {
            nav.classList.add('scrolled');
        }
        else {
            nav.classList.remove('scrolled');
        }
    },[scrolled])

    return (
        <header>
            <div id='topheader'>
                <p><strong>Fuel <span className="highlight black-word">Tracker</span></strong><img src="https://investingnews.com/media-library/oil-barrels-on-black-background-with-golden-world-map.jpg?id=33602619&width=1200&height=600&coordinates=0%2C208%2C0%2C209" alt="Image description" /></p>
            </div>
            <div style={{height:"60px"}}>
                <Navbar login={props.login}/>
            </div>
        </header>
    );
}

function BottomFooter() {
    return (
        <footer id='bottomfooter'>
            <pre id='footertext' >
            <span id='footerlogo'>Contact Us</span><br />
                1800-COSC-4351<br />
                info@fuel.com
            </pre>
            
        
        </footer>
    );
}

export {TopHeader,BottomFooter};
