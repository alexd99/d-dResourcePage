import dndGetRequest from "./dndGetRequest"

dndGetRequest('classes/')
.then((dndClasses)=>{
    console.log(dndClasses)
});