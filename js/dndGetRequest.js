export function dndGetRequest (endPoint, fullUrl){

    let request;
    switch (fullUrl) {
      case true:
           request = new Request(endPoint);
        break;
        case false:
             request = new Request(`http://www.dnd5eapi.co/api/${endPoint}`);
          break;

    }
    return fetch(request)
        .then((response) => response.json())
        .then((body) => body)
        .catch((err) => {
            console.log(err)
        });
}
