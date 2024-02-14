import React, {useState,useEffect} from 'react';
import Navbar from './Navbar.js';
import '../css/layout.css';

//layout of every page, includes header, navbar, and footer

// header at the top of the page
// contains the navbar
// need to add content like our logo and a header image
function TopHeader(props) {
    const [scrolled,setScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 180) {
            setScrolled(true);
        } else {
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
                <p>Add logo and header image</p>
            </div>
            <div style={{height:"60px"}}>
                <Navbar login={props.login}/>
            </div>
        </header>
    );
}

// footer at the bottom of the page
// need to add content like fake contact info and our names
function BottomFooter() {
    return (
        <footer id='bottomfooter'>
            <p>add fake contact info and our names</p>
        </footer>
    );
}

export {TopHeader,BottomFooter};
