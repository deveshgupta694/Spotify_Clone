// console.log("lets begin wiht JS");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3')
let masterplay = document.getElementById('masterPlay')
let myProgreebar = document.getElementById('myProgress')
let gif = document.getElementById('gif')
let songItem = Array.from(document.getElementsByClassName('songItem'))
let songName = document.querySelector('#songName')

// audioElement.play(); 

let songs = [ 
    {songsName : "Mortals" , filePath : "songs/1.mp3" , coverPath : "covers/1.jpg"},
    {songsName : "Cielo" , filePath : "songs/2.mp3" , coverPath : "covers/2.jpg"},
    {songsName : "Invincible" , filePath : "songs/3.mp3" , coverPath : "covers/3.jpg"},
    {songsName : "MyHeart" , filePath : "songs/4.mp3" , coverPath : "covers/4.jpg"},
    {songsName : "Tonight" , filePath : "songs/5.mp3" , coverPath : "covers/5.jpg"},
    {songsName : "AllBlack" , filePath : "songs/6.mp3" , coverPath : "covers/6.jpg"},
    {songsName : "HereWeGo" , filePath : "songs/7.mp3" , coverPath : "covers/7.jpg"},
    {songsName : "Mortals" , filePath : "songs/8.mp3" , coverPath : "covers/8.jpg"},
    {songsName : "Unstopable" , filePath : "songs/9.mp3" , coverPath : "covers/9.jpg"},
]


songItem.forEach((elem , i) => {
    elem.getElementsByTagName('img')[0].src = songs[i].coverPath
    elem.getElementsByClassName('songName')[0].innerText = songs[i].songsName
    elem.getElementsByClassName('timestamp').innerText = songs[i].filePath.duration
});

//manage play pause clik
masterplay.addEventListener('click' , ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0)
    {
        audioElement.play();
        masterplay.classList.remove('fa-circle-play')
        masterplay.classList.add('fa-circle-pause')
        gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause')
        masterplay.classList.add('fa-circle-play')
        gif.style.opacity = 0;

    }

    if(list[songIndex].classList.contains('fa-circle-pause'))
    {
        list[songIndex].classList.remove('fa-circle-pause')
        list[songIndex].classList.add('fa-circle-play')
    }
    else
    {
        list[songIndex].classList.remove('fa-circle-play')
        list[songIndex].classList.add('fa-circle-pause')
    }
})

audioElement.addEventListener('timeupdate' , () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100 )
    myProgreebar.value = progress;
})

myProgreebar.addEventListener('change' , ()=>{
    audioElement.currentTime = (myProgreebar.value * audioElement.duration) / 100;
})

let list = document.getElementsByClassName('songItemPlay')

const makeAllPlayButton = function(){
    Array.from(list).forEach((elem , i) => {
        if(elem.classList.contains('fa-circle-pause'))
        {
            elem.classList.remove("fa-circle-pause")
            elem.classList.add("fa-circle-play")
        }
    })
}

Array.from(list).forEach((elem , i) =>{
    elem.addEventListener('click' , (event)=>{
        if(elem.classList.contains('fa-circle-pause'))
        {
            elem.classList.remove('fa-circle-pause')
            elem.classList.add('fa-circle-play')
            audioElement.pause();
            masterplay.classList.remove('fa-circle-pause')
            masterplay.classList.add('fa-circle-play')
        }
        else
        {
            makeAllPlayButton();
            elem.classList.remove("fa-circle-play");
            elem.classList.add("fa-circle-pause");
            songIndex = i;
            audioElement.src = songs[songIndex].filePath;
            if(masterplay.classList.contains('fa-circle-play'))
            {
                masterplay.classList.remove("fa-circle-play")
                masterplay.classList.add("fa-circle-pause") 
            }
            audioElement.currentTime = 0;
            songName.innerText = songs[songIndex].songsName;
            audioElement.play();
            gif.style.opacity = 1;
        }
    }) 
})

const fun = function(){
    audioElement.src = songs[songIndex].filePath
    if(masterplay.classList.contains('fa-circle-play'))
    {
        masterplay.classList.remove("fa-circle-play")
        masterplay.classList.add("fa-circle-pause") 
    }
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
}

document.querySelector('#prevPlay').addEventListener('click' , (event)=>{
    songIndex--;
    if(songIndex < 0)songIndex = 8
    fun();
    makeAllPlayButton();
    list[songIndex].classList.remove('fa-circle-play')
    list[songIndex].classList.add('fa-circle-pause')
    songName.innerText = songs[songIndex].songsName
})

document.querySelector('#nextPlay').addEventListener('click' , (event)=>{
    songIndex++;
    songIndex %= 9;
    fun();
    makeAllPlayButton();
    list[songIndex].classList.remove('fa-circle-play')
    list[songIndex].classList.add('fa-circle-pause')
    songName.innerText = songs[songIndex].songsName
})

let timeInterval;

audioElement.addEventListener('play', () => {
    timeInterval = setInterval(() => {
        console.log(parseInt(audioElement.currentTime));
    }, 1000);
});

audioElement.addEventListener('pause', () => {
    clearInterval(timeInterval);
});
