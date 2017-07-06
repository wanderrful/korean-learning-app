import * as Structs from "../utils/structs";



export default class ReviewQueue {
    Queue: Array<Structs.SWordConfig>;



    constructor() {
        this.Queue = [];
    }



    fn_AddWord( a_Word: Structs.SWordConfig) {
        this.Queue.push(a_Word);
        throw "Not yet implemented!";
    }
    fn_RemoveWord( a_Word: Structs.SWordConfig ) {
        throw "Not yet implemented!";
    }
}