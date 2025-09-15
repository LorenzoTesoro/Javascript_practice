const api_url = 'https://the-trivia-api.com/v2/questions';
let questions_obj = {};
const button = document.querySelector('#sub-answer');
const modal = document.getElementById('modalScore');

let score = 0;
let question_counter = 0;

fetchQuestions();

button.addEventListener('click', function(e){

    if(question_counter === questions_obj.length - 1){
        let myModal = new bootstrap.Modal(modal, {});
        document.querySelector('#modalScore .modal-body').innerHTML = `<div>Your score is ${score}</div>`;
        myModal.show();
        return;
    } else {
        let selected_answer = document.querySelector('input:checked');
        checkCorrectAnswer(selected_answer);
        appendQuestion(questions_obj[question_counter].question.text);
        appendOptions(questions_obj[question_counter].correctAnswer, questions_obj[question_counter].incorrectAnswers);
    }
});




async function fetchQuestions(){
    try{
        let response = await fetch(api_url);
        if(!response.ok){
            throw new Error("Errore HTTP, Status: " + response.status);
        }
        questions_obj = await response.json();
        // append first question and relative options
        appendQuestion(questions_obj[question_counter].question.text);

        // make one array
        appendOptions(questions_obj[question_counter].correctAnswer, questions_obj[question_counter].incorrectAnswers);
    } catch(error){
        console.error("Errore:", error);
    }
}
function appendQuestion(text){
    const question_container = document.querySelector('.question');
    question_container.textContent = "";
    question_container.textContent = text;
}
function appendOptions(correctAnswer, incorrectAnswers){
    const answers = randomShuffle(correctAnswer, incorrectAnswers);
    const options_container = document.querySelector('.options > ul');
    options_container.innerHTML = "";
    let counter = 0;

    answers.forEach(element => {
        option = `<li>
                    <input type="radio" name="answer" id="opt_${counter}" value="${element}">
                    <label for="opt_${counter}"><span class="option">${element}</span></label>
                  </li>`;
        options_container.innerHTML += option;
        counter++;
    });

    button.disabled = true;
    document.querySelectorAll('input[name="answer"]').forEach(input => {
        input.addEventListener('change', () => {
            button.disabled = false;
        });
    });

    question_counter++; // increment counter n 
}
function randomShuffle(correctAnswer, incorrectAnswers){
    let response = [correctAnswer];
    incorrectAnswers.forEach(answer => response.push(answer));
    response.sort(function(a,b){
        return Math.random() - 0.5;
    });
    return response;
}
function checkCorrectAnswer(answer){
    if(answer.value === questions_obj[question_counter].correctAnswer) score++;
}
