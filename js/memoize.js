function memoize(callback,resolver){
    let cache = new Map()
   function getCacheKey(args){
    return resolver !=null ? resolver(...args) : JSON.stringify(args)
   }
   const memoized = function(...args){
    const cacheKey = getCacheKey(args)
    if(cache.has(cacheKey)){
        return cache.get(cacheKey)
    }
   

   const output = callback(...args)
   cache.set(cacheKey,output)
   return output
   }

   memoized.clear =function(){
    cache.clear()
   }
   memoized.delete = function(...args){
    const cachekey = getCacheKey(args)
    cache.delete(cachekey)
   }
   memoized.has = function(...args){
    const cachekey = getCacheKey(args)
    return cache.has(cachekey)
   }

   return memoized

}

