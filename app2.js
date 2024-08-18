console.log("global",global)
console.log("this",this)
console.log("globalThis",globalThis)
// In Node js global object is accessed using the keyword "global"
// In browser global object is accessed using the keyword "window"
// In browser "this" points to window object
// Also in browser this == window == frames == self [Refer Image 4]
// But in Node js "this" is an empty object {}
// globalThis is a keyword that refers to the global object across all environment
// in browser globalThis == windows , in Node js globalThis == global