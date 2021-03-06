(function () {
    document.getElementById("buttons").appendChild(document.createElement("button"));
    document.getElementById("buttons").lastChild.appendChild(document.createTextNode("Ajax Load"));
    document.getElementById("buttons").lastChild.setAttribute("class", "one");
    
    
    document.getElementById("buttons").appendChild(document.createElement("button"));
    document.getElementById("buttons").lastChild.appendChild(document.createTextNode("Local Load"));
    document.getElementById("buttons").lastChild.setAttribute("class", "two");
    
    
    document.getElementById("buttons").appendChild(document.createElement("button"));
    document.getElementById("buttons").lastChild.appendChild(document.createTextNode("Local Save"));
    document.getElementById("buttons").lastChild.setAttribute("class", "three");
    
    
    document.getElementById("buttons").appendChild(document.createElement("button"));
    document.getElementById("buttons").lastChild.appendChild(document.createTextNode("Local Clear"));
    document.getElementById("buttons").lastChild.setAttribute("class", "four");
    
    
    function genhtml(NBATeams) {
        var target = document.getElementById("output");
        var i;
        var Array = NBATeams["Oklahoma City Thunder"];
        for (i = 0; i < Array.length; i = i + 1) {
            target.appendChild(document.createElement("h2"));
            target.lastChild.appendChild(document.createTextNode(Array[i].name));
            target.appendChild(document.createElement("p"));
            target.lastChild.appendChild(document.createTextNode(" Games Played: "));
            target.lastChild.appendChild(document.createTextNode(Array[i]["games played"]));
            target.lastChild.appendChild(document.createTextNode(" Points Per Game: "));
            target.lastChild.appendChild(document.createTextNode(Array[i]["points per game"]));
            target.lastChild.appendChild(document.createTextNode(" Rebounds Per Game: "));
            target.lastChild.appendChild(document.createTextNode(Array[i]["rebounds per game"]));
            target.lastChild.appendChild(document.createTextNode(" Assists Per Game: "));
            target.lastChild.appendChild(document.createTextNode(Array[i]["assists per game"]));

        }
    }
    
    function getHTTPObject() {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
            else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Msxm12.XMLHTTP");
            }
        return xhr;
    }
    
    var x;
    
    function assign (jsondata){
        x = jsondata;
    }
    
    function ajaxcall() {
        var mynode = document.getElementById("output");
        while (mynode.firstChild) {
            mynode.removeChild(mynode.firstChild);
        }
        var ajaxreq = getHTTPObject();       
        ajaxreq.open("GET", "data/okc.json", true);
        ajaxreq.send(null);
        ajaxreq.onreadystatechange = function () {
            if (ajaxreq.readyState === 4 && ajaxreq.status === 200) {
                var NBA = JSON.parse(ajaxreq.responseText);
                genhtml(NBA);
                assign(NBA);
            }
        };
        console.log("test")
    }
    
    function localsave() {
        var NBAString = JSON.stringify(x);
        localStorage.setItem("NBATeams", NBAString);
    }
    
    function localclear() {
        localStorage.removeItem("NBATeams");
    }
    
    function localload() {
        if (typeof(localStorage) === "undefined"){
            alert("Local Storage not supported");
        }
        else {
            var mynode = document.getElementById("output");
            while (mynode.firstChild) {
            mynode.removeChild(mynode.firstChild);
        }
            genhtml(JSON.parse(localStorage.getItem("NBATeams")));
        }
    }
    
    document.getElementsByClassName("one")[0].addEventListener("click", ajaxcall, false);
    document.getElementsByClassName("one")[0].addEventListener("click", console.log(ajaxcall), false);
            
    document.getElementsByClassName("two")[0].addEventListener("click", localload, false);
    
    document.getElementsByClassName("three")[0].addEventListener("click", localsave, false);
    
    document.getElementsByClassName("four")[0].addEventListener("click", localclear, false);
}());
    



// https://www.youtube.com/watch?v=axfuXEBa-Bo
