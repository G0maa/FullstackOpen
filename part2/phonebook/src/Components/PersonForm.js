import React from "react" 
  
const PersonForm = ({onSubmitFunc, newNameVar, onChangeNameFunc, newNumberVar, onChangeNumberFunc}) => {
// I tried passing them in _smarter_ ways but React got angry.
    return(
        <>
        <form onSubmit={onSubmitFunc}>
            <div>
            name: <input value={newNameVar} onChange={onChangeNameFunc} />
            </div>
            <div>
            number: <input value={newNumberVar} onChange={onChangeNumberFunc} />
            </div>
            <div>
            <button type="submit" >add</button>
            </div>
        </form>
        </>
    )
}

export default PersonForm