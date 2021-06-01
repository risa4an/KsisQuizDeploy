import View from "../View.js";

const resultsNode = document.getElementById('main');
let items = [];

export default {
    setData(newItems){
        items = newItems;
    },
    render(){
        resultsNode.innerHTML = View.render('games', {list : items});
    }
}