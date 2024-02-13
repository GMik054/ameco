import '@lwc/synthetic-shadow';
import { createElement } from 'lwc';
import App from 'apps/app';

window.dataLayer = window.dataLayer || [];
window.gtag = function(){
    dataLayer.push(arguments);
}

if (window.performance) {
    console.info("window.performance works fine on this browser");
}
if (performance.getEntriesByType("navigation")[0].type == 'reload') {
    console.info( "This page is reloaded" );
    window.location.href = window.location.href.split('#')[0]
} else {
    console.info( "This page is not reloaded");
}

window.onhashchange = function(event) {
    if(event.oldURL.endsWith('#/finish')){
        location.reload();
    }
}

const elm = createElement('apps-app', { is: App });
document.querySelector('#app').appendChild(elm);