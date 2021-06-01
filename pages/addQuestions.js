import View from "../View.js";
import Model from "../Model.js";

const resultsNode = document.getElementById('main');
const times = [30, 60, 90];
let questionBox;
let currentQuestions;
let currentQuestion;
let game_id;
let items = [];


export default {
    setData(newItems){
        items = newItems;
    },
    async render(gameId){
        currentQuestions = await Model.getQuestions(gameId);
        game_id = gameId;
        if (localStorage.currentQuestion && localStorage.gameId == gameId){
            currentQuestion = JSON.parse(localStorage.currentQuestion);
        }
        else{
            currentQuestion =
                {
                    type : 1,
                    questionId: currentQuestions.length,
                    time: 90
                };
            currentQuestions.push(currentQuestion);
            localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));
            localStorage.setItem("gameId", gameId);
        }

        localStorage.setItem("currentQuestions", JSON.stringify(currentQuestions));


        // localStorage.setItem("currentQuestions", JSON.stringify(currentQuestions));
        // localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));

        resultsNode.innerHTML = View.render('addQuestion', {list : items});
        document.getElementById("createQuestion").onsubmit = function (evt){
            evt.preventDefault();
        }
        questionBox = document.getElementById("question-box");
        questionBox.innerHTML = View.render('addQuestion1');
        renderQuestion();
        document.getElementById("questionSwitch4").onclick = changeQuestion4;
        document.getElementById("questionSwitch1").onclick = changeQuestion1;
        document.getElementById("addQuestion").onclick = addQuestion;
        document.getElementById("addQuestionM").onclick = addQuestion;
        document.getElementById("questionBack").onclick = questionBack;
        document.getElementById("questionBackM").onclick = questionBack;
        document.getElementById("questionFoward").onclick = questionFoward;
        document.getElementById("questionFowardM").onclick = questionFoward;
        document.getElementById("deleteQuestion").onclick = questionDelete;
        document.getElementById("questionTime").onclick = changeTime;
        document.getElementById("publishButton").onclick = publishGame;

    }
}

function changeQuestion1(){
    const form = document.getElementById("createQuestion");
    document.getElementById("questionSwitch1").style = "opacity: 100%";
    document.getElementById("questionSwitch4").style = "opacity: 40%";

    // let currentQuestion = JSON.parse(localStorage.currentQuestion);
    currentQuestion.type = 1;
    currentQuestion.question = form.elements.question.value;

    questionBox.innerHTML = View.render('addQuestion' + currentQuestion.type);
    document.getElementById('question').value = currentQuestion.question;

    // localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));

};

function changeQuestion4(){
    const form = document.getElementById("createQuestion");

    document.getElementById("questionSwitch1").style = "opacity: 40%";
    document.getElementById("questionSwitch4").style = "opacity: 100%";
    // let currentQuestion = JSON.parse(localStorage.currentQuestion);
    currentQuestion.type = 4;
    currentQuestion.question = form.elements.question.value;

    questionBox.innerHTML = View.render('addQuestion' + currentQuestion.type);
    document.getElementById('question').value = currentQuestion.question;

    // localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
};

function getData(){
    if (currentQuestion.type == 4){
        const form = document.getElementById("createQuestion");
        currentQuestion = {
            question: form.elements.question.value,
            answers: [
                form.elements.answer1.value,
                form.elements.answer2.value,
                form.elements.answer3.value,
                form.elements.answer4.value
            ],
            correctAnswer: form.elements.radio1.value,
            radioValue: form.elements.radio1.value,
            time: currentQuestion.time,
            type: 4,
            questionId: currentQuestion.questionId
        };
    }
    else{
        const form = document.getElementById("createQuestion");
        currentQuestion = {
            question: form.elements.question.value,
            correctAnswer: form.elements.answer1.value,
            time: currentQuestion.time,
            type: 1,
            questionId: currentQuestion.questionId
        };
    }
    return currentQuestion;
}

function renderQuestion(){
    questionBox.innerHTML = View.render('addQuestion' + currentQuestion.type);
    document.getElementById("questionTime").innerHTML = currentQuestion.time;

    if (currentQuestion.question){
        document.getElementById('question').value = currentQuestion.question;
    }

    if (currentQuestion.type == 4){
        if (currentQuestion.answers){
            document.getElementById("answer1").value = currentQuestion.answers[0];
            document.getElementById("answer2").value = currentQuestion.answers[1];
            document.getElementById("answer3").value = currentQuestion.answers[2];
            document.getElementById("answer4").value = currentQuestion.answers[3];
        }
        if (currentQuestion.radioValue){
            document.getElementById("radio" + currentQuestion.radioValue).checked = true;
        }
    }
    else{
        if (currentQuestion.correctAnswer){
            document.getElementById("answer1").value = currentQuestion.correctAnswer;
        }
    }
}

async function addQuestion(){
    currentQuestions[currentQuestion.questionId] = getData();
    currentQuestion =
        {
            type : currentQuestion.type,
            questionId: currentQuestions.length,
            time: currentQuestion.time
        };
    currentQuestions.push(currentQuestion);
    await Model.putQuestions(localStorage.gameId, currentQuestions);
    localStorage.setItem("currentQuestions", JSON.stringify(currentQuestions));
    localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));
    renderQuestion();
}

async function questionBack(){
    if (currentQuestions[currentQuestion.questionId-1]){
        currentQuestions[currentQuestion.questionId] = getData();
        await Model.putQuestions(localStorage.gameId, currentQuestions);
        currentQuestion = currentQuestions[currentQuestion.questionId-1];
        localStorage.setItem("currentQuestions", JSON.stringify(currentQuestions));
        localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));

        renderQuestion();
    }
}

async function questionFoward(){
    if (currentQuestions[currentQuestion.questionId+1]){
        currentQuestions[currentQuestion.questionId] = getData();
        await Model.putQuestions(localStorage.gameId, currentQuestions);
        currentQuestion = currentQuestions[currentQuestion.questionId+1];
        localStorage.setItem("currentQuestions", JSON.stringify(currentQuestions));
        localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));
        renderQuestion();
    }
}

function questionDelete(){
    const del_id = currentQuestion.questionId;
    currentQuestions.splice(del_id, 1);
    if (currentQuestions[del_id]){
        currentQuestion = currentQuestions[del_id];
        for (let i = del_id; i<currentQuestions.length;i++){
            currentQuestions[i].questionId -= 1;
        }
    }
    else {
        currentQuestion = currentQuestions[del_id - 1];
    }
    localStorage.setItem("currentQuestions", JSON.stringify(currentQuestions));
    localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));
    renderQuestion();
}

function changeTime(){
    let ind = times.indexOf(currentQuestion.time);
    if (times[ind+1]){
        currentQuestion.time = times[ind+1];
    }
    else{
        currentQuestion.time = times[0];
    }
    document.getElementById("questionTime").innerHTML = currentQuestion.time;
}

async function publishGame(){
    currentQuestion = getData()
    currentQuestions[currentQuestion.questionId] = currentQuestion;
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("currentQuestions");
    await Model.putQuestions(game_id, currentQuestions);
    window.location.href = window.location.href.split('/').slice(0, -2).join('/')
        + '/#games';
}