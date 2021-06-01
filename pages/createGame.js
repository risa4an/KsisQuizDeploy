import View from "../View.js";

const resultsNode = document.getElementById('main');
let items = [];

export default {
    setData(newItems){
        items = newItems;
    },
    render(){
        // console.log(View.render('games', {list : items}));
        resultsNode.innerHTML = View.render('createGame', {list : items});
        document.getElementById("createGame").onsubmit = function (evt){
            evt.preventDefault();
            window.location.href=window.location.href+'/new';
        };
        // resultsNode.appendChild( View.render('games', {list : items}));
    },
    getData(){
        const form = document.getElementById("createGame");
        return {
            gameName: form.elements.gameName.value ,
            gameImage: form.elements.gameImage.files[0],
            imageName: form.elements.gameImage.value
        };
    }

}