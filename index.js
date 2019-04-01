'use strict';

var questionsAndAnswers = [
    {
        num: 1,
        question: 'What is the fan name of the official book based on Hamilton the Musical?',
        ans1: 'The Hamil-Archive',
        ans2: 'The Hamiltome' ,
        ans3: 'Hamilton Encyclopedia' ,
        ans4: 'The Hamilbook'
    },

    {
        num: 2,
        question: 'What year did Hamilton the musical go to Broadway?',
        ans1: ' 2016',
        ans2: '2018 ' ,
        ans3: '2017' ,
        ans4: '2015'
    },

    {
        num: 3,
        question: 'What podcast is referenced in the song “We Know”?',
        ans1: 'The United States of Anxiety',
        ans2: 'My Brother, My Brother and Me' ,
        ans3: 'The Last Podcast On The Left' ,
        ans4: 'Criminal'
    },

    {
        num: 4,
        question: 'What theater did Hamilton debut in New York?',
        ans1: 'Circle in the Square Theater ',
        ans2: 'The Public Theater' ,
        ans3: 'August Wilson Theater' ,
        ans4: 'Gershwin Theater'
    },

    {
        num: 5,
        question: 'Who wrote the musical?',
        ans1: 'Stephen Schwartz ',
        ans2: 'Cole Porter ' ,
        ans3: 'Lin-Manuel Miranda' ,
        ans4: 'Stephen Sondheim'
    },

    {
        num: 6,
        question: 'The song “Dear Theodosia” that takes place after the birth of Alexander Hamilton’s first child.  What inspired this song?',
        ans1: 'The birth of the writer’s first child ',
        ans2: 'The writer adopting his dog' ,
        ans3: 'The best pizza the writer has ever eaten' ,
        ans4: 'Nothing'
    },

    {
        num: 7,
        question: 'Who directed Hamilton the Musical?',
        ans1: 'Thomas Kail',
        ans2: ' Andrew Lloyd Webber' ,
        ans3: 'Jeffery Sellers' ,
        ans4: 'Alex Lacamoire'
    },

    {
        num: 8,
        question: 'Where was Alexander Hamilton born?',
        ans1: 'The Caribbean',
        ans2: 'Scotland' ,
        ans3: 'Connecticut' ,
        ans4: 'New York'
    },

    {
        num: 9,
        question: 'Who was the first actor to play Alexander Hamilton?',
        ans1: 'Javier Munoz',
        ans2: 'Robin De Jesus' ,
        ans3: 'Lin-Manuel Miranda' ,
        ans4: 'Austin Scott'
    },

    {
        num: 10,
        question: 'How many songs are in Hamilton the Musical?',
        ans1: '12',
        ans2: '21' ,
        ans3: '46' ,
        ans4: '34'
    }
]

var rightAns = [
    'The Hamiltome',
    '2015',
    'My Brother, My Brother and Me',
    'The Public Theater',
    'Lin-Manuel Miranda',
    'The writer adopting his dog',
    'Thomas Kail',
    'The Caribbean',
    'Lin-Manuel Miranda' ,
    '46'
]


//starts question counter
var questionNum = 1;

// start of amount of right answers for beginning
var rightAnsCounter = 0;


// user stories/breakdown

// 1. create skevaron of question page
// 2. make event listener for the user clicking the start button
// 3. make event listener for submit button click
// 4. make event listener for nav buttons (forward and back on questions)
// 5. var user know when the question is right or wrong




function questionSitePage(rightAnsCounter, q, qAnswered) {
    // generates the form for the question on the click of start quiz, also
    console.log(q)
    
    return `

    <img class= "star-logo" src="https://1z1pdp2cr5ea30i3a81fh4af-wpengine.netdna-ssl.com/wp-content/themes/hamilton-theme/img/HAM_LOGO_02.svg" 
    alt ="hamilton-star-logo" />

    <section class="question-page" role= "main">
        <h2 class="question">${q.question}</h2>

        <form>
            <fieldset>
                <label>
                    <input class = "answer" type = "radio" name="option" checked></input>
                    <span>${q.ans1}</span>
                </label>

                <label>
                    <input class="answer" type="radio" name="option"></input>
                    <span>${q.ans2}</span>
                </label>
        
                <label>
                    <input class="answer" type="radio" name="option"></input>
                    <span>${q.ans3}</span>
                </label>
        
                <label>
                    <input class="answer" type="radio" name="option"></input>
                <span>${q.ans4}</span>
                </label>
            </fieldset>
            <button class="js-submit">Submit</button>
        </form>
        <div class="bumper"></div>
        <div class="image-wrapper">
        <img class="silhouette-logo" src="https://1z1pdp2cr5ea30i3a81fh4af-wpengine.netdna-ssl.com/wp-content/themes/hamilton-theme/img/home-silo.svg"
        width="1425px" height="200px" alt="hamilton-silhouette-logo"/>
        </div>
        

        <div class="count-and-score">
            <span class ="question-counter"> Question: ${q.num}/10</span>
            <span class="score-counter">Score: ${rightAnsCounter}/${qAnswered}</span>
        </div>

    </section>
    `;    
}

function onClickStartButton() {
    // runs questionSitePage on start button
    //test 2

    console.log('sup')

    $(".js-start-quiz-button").click(function(event) {
        questionProgression();
    });
}

function onClickSubmitButton() {
// stops autosubmit of results after each submit and checks if answer
// is right or wrong
console.log('pp')

$('.container').on('click', ".js-submit", function(event) {
        event.preventDefault()

        var answer = $('input:checked').siblings('span');
        var userIsRight = checkAnswer(answer);
        if (userIsRight) {
            givesRightFeedback();
        }
        else {
            givesWrongFeedback(); 
        }
    });
}


function onClickNextButton(){
    console.log('yo')
    //updates the counter for correct answers and sends you to
    //the results page
    $('.container').on('click', '.js-next-button', function(event) {
        if(questionNum === 10) {
            resultsPage(rightAnsCounter);
        }
        else {
            addToQuestionCounter();
            questionProgression(); 
        }
    });
}

function onClickRestartButton(){
    //resets correct answers counter and starts you over at question one
    $('.container').on('click', '.js-restart', function(event) {

        questionNum = 1;
    
        rightAnsCounter = 0;
        console.log('??')
        questionProgression();
    });
}

function checkAnswer(answer){
    //compares user answer to actual answers returns true or false
    if (answer.text() === rightAns[questionNum - 1] ) {
        return true;
        }
    else {
        return false;
        }
    }
function questionProgression() {
    //moves through the questions

    var q = questionsAndAnswers[questionNum - 1];
    var qAnswered = questionNum - 1;
  
    $(".container").html(questionSitePage(rightAnsCounter, q, qAnswered));
}

function addToQuestionCounter(){
    // add to question counter
    questionNum++;
}

function addToRightAnswerCounter(){
    // add to right answer counter
    rightAnsCounter++;
}

function givesRightFeedback(){
    //generates you got it! or something like that when user 
    // submits correct answer to the question
    $('.container').html(rightFeedback);
    addToRightAnswerCounter();
}

var rightFeedback = `
<section class='feedback' role="main">
    <img class= "star-logo" src="https://1z1pdp2cr5ea30i3a81fh4af-wpengine.netdna-ssl.com/wp-content/themes/hamilton-theme/img/HAM_LOGO_02.svg" 
    alt ="hamilton-star-logo" />

    <h2> You got it!</h2>
    <button class="js-next-button">On to the next!</button>
    <br>
    <div class="image-wrapper">
    <img class="silhouette-logo" src="https://1z1pdp2cr5ea30i3a81fh4af-wpengine.netdna-ssl.com/wp-content/themes/hamilton-theme/img/home-silo.svg"
    width="1425px" height="160px" alt="hamilton-silhouette-logo"/>
    </div>

</section>
`;




function givesWrongFeedback(){
    // generates you're wrong, here's the right answer or something like 
    // that when user submits wrong idea
    $('.container').html(wrongFeedbackTemplate(questionNum));

}
function wrongFeedbackTemplate(){
    return `
        <section class="feedback" role="main"> 
            <img class= "star-logo" src="https://1z1pdp2cr5ea30i3a81fh4af-wpengine.netdna-ssl.com/wp-content/themes/hamilton-theme/img/HAM_LOGO_02.svg" 
            alt ="hamilton-star-logo" />

            <h2> Sorry, it was ${rightAns[questionNum - 1]}.</h2>
            <button class="js-next-button">On to the next!</button>
            <br>
            <div class="image-wrapper">
            <img class="silhouette-logo" src="https://1z1pdp2cr5ea30i3a81fh4af-wpengine.netdna-ssl.com/wp-content/themes/hamilton-theme/img/home-silo.svg"
            width="1425px" height="160px" alt="hamilton-silhouette-logo"/>
            </div>

        </section>
    `;
}

function resultsPage(){
    //creates results page at the end of quiz
    $('.container').html(`
    <section class="results-page" role="main">
        <img class= "star-logo" src="https://1z1pdp2cr5ea30i3a81fh4af-wpengine.netdna-ssl.com/wp-content/themes/hamilton-theme/img/HAM_LOGO_02.svg" 
        alt ="hamilton-star-logo" />
        
        <h2>Final Score: ${rightAnsCounter} out of 10</h2>
        <button class="js-restart">One More Time?</button>

        <div class="image-wrapper">
        <img class="silhouette-logo" src="https://1z1pdp2cr5ea30i3a81fh4af-wpengine.netdna-ssl.com/wp-content/themes/hamilton-theme/img/home-silo.svg"
        width="1425px" height="200px" alt="hamilton-silhouette-logo"/>
        </div>

    </section>
  `);
}
function forAllTheButtons() {
    //runs all the functions that have event listeners to the page is
    // ready for clicks

    onClickStartButton();
    onClickSubmitButton();
    onClickNextButton();
    onClickRestartButton();
}
forAllTheButtons();