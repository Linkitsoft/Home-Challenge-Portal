


 const UseOutsideAlerter = (componentRef, componentRef2, setCategoryPopup) => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
        if(componentRef){
            const ref = componentRef.current
            const ref2 = componentRef2.current
            if(ref?.contains(e.target) && !ref2?.contains(e.target)){
                setCategoryPopup(false)
            }
        }
    }
  }
  export default UseOutsideAlerter

