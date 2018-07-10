function shrten(){

  var Org_url = document.getElementById('userUrl').value;

  var res = Org_url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

  if(res == null){
    alert("Invalid Url !");
  }else {

    var req = new Request("http://localhost:4000/shorten",{
      method:"POST",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify({url: Org_url})
    });

    fetch(req).then((res) => {
      res.json().then((data) =>{
        document.getElementById("shrtUrl").value = data.shortURL;
      });
    });

  }

}
