import React, {useState,useEffect} from 'react';
import Navbar from './Navbar.js';
import '../css/layout.css';

//layout of every page, includes header, navbar, and footer

// header at the top of the page
// contains the navbar
// need to add content like our logo and a header image
function TopHeader(props) {
    /* we keep track of the user scrolling the page so that whenever the
    page has been scrolled, the navbar will stay at the top of the screen
    even when the rest of the header is hidden */
    
    // state that says if the page has been scrolled or not
    const [scrolled,setScrolled] = useState(false);

    // function determines if the page has been scrolled
    const handleScroll = () => {
        const offset = window.scrollY;
        // if page has ben scrolled past the height of the topheader (meaning it isnt visible)
        // set state to scrolled so we know to fix the navbar at the top
        if (offset > 150) {
            setScrolled(true);
        } 
        // set state to false whenever the page has scrolled up so
        // the header is in view again
        else {
            setScrolled(false);
        }
    }

    // adds listener whenever page is loaded that watches for page scrolling
    useEffect(() => {
        window.addEventListener('scroll',handleScroll)
    });

    // when page has been scrolled, we change the state of the navbar
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
