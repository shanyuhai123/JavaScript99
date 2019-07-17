// Get Our Elements 
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build Our Functions
function togglePlay(e) {
  // 因为刚开始调用错对象，所以此处添加了阻止冒泡的事件
  e.stopPropagation();
  video.paused ? video.play() : video.pause();

  // 虽然常规来说，可以直接在此处更改按钮的状态，但是更好的方法是监听播放器的状态，一旦处于暂停状态，按钮的样式就发生变化
}

function updateButton() {
  // 解释下为什么这里可以使用 this
  // 因为 togglePlay 函数还被 toggle 按钮调用， this 会指向 toggle
  // 而该函数仅被 video 调用
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  const { skip } = this.dataset;
  video.currentTime += parseFloat(skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (this.currentTime / this.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));