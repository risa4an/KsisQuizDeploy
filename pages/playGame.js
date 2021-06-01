import View from "../View.js";
import Model from "../Model.js";

const resultsNode = document.getElementById('main');
let playQuestions;
let answers;

export default {
    async render(gameId){
        playQuestions = await Model.getQuestions(gameId);
        answers = [];
        await playGame(0);
    },
    async renderQuestion(question){
        resultsNode.innerHTML = View.render("question" + question.type, question);
    }
}

function playGame(temp){
    let questions = playQuestions;
    let timerId = setTimeout(function q(i = temp){
        if (i != 0){
            let form = document.getElementById('answerForm');
            answers.push(form.elements.answer.value);
        }
        if (i == questions.length){
            const result = getResults();
            const data = {result: result, overall: questions.length};
            resultsNode.innerHTML = View.render("result", data);
        }
        else{
            resultsNode.innerHTML = View.render("question" + questions[i].type, questions[i]);
            document.getElementById("answerForm").onsubmit = function (evt){
                evt.preventDefault();
                clearTimeout(timerId);
                timerId = setTimeout(q, 0, i+1);
            }
            document.getElementById("buttonNextQuestion").onclick = function (){
                clearTimeout(timerId);
                timerId = setTimeout(q, 0, i+1);
            }
            timerId = setTimeout(q, questions[i].time * 1000, i + 1);
        }

    });
}

function getResults(){
    let result = 0;
    for (let i = 0; i < playQuestions.length; i++){
        if (answers[i] == playQuestions[i].correctAnswer){
            result += 1;
        }
    }
    answers = [];
    return result;
}