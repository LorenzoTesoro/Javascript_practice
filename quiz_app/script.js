const api_url = 'https://the-trivia-api.com/v2/questions';
let questions_obj = {};

fetchQuestions();

async function fetchQuestions(){
    try{
        let response = await fetch(api_url);
        if(!response.ok){
            throw new Error("Errore HTTP, Status: " + response.status);
        }
        let questions_obj = await response.json();

        // append first question and relative options
        appendQuestion(questions_obj[0].question.text);

        // make one array
        appendOptions(questions_obj[0].correctAnswer, questions_obj[0].incorrectAnswers);
    } catch(error){
        console.error("Errore:", error);
    }
}

function appendQuestion(text){
    const question_container = document.querySelector('.question');
    question_container.textContent = "";
    question_container.textContent = text;
}
function appendOptions(...options){
    console.log(options);
    const options_container = document.querySelector('.options > ul');
    let counter = 0;

    options.forEach(element => {
        let option = '';
        if(typeof element === 'string'){
            option = `<li>
                        <input type="radio" name="answer" id="opt_${counter}">
                        <label for="opt_${counter}"><span class="option">${element}</span></label>
                      </li>`;
            options_container.innerHTML += option;
            counter++;
        } else {
            element.forEach(single_option => {
                option = `<li>
                            <input type="radio" name="answer" id="opt_${counter}">
                            <label for="opt_${counter}"><span class="option">${single_option}</span></label>
                          </li>`;
                options_container.innerHTML += option;
                counter++;
            });
        }
    });
}
