function debounce(callback, delay, immediate = false) {
    let timer;
  
    return function (...args) {
      const context = this;
      const callNow = immediate && !timer;
  
      clearTimeout(timer); // Corrected function name
  
      timer = setTimeout(() => {
        if (!immediate) {
          callback.apply(context, args);
        }
        timer = null;
      }, delay);
  
      if (callNow) {
        callback.apply(context, args);
      }
    };
  }



  function Apicall(...args){
 console.log(args)

  }


  const debounceFunc = debounce(Apicall, 1000)

  debounceFunc()
  
  // Do not edit the line below.
  
  