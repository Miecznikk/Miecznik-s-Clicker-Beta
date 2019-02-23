import Artifact from './artifact';
import Uczen from './uczen';
import * as arrays from './arrays';
import * as boxes from './boxes';
import {mainMiecznik, UczenButtonsArr, ArtifactButtonsArr} from './buttons';
import {muteMusic, muteSound, Restart} from './buttons';
import * as audio from './audio';
import {Banana,GIT,Chlud} from './perks';
//=====
Artifact.updateCostBox(arrays.artifact_Arr);
Uczen.updateCostBox(arrays.uczen_Arr);
audio.backgroundMusic.volume=.5;
const miecznikCont=document.getElementById("miecznikCont");
//=====
//perki===
const banan=new Banana();
const git=new GIT();
const chlud=new Chlud();
//====
let clicksPerSec=0;
let AntiAC_interval;
let AddPerSecInterval;
let miecznikiPerTick;
let mieczniki=0;
let miecznikiPerSecond=Uczen.getBonus(arrays.uczen_Arr,git.multiplier);
let miecznikiPerClick=Artifact.getBonus(arrays.artifact_Arr,chlud.multiplier);
let mutedSound=false;
let changeClicks=0;
const miecznikArr=["img/miecznik.jpg","img/miecznik2.png","img/miecznik3.png"];
let miecznikImgIndex=0;
//====
boxes.farmed.innerHTML=mieczniki;
boxes.perSecBox.innerHTML=miecznikiPerSecond;
boxes.perClickBox.innerHTML=miecznikiPerClick;
//====

//funkcje===
function updateMieczniki(){
    boxes.farmed.innerHTML=numberWithSpaces(parseInt(mieczniki));
}
function updateMPS(){
    miecznikiPerSecond=parseInt(Uczen.getBonus(arrays.uczen_Arr,git.multiplier));
    boxes.perSecBox.innerHTML=numberWithSpaces(miecznikiPerSecond);
}
function updateMPC(){
    miecznikiPerClick=parseInt(Artifact.getBonus(arrays.artifact_Arr,chlud.multiplier));
    boxes.perClickBox.innerHTML=numberWithSpaces(miecznikiPerClick);
}
function audioPlay(audio){
    if (!mutedSound){
        audio.cloneNode(1).play();
    }
}
function AntiAutoClicker(){
    clearInterval(AntiAC_interval);
    AntiAC_interval=setInterval(()=>{
        if (clicksPerSec>11){
            chlud.multiplier=0;
            git.multiplier=0;
            Reset();
        }
        clicksPerSec=0;
    },1000)
}

function numberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function changeMiecznikImg(){
    miecznikImgIndex=++miecznikImgIndex%3;
    return miecznikImgIndex;
}

function changeMiecznik(){
    changeClicks=++changeClicks%100;
    if(changeClicks==0){
        mainMiecznik.classList.toggle("transparent");
        setTimeout(()=>{
            mainMiecznik.src=miecznikArr[changeMiecznikImg()]
        },250)
        setTimeout(()=>{
            mainMiecznik.classList.remove("transparent");
        },500)
    }
}
function AddPerSec(){
    miecznikiPerTick=miecznikiPerSecond/30;
    clearInterval(AddPerSecInterval);
    AddPerSecInterval=setInterval(()=>{
        mieczniki+=miecznikiPerTick;
        updateMieczniki();
    },1000/30);
}

function CreateMpcElement(){
    const mpcElement=document.createElement("p");
    mpcElement.innerHTML="+" + miecznikiPerClick;
    mpcElement.classList.toggle("paragraph");
    const top=parseInt(Math.random() * (220-60) + 60);
    const left=parseInt(Math.random() * (220-60) + 60);
    const r=parseInt(Math.random()*255+1);
    const g=parseInt(Math.random()*255+1);
    const b=parseInt(Math.random()*255+1);
    mpcElement.style="left:"+left+"px; top:"+top+"px; color:rgb("+r+","+g+","+b+");";
    return mpcElement;
}

function Reset(){
    mieczniki=0;
    updateMieczniki();
    Uczen.restartAll(arrays.uczen_Arr);
    Artifact.restartAll(arrays.artifact_Arr);
    Uczen.updateCostBox(arrays.uczen_Arr);
    Artifact.updateCostBox(arrays.artifact_Arr);
    miecznikiPerClick=0;
    miecznikiPerSecond=0;
    updateMPC();
    updateMPS();
    AddPerSec();
    banan.disable(true);
    chlud.disable(boxes.perClickBox);
    git.disable(boxes.perSecBox);
}

//=======
//eventy===
mainMiecznik.addEventListener('click',event=>{
    clicksPerSec++;
    changeMiecznik();
    miecznikCont.appendChild(CreateMpcElement());
    let x=miecznikCont.lastChild;
    setTimeout(()=>{
        x.classList.toggle("transparent");
        setTimeout(()=>{
            miecznikCont.removeChild(x);
        },500)
    },500)
    audioPlay(audio.onClickSound);
    mieczniki+=miecznikiPerClick;
    updateMieczniki();
})
ArtifactButtonsArr.forEach((element, index)=>{
    element.addEventListener('click',event=>{
        audioPlay(audio.onClickAddSound);
        if(arrays.artifact_Arr[index].buy(mieczniki,banan.deal)){
            mieczniki-=arrays.artifact_Arr[index].cost*banan.deal;
            banan.disable();
            arrays.artifact_Arr[index].updateCost();
            Artifact.updateCostBox(arrays.artifact_Arr);
            updateMieczniki();
            updateMPC();
        }
    })
})
UczenButtonsArr.forEach((element,index)=>{
    element.addEventListener('click',(event)=>{
        audioPlay(audio.onClickAddSound);
        if(arrays.uczen_Arr[index].buy(mieczniki,banan.deal)){
            mieczniki-=arrays.uczen_Arr[index].cost*banan.deal;
            banan.disable();
            arrays.uczen_Arr[index].updateCost();
            Uczen.updateCostBox(arrays.uczen_Arr);
            updateMieczniki();
            updateMPS();
            AddPerSec();
        }
    })
})
muteMusic.addEventListener('click',event=>{
    if (audio.backgroundMusic.volume==.5){
        audio.backgroundMusic.volume=0;
        muteMusic.src="img/icons/pause.png";
        return;
    }
    audio.backgroundMusic.volume=.5;
    muteMusic.src="img/icons/play.png";
})

muteSound.addEventListener('click', event=>{
    if (!mutedSound){
        mutedSound=true;
        muteSound.src="img/icons/mute.png"
        return;
    }
    mutedSound=false;
    muteSound.src="img/icons/sound-on.png";
})
banan.button.addEventListener('click',event=>{
    audioPlay(audio.onClickAddSound);
    if (banan.buy(mieczniki)){
        mieczniki-=banan.cost;
        updateMieczniki();
    }
})
git.button.addEventListener('click',event=>{
    audioPlay(audio.onClickAddSound);
    if(git.buy(mieczniki,boxes.perSecBox)){
        mieczniki-=git.cost;
        updateMieczniki();
        updateMPS();
        AddPerSec();
        setTimeout(()=>{
            git.disable(boxes.perSecBox);
            updateMPS();
            AddPerSec();
        },git.time);
    }
})

chlud.button.addEventListener('click',event=>{
    audioPlay(audio.onClickAddSound);
    if(chlud.buy(mieczniki,boxes.perClickBox)){
        mieczniki-=chlud.cost;
        updateMieczniki();
        updateMPC();
        setTimeout(()=>{
            chlud.disable(boxes.perClickBox);
            updateMPC();
        },chlud.time);
    }
})

Restart.addEventListener('click',event=>{
    Reset();
}
)

//=========
AntiAutoClicker();