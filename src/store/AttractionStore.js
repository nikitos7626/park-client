import {makeAutoObservable} from 'mobx';

export default class AttractionStore{
    constructor(){
        this._Attractions =[
        {attraction_id:1,name:'Американские горки',price:1000,working_hours:'14.00-20.00'},
        {attraction_id:2,name:'Лазер-таг',price:1000,working_hours:'8.00-23.00'}
        ]
        makeAutoObservable(this)
    }

    setAttractions(Attractions){    
        this._Attractions = Attractions;
    }
    

    get Attractions(){
        return this._Attractions
    }

}