export const compareObjectIds =(objectId, stringId) =>{
    return objectId.toString === stringId
}

export const containsSameId = (objectsList, stringId) =>{
    let index = 0
    let result = false
    while(index < objectsList.length){
        if((objectsList[index]._id.toString() === stringId)){
            
            result = true
            break
        }
        index ++   
    }
    return result
}