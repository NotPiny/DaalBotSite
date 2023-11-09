// JS
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.9.0/cdn/shoelace.js'

// CSS
// Get HTML head element
let head = document.getElementsByTagName('HEAD')[0];
 
// Create new link Element
let link = document.createElement('link');
 
// set the attributes for link element
link.rel = 'stylesheet';
link.type = 'text/css';     
link.href = 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.9.0/cdn/themes/dark.css';
 
// Append link element to HTML head
head.appendChild(link);

// HTML
let htmlElement = document.getElementsByTagName('html')[0]
htmlElement.classList.add('sl-theme-dark')