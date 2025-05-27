import { musicians } from './musicians.js';

const musicianLastAdded = musicians[musicians.length - 1];

const personalInfo = {
    fName: 'Bedelya',
    age: 21,
    ocupation: 'student',
    areaOfStudy: 'Computing'
};

document.addEventListener('DOMContentLoaded', () => {
    const introSource = document.getElementById('intro-text-template').innerHTML;
    const introTemplate = Handlebars.compile(introSource);
    const introData = {
        introParagraph1: `Hello! I am ${personalInfo.fName}, a ${personalInfo.age} year old ${personalInfo.ocupation} who is currently studying ${personalInfo.areaOfStudy}, hoping to specialise in Software Development.`,
        introParagraph2: "I created this website to keep track of my ever changing underrated favourite musicians and promote them. I strongly advise you to check all of them out and give their music a listen! Below you will find the latest musician that got added to the list of musicians!"
    };
    document.getElementById('intro-text-container').innerHTML = introTemplate(introData);

    const musicianSource = document.getElementById('latest-musician-template').innerHTML;
    const musicianTemplate = Handlebars.compile(musicianSource);
    const musicianData = {
        userName: musicianLastAdded.userName,
        genre: musicianLastAdded.genreOfMusic,
        pfpURL: musicianLastAdded.pfpURL,
        favSong: musicianLastAdded.favSong,
        dateAdded: new Date().toLocaleDateString('en-GB')
    };
    document.getElementById('latest-musician-container').innerHTML = musicianTemplate(musicianData);
});

