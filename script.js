
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

const toggle = document.querySelector('.toggle');
const skipButton = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');


function togglePlay(params) {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}

function skip(){
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handelRange(){
    video[this.name] = this.value;

}

function handelProgress(){
    const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);

video.addEventListener('pause',updateButton);
toggle.addEventListener('click',togglePlay);

video.addEventListener('timeupdate', handelProgress);

skipButton.forEach(button=>button.addEventListener('click',skip));

ranges.forEach(range => range.addEventListener('change',handelRange));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);