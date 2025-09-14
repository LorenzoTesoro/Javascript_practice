const timer = setInterval(showTimeRemaining, 1000);

function showTimeRemaining(){

    const now = new Date();
    const targetDate = new Date(now.getFullYear() + 1, 0, 1, '00.00', '00.00');
    const timeRemaining = targetDate - now; // time in milliseconds

    if(timeRemaining <= 0){
        clearInterval(timer);
        return;
    }

    const months = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)) % 30;
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    appendTimeRemaining('months', months);
    appendTimeRemaining('days', days);
    appendTimeRemaining('hours', hours);
    appendTimeRemaining('minutes', minutes);
    appendTimeRemaining('seconds', seconds);
}

function appendTimeRemaining(type, value){
    let element = document.querySelector(".countdown." + type + " .value");
    element.textContent = '';
    element.textContent = value;
}