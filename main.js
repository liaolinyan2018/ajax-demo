window.jQuery = function(nodeOrSelector){
  let nodes = {}
  nodes.addClass = function(){}
  nodes.html = function(){}
  return nodes
}
window.$ = window.jQuery

//jQuery是一个函数，但jQuery.ajax 用法依旧正确，函数可以构造函数对象
window.jQuery.ajax = function({url, method, body, successFn, failFn, headers}){
  //es6解构赋值
  let request = new XMLHttpRequest()
  request.open(method, url) // 配置request
  for(let key in headers) {
    let value = headers[key]
    request.setRequestHeader(key, value)
  }
  request.onreadystatechange = ()=>{
    if(request.readyState === 4){
      if(request.status >= 200 && request.status < 300){
        successFn.call(undefined, request.responseText)
      }else if(request.status >= 400){
        failFn.call(undefined, request)
      }
    }
  }
  request.send(body)
}
/*
console.log(window.jQuery)
console.dir(window.jQuery)
console.log(typeof window.jQuery)
console.log(jQuery.__proto__ === Function.prototype) //true
console.log(jQuery.prototype.__proto__ === Object.prototype)//true
console.log(jQuery.prototype === Function.prototype)//false
console.log(Object.prototype === Function.prototype.__proto__) //true

console.log(jQuery.__proto__) //f(){}
console.log(jQuery.prototype) //
*/
function f1(responseText){}
function f2(responseText){}

myButton.addEventListener('click', (e)=>{
  window.jQuery.ajax({  //点击就调用ajax这个函数
    url: '/frank',
    method: 'get',
    headers: {
      'content-type':'application/x-www-form-urlencoded',
      'frank': '18'
    },
    successFn: (x)=>{//x=request.responseText
      f1.call(undefined,x)
      f2.call(undefined,x)
    },
    failFn: (x)=>{ //x===request
      console.log(x)
      console.log(x.status)
      console.log(x.responseText)
    }
  })
 
})