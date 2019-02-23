function numberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default class Artifact{
    constructor(_cost, _bonus, _owned=0, _box){
        this.cost=_cost;
        this.bonus=_bonus;
        this.owned=_owned;
        this.box=_box;
        this.basicCost=_cost;
    }

    static getBonus(arr,multiplier){
        let bonus=1;
        arr.forEach(element=>bonus+=element.bonus*element.owned);
        return bonus*multiplier;
    }
    static restartAll(arr){
        arr.forEach(element=>{
            element.cost=element.basicCost;
            element.owned=0;
        })
    }


    static updateCostBox(arr){
        arr.forEach(element=>element.box.innerHTML=numberWithSpaces(element.cost));
    }

    updateCost(){
        this.cost=parseInt(this.cost+this.cost*0.3);
    }

    buy(mieczniki, bananaDeal){
        if (this.cost*bananaDeal<=mieczniki){
            this.owned++;
            return true;
        }
        return false;
    }
}