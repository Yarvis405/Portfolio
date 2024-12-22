'use strict'

import { createApp as create } from 'https://unpkg.com/petite-vue?module';
import { initializeApp/*, database, firestore*/ } from 'https://cdn.jsdelivr.net/npm/firebase@9.23.0/firebase-app.js';
//import { firebaseConfig } from './.service/init.service.js';
//import { databaseConfig } from './.service/database.service.js';
//import { firestoreConfig } from './.service/database.service.js';
//import { initializeApp } from 'firebase/app'

console.log(initializeApp)

//===================================================================

let html = document.querySelector('body')
html.style.width = `${window.innerWidth}px`
html.style.height = `${window.innerHeight}px`

//const repo = []

//===================================================================

//DOM================================================================

const link = document.querySelector('#link');
const img = document.querySelector('#img');

//===================================================================

//BANNER=============================================================

/*
.banner .item .img{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 0px;
  flex-grow: 1;
  object-fit: cover;
  opacity: 8;
  transition: 1s ease;
}


.banner .item .img:hover {
  cursor: crosshair;
  width: 20rem;
  opacity: 1;
  filter: contrast(120%);
}

*/

/*
link.addEventListener('mouseenter', () => {
  alert('in')

  img.style = `
    display: flex; 
    justify-content: center; 
    align-items: center; 
    padding: 0; 
    width: 0px; 
    flex-grow: 1; 
    object-fit: cover; 
    opacity: 8; 
    transition: 1s ease;
  `

});

link.addEventListener('mouseleave', () => {
  alert('out')

  img.style = `
    cursor: crosshair; 
    width: 20rem; 
    opacity: 1; 
    filter: contrast(120%);
  `

});
*/

//===================================================================

//WRAPPER============================================================

const githubAPIWrapper = props => {
  return {
    api: props.api,
    user: props.user,
    repos: [],

    async init() {
      const thumbnail = `https://raw.githubusercontent.com/${props.user}`;
      const path = `refs/heads/master`;
      const res = await fetch(`${props.api}/${props.user}/repos`);
      const data = await res.json();
      //console.log(data);

      data.forEach(repo => {
        this.repos.push({
          id: repo.node_id,
          owner: repo.owner.login,
          name: repo.name,
          uri: repo.svn_url,
          thumbnail: `${thumbnail}/${repo.name}/${path}/thumbnail.webp` //extract from raw.githubusercountent.com
        })
      })
    }
  }
}

//===================================================================
//console.log(repo)

create({
  //changeSection()
  githubAPIWrapper
}).mount()

window.onload = () => {

  //img.style=`display: flex; justify-content: center; align-items: center; padding: 0; width: 0px; flex-grow: 1; object-fit: cover; opacity: 8; transition: 1s ease;`

  //bannerHover({link: link, img: img})
}

window.addEventListener("orientationchange", () => location.reload())
