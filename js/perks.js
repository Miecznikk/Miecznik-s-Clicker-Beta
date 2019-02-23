export class Banana{
    constructor(){
        this.cost=30000;
        this.deal=1;
        this.active=false;
        this.items=0;
        this.button=document.getElementById("banana");
    }
    buy(mieczniki){
        if (mieczniki>=this.cost&&!this.active){
            this.active=true;
            this.deal=0.75;
            this.items=3;
            this.button.style="background-color:rgba(0,255,0,0.5)";
            return true;
        }
        return false;
    }
    disable(strict=false){
        if(this.active){
            this.items--;
            if(this.items==0 || strict){
                this.active=false;
                this.deal=1;
                this.button.style="backround-color:0";
            }
        }
        return;
    }
}

export class GIT{
    constructor(){
        this.cost = 75000;
        this.multiplier=1;
        this.active=false;
        this.time=1000*30;
        this.button=document.getElementById("git");
    }

    buy(mieczniki,MPS_box){
        if (mieczniki>=this.cost&&!this.active){
            this.active=true;
            this.multiplier=1.5;
            MPS_box.style="color:rgb(16, 138, 36)";
            this.button.style="background-color:rgba(0,255,0,0.5)";
            return true;
        }
        return false;
    }
    disable(MPS_box){
        this.active=false;
        this.multiplier=1;
        MPS_box.style="color:black";
        this.button.style="background-color:0";
    }
}

export class Chlud{
    constructor(){
        this.cost=50000;
        this.multiplier=1;
        this.active=false;
        this.time=1000*30;
        this.button=document.getElementById("snowFlake");
    }

    buy(mieczniki, MPC_box){
        if (mieczniki>=this.cost&&!this.active){
            this.active=true;
            this.multiplier=2;
            MPC_box.style="color:rgb(16,138,36)";
            this.button.style="background-color:rgba(0,255,0,0.5)";
            return true;
        }
        return false;
    }
    disable(MPC_box){
        this.active=false;
        this.multiplier=1;
        MPC_box.style="color:black";
        this.button.style="background-color:0";
    }
}