import * as Structs from "../utils/structs";
import ReviewQueue from "./reviewqueue";



export default class CUser {
    Preferences: Structs.SUserPreferences;
    ProfileData: Structs.SUserProfileData;
    ReviewQueue: ReviewQueue;



    constructor() {
        this.ReviewQueue = new ReviewQueue();
    }



    fn_UpdatePreferences( a_newPreferences: Structs.SUserPreferences ) {
        throw "Not yet implemented!";
    }
    fn_UpdateProfileData( a_newProfileData: Structs.SUserProfileData ) {
        throw "Not yet implemented!";
    }
}