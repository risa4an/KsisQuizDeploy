const db = firebase.firestore();

export default {
    async getGames(){
        let games = [];
        const querySnapshot = await db.collection("games").get();
        querySnapshot.forEach((doc) => {
            games.push(doc.data());
            console.log(`${doc.id} => ${doc.data()}`);
        });
        return games;
    },
    async getGamesDic(){
        const games = {};
        const querySnapshot = await db.collection("games").get();
        querySnapshot.forEach((doc) => {
            games[doc.id] = doc.data();
            console.log(`${doc.id} => ${doc.data()}`);
        });
        return games;
    },
    async putNewGame(data){
        const date = new Date();
        const id = date.getFullYear().toString() +
            date.getMonth().toString() + date.getDate().toString() +
            date.getHours().toString() + date.getMinutes().toString();
        const game = {
            gameImage: data.gameImage,
            gameName: data.gameName,
            gameCreator: "Kate",
            numOfQuestions: 0,
            gameId: id,
            questions: []
        }
        await db.collection("games").doc(id).set(game);
        return id
    },
    async getQuestions(gameId){
        const games = await this.getGamesDic();
        return games[gameId].questions;
    },
    async putQuestions(gameId, questions){
        const games = await this.getGamesDic();
        let game = games[gameId];
        // let question = {};
        // if (data.type == 4){
        //     question = {
        //         question: data.question,
        //         answers: data.answers,
        //         correctAnswer: data.correctAnswer,
        //         time: data.time,
        //         type: data.type,
        //         questionId: data.questionId
        //     };
        // }
        // else {
        //     question = {
        //         question: data.question,
        //         correctAnswer: data.correctAnswer,
        //         time: data.time,
        //         type: data.type,
        //         questionId: data.questionId
        //     };
        // }
        game.questions = questions;
        game.numOfQuestions = questions.length;
        db.collection("games").doc(gameId).set(game);
        return game.questions.length;
    },
    async getQuestion(gameId, questionId){
        const games = await this.getGamesDic();
        return games[gameId].questions[questionId];
    }
}