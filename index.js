/*
 *@author: vinhup
 */  


 const $ = document.querySelector.bind(document)
 const $$ = document.querySelectorAll.bind(document)

 const container = $('.happy-birth-day')
 const title = $('.title')
 const bubblesElement = $('.bubbles')
 const timer = $('#timer')

 const cake = $('.cake')

 // Select the timer elements
const hoursElem = $('#hours>span:first-child');
const minutesElem = $('#minutes>span:first-child');
const secondsElem = $('#seconds>span:first-child');

// Select the lights elements
const lightList = $$('.light')

// Select the candles
const candles = $('.candles')

// Select the flame
const flameOne = $('.f-1')
const flameTwo = $('.f-2')

// blow button
const blowButton = $('.blow')

// text
const text = $('.text')

// cat dance
const catDances = $$('.cat-dance')

 const randomInRange =(min, max) =>{
    return Math.random() * (max - min) + min;
  }

const createBubbles =() =>{
    const bubbleCount = 50;
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 40 + 10; // Size between 10px and 50px
        const left = Math.random() * 100; // Horizontal position as percentage
        const duration = Math.random() * 5 + 3; // Duration between 3s and 8s

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        bubblesElement.appendChild(bubble);
    }
}

  // Function to update the timer display
const updateTimer =(seconds) =>{
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    hoursElem.innerHTML = hours.toString().padStart(2, '0');
    minutesElem.innerHTML = minutes.toString().padStart(2, '0');
    secondsElem.innerHTML = secs.toString().padStart(2, '0');
}

const showLights = ()=>{
  lightList.forEach((light)=>{
    light.style.animation = 'light-glow 1.5s infinite'
  })
}

const turnOffLights = ()=>{
  lightList.forEach((light)=>{
    light.classList.add('opacity')
    light.style.animation = ''
  })
}

const countdown = (countdownTime)=> {
    return new Promise((resolve) => {
        const countdownInterval = setInterval(() => {
            if (countdownTime< 0) {
            clearInterval(countdownInterval);
            resolve()
            // Optional: Alert when the countdown is complete
            timer.classList.add('fade-out')
        } else {
            updateTimer(countdownTime);
            countdownTime--;
        }
        }, 1000);
    });
}

const disAppear = (el)=>{
  el.style.animation = 'disappear 1s forwards'
}

  window.onload = function() {
    // Set the countdown time (in seconds)
    const countdownTime = 3; // Example: 1 hour countdown (3600 seconds)
    
    // Initial call to set the timer display
    countdown(countdownTime).then(showLights).then(createBubbles)
};

// function randomInRange(min, max) {
//   return Math.random() * (max - min) + min;
// }
   // Hàm để tạo pháo hoa ở các vị trí cụ thể
   function createConfetti(x, y, angle, spread) {
    confetti({
      particleCount: 100,
      angle: angle,
      spread: spread,
      origin: { x: randomInRange(x, y), y: Math.random() - 0.2 },
      zIndex: 9999
    });
  }

  // Hàm để kích hoạt pháo hoa ở hai bên màn hình
  function triggerFireworks() {
    // Pháo hoa bên trái màn hình
    createConfetti(0.1, 0.5, 90, 90); // Góc 90 độ và spread 60

    // Pháo hoa bên phải màn hình
    createConfetti(0.9, 0.5, 270, 90); // Góc 270 độ và spread 60
  }


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const blow = async()=>{
  flameOne.classList.add('opacity')
  flameTwo.classList.add('opacity')

  await delay(1000)
  disAppear(title)
  disAppear(blowButton)
  disAppear(cake)

  await delay(2000)
  turnOffLights() 

  await delay(1000)
  container.classList.remove('bg-phase-1')
  container.classList.add('bg-phase-2')

  await delay(1000)
  text.style.display = 'flex'
  // anime({
  //   targets: '.text',
  //   scale: [0.5, 1], // Từ scale 0.5 đến 1
  //   opacity: [0, 1], // Từ opacity 0 đến 1
  //   duration: 500, // Thời gian diễn ra hiệu ứng (1 giây)
  // });

  await delay(25000)
  setInterval(triggerFireworks,1800)
  catDances.forEach(i=>{
    i.style.display = 'block'
  })
}

blowButton.addEventListener('click',blow)

