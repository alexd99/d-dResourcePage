function dndGetRequest (endPoint){

    const request = new Request(`http://www.dnd5eapi.co/api/${endPoint}`);

    return fetch(request)
        .then((response) => response.json())
        .then((body) => body)
        .catch((err) => {
            console.log(err)
        });
}