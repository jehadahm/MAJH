document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("J4ABIGk20oLKXX8pP");  // تأكد من إدخال معرف المستخدم الصحيح

    const form = document.getElementById('userForm');
    const startChallengeContainer = document.getElementById('startChallengeContainer');
    const questionsContainer = document.getElementById('questionsContainer');
    const resultContainer = document.getElementById('resultContainer');
    const timerElement = document.getElementById('timer');
    const startChallengeButton = document.getElementById('startChallenge');
    const submitAnswersButton = document.getElementById('submitAnswers');
    const sendEmailButton = document.getElementById('sendEmail');
    let questions = [];
    let startTime;
    let timerInterval;
    let score = 0;
    let totalTime = 0;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.style.display = 'none';
        startChallengeContainer.style.display = 'flex';
    });

    startChallengeButton.addEventListener('click', function() {
        startChallengeContainer.style.display = 'none';
        questionsContainer.style.display = 'block';
        timerElement.style.display = 'block';
        startTime = new Date().getTime();
        startTimer();
        generateQuestions();
        const inputs = document.querySelectorAll('#questionsList input');
        inputs.forEach(input => {
            input.disabled = false;
        });
        submitAnswersButton.disabled = false;
    });

    function startTimer() {
        timerInterval = setInterval(() => {
            const now = new Date().getTime();
            const timeElapsed = Math.floor((now - startTime) / 1000);
            timerElement.textContent = `الوقت: ${timeElapsed} ثانية`;
        }, 1000);
    }

    function generateQuestions() {
        questions = [];
        for (let i = 0; i < 5; i++) {
            const num1 = Math.floor(Math.random() * 90) + 10;
            const num2 = Math.floor(Math.random() * 90) + 10;
            questions.push({ q: `${num1} × ${num2} = ?`, answer: num1 * num2 });
        }
        const questionsList = document.getElementById('questionsList');
        questionsList.innerHTML = '';
        questions.forEach((question, index) => {
            const div = document.createElement('div');
            div.classList.add('question');
            div.innerHTML = `
                <label>${index + 1}. ${question.q}</label>
                <input type="number" data-index="${index}" disabled>
            `;
            questionsList.appendChild(div);
        });
    }
    function generateCertificate(score, totalTime) {
        return `
            <div class="certificate">
                <h2>شهادة إتمام</h2>
                <p>الطالب: ${form.elements[0].value}</p>
                <p>الصف: ${form.elements[1].value}</p>
                <p>الشعبة: ${form.elements[2].value}</p>
                <p>إجابات صحيحة: ${score} من ${questions.length}</p>
                <p>الوقت المستغرق: ${totalTime} ثانية</p>
            </div>
        `;
    }

    submitAnswersButton.addEventListener('click', function() {
        clearInterval(timerInterval);
        score = 0;
        totalTime = (new Date().getTime() - startTime) / 1000;
        const inputs = document.querySelectorAll('#questionsList input');
        inputs.forEach(input => {
            const index = input.getAttribute('data-index');
            if (parseInt(input.value) === questions[index].answer) {
                score++;
            }
        });
        const certificateHtml = generateCertificate(score, totalTime);
        resultContainer.innerHTML = certificateHtml;
        sendEmailButton.style.display = 'inline-block';
    });

    sendEmailButton.addEventListener('click', function() {
        const templateParams = {
            to_email: 'recipient@example.com',
            student_name: form.elements[0].value,
            student_class: form.elements[1].value,
            student_section: form.elements[2].value,
            score: score,
            total_questions: questions.length,
            total_time: totalTime
        };

        emailjs.send('service_08ja065', 'template_svxrlcf', templateParams)
            .then(function(response) {
                console.log('تم إرسال البريد الإلكتروني بنجاح!', response.status, response.text);
                alert('تم تسجيل طلبك بنجاح!');
            }, function(error) {
                console.log('فشل في إرسال البريد الإلكتروني...', error);
                alert('فشل تسجيل طلبك: ' + JSON.stringify(error));
            });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const startChallengeContainer = document.getElementById('startChallengeContainer');
    const questionsContainer = document.getElementById('questionsContainer');
    const resultContainer = document.getElementById('resultContainer');
    const timerElement = document.getElementById('timer');
    const startChallengeButton = document.getElementById('startChallenge');
    const submitAnswersButton = document.getElementById('submitAnswers');
    let questions = [];
    let startTime;
    let timerInterval;
    let score = 0;
    let totalTime = 0;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.style.display = 'none';
        startChallengeContainer.style.display = 'flex';
    });

    startChallengeButton.addEventListener('click', function() {
        startChallengeContainer.style.display = 'none';
        questionsContainer.style.display = 'block';
        timerElement.style.display = 'block';
        startTime = new Date().getTime();
        startTimer();
        generateQuestions();
        const inputs = document.querySelectorAll('#questionsList input');
        inputs.forEach(input => {
            input.disabled = false;
        });
        submitAnswersButton.disabled = false;
    });

    function startTimer() {
        timerInterval = setInterval(() => {
            const now = new Date().getTime();
            const timeElapsed = Math.floor((now - startTime) / 1000);
            timerElement.textContent = `الوقت: ${timeElapsed} ثانية`;
        }, 1000);
    }
})