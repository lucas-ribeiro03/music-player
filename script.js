let musicas = [
    {titulo: 'A truly dazzling dream ', artista: 'National Sweetheart', src: 'musics/A Truly Dazzling Dream - National Sweetheart.mp3', img: 'images/apolo-photographer-xmksM4em7a0-unsplash.jpg'},
    {titulo: 'Arm Wrestler ', artista: 'International Sweetheart', src: 'musics/Arm Wrestler - National Sweetheart.mp3', img: 'images/luana-azevedo-YBTLqyeSpoY-unsplash.jpg'},
    {titulo: 'The Center Isnt Holding', artista: 'All in vein', src: 'musics/The Center Isnt Holding - National Sweetheart.mp3', img: 'images/luana-azevedo-YBTLqyeSpoY-unsplash.jpg'},
    {titulo: 'Tasty Waves', artista: 'Deftones', src: 'musics/Tasty Waves - National Sweetheart.mp3', img: 'images/mikkel-bech-OwMIhcZu_X8-unsplash.jpg'}
];

let indexMusic = 0;
let music = document.querySelector('audio');
let tocar = document.querySelector('.botao-play');
let pausar = document.querySelector('.botao-pause');
let musicTime = document.querySelector('.fim');
let image = document.querySelector('img');
let musicName = document.querySelector('.descricao h2');
let artistName = document.querySelector('.descricao i');
let previousSong = document.querySelector('.previous');
let nextSong = document.querySelector('.next');
let progressBar = document.querySelector('.barra');
let progressDot = document.querySelector('.ponto');
let arrastando = false;

renderMusic(indexMusic);

function playMusic(){
    music.play();
    pausar.style.display = 'block';
    tocar.style.display = 'none';
}

tocar.addEventListener('click', playMusic);

function pauseMusic(){
    music.pause();
    pausar.style.display = 'none';
    tocar.style.display = 'block';
}

pausar.addEventListener('click', pauseMusic);


previousSong.addEventListener('click', () => {
    indexMusic = (indexMusic > 0) ? indexMusic - 1 : musicas.length - 1;
    renderMusic(indexMusic);
    playMusic();
    
});
nextSong.addEventListener('click', () => {
    indexMusic = (indexMusic < musicas.length -1) ? indexMusic + 1 : 0;
    renderMusic(indexMusic);
    playMusic();
});

function barUpdate(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((music.currentTime / music.duration) * 100) + "%";
    let updateTime = document.querySelector('.inicio');
    updateTime.textContent = secondsToMinutes(Math.floor(music.currentTime));
}

function secondsToMinutes(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos + ':' + campoSegundos;
}

music.addEventListener('timeupdate', barUpdate);

function renderMusic(index){
    music.setAttribute('src', musicas[index].src)
    music.addEventListener('loadeddata', () =>{
        musicName.textContent = musicas[index].titulo;
        artistName.textContent = musicas[index].artista;
        image.src = musicas[index].img;
        musicTime.textContent = secondsToMinutes(Math.floor(music.duration));

    })
    
}

progressDot.addEventListener('mousedown', () => {
    arrastando = true;
    music.pause();
});

progressBar.addEventListener('mousemove', (event) =>{
    if (arrastando){
        let mouseX = event.clientX - progressBar.getBoundingClientRect().left;
        let porcentagem = mouseX / progressBar.offsetWidth;
        let newPosition = porcentagem * music.duration;

        music.currentTime = newPosition;
        barUpdate();

        if(music.paused){
            playMusic();
        }
    }
});

document.addEventListener('mouseup', () => {
    if(arrastando) {
        arrastando = false;
        playMusic();
    }
});

music.addEventListener('ended', () => {
    indexMusic = (indexMusic < musicas.length - 1) ? indexMusic + 1 : 0;
    renderMusic(indexMusic);
    playMusic();
})