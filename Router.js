// import Controller from './Controller.js';
//
//
//
// function getRouteInfo() {
//     const hash = location.hash ? location.hash.slice(1) : '';
//     const [name, id] = hash.split('/');
//     return {name, params: {id}}
// }
//
// function hadleHash(href){
//     const {name, params} = getRouteInfo();
//     if (name) {
//         const routeName = name + 'Route';
//         if (href.count){
//             href.count -=1;
//         }
//         else{
//             href = {route: name, params: params, count: 0};
//             const temp = Controller[routeName](params);
//             if (temp){
//                 href = temp;
//                 href.count = 1;
//             }
//
//             window.location.href = window.location.href.split('#').slice(0, -1)
//                 + '#' + href.route;
//             if (href.params.id){
//                 window.location.href += '/' + href.params.id;
//             }
//         }
//     }
//     return href;
// }
//
// export default {
//     init(){
//         addEventListener('hashchange', function(e, href){
//             href = hadleHash(href);
//         });
//         hadleHash(href);
//     }
// }
import Controller from './Controller.js';

function getRouteInfo() {
    const hash = location.hash ? location.hash.slice(1) : '';
    const [name, id] = hash.split('/');
    return {name, params: {id}}
}

function hadleHash(){
    const {name, params} = getRouteInfo();

    if (name) {
        const routeName = name + 'Route';
        Controller[routeName](params);
    }
}

export default {
    init(){
        addEventListener('hashchange', hadleHash);
        if (!location.hash){
            window.location.href += '/#games';
        }
        hadleHash();

    }
}