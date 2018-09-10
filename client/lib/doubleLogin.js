function doubleLogin(){
    if(localStorage.getItem("fbToken")||localStorage.getItem("regToken")){
        window.location = "/home.html"
    }
}