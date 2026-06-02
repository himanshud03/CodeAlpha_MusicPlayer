const songs = [

{
title:"Song One",
artist:"Artist One",
src:"songs/song1.mp3",
cover:"images/cover1.jpg"
},

{
title:"Song Two",
artist:"Artist Two",
src:"songs/song2.mp3",
cover:"images/cover2.jpg"
},

{
title:"Song Three",
artist:"Artist Three",
src:"songs/song3.mp3",
cover:"images/cover3.jpg"
}

];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const playlist = document.getElementById("playlist");

function loadSong(index){

audio.src = songs[index].src;
title.textContent = songs[index].title;
artist.textContent = songs[index].artist;
cover.src = songs[index].cover;

}

loadSong(currentSong);

playBtn.addEventListener("click",()=>{

if(audio.paused){

audio.play();
playBtn.textContent="⏸";

}else{

audio.pause();
playBtn.textContent="▶";

}

});

nextBtn.addEventListener("click",()=>{

currentSong++;

if(currentSong >= songs.length){

currentSong = 0;

}

loadSong(currentSong);
audio.play();

});

prevBtn.addEventListener("click",()=>{

currentSong--;

if(currentSong < 0){

currentSong = songs.length - 1;

}

loadSong(currentSong);
audio.play();

});

audio.addEventListener("timeupdate",()=>{

progress.max = audio.duration;

progress.value = audio.currentTime;

currentTimeEl.textContent =
formatTime(audio.currentTime);

durationEl.textContent =
formatTime(audio.duration);

});

progress.addEventListener("input",()=>{

audio.currentTime = progress.value;

});

volume.addEventListener("input",()=>{

audio.volume = volume.value;

});

function formatTime(time){

if(isNaN(time)) return "0:00";

let min = Math.floor(time / 60);
let sec = Math.floor(time % 60);

if(sec < 10) sec = "0" + sec;

return `${min}:${sec}`;

}

songs.forEach((song,index)=>{

let li = document.createElement("li");

li.textContent =
song.title + " - " + song.artist;

li.addEventListener("click",()=>{

currentSong = index;

loadSong(currentSong);

audio.play();

});

playlist.appendChild(li);

});

/* Auto Play Next Song */

audio.addEventListener("ended",()=>{

currentSong++;

if(currentSong >= songs.length){

currentSong = 0;

}

loadSong(currentSong);

audio.play();

});