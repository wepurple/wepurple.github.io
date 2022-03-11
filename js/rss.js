/* Merci IT-Swarm pour cette function */
const httpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

/// Lancement de la rêquete client (GET)
const client = new httpClient();
client.get('https://api.rss2json.com/v1/api.json?rss_url=https://www.01net.com/rss/actualites/technos/', function(response) {
    let feed = JSON.parse(response);
    console.log(feed)
    let link = [];
    let image = [];
    let contenu = [];
    let title;
    let date;
    let number = 1;
    feed.items.forEach(element => {
        contenu.push(element.content);
        link.push(element.link);
        image.push(element.thumbnail);
        title = element.title;
        date = element.pubDate;
       
    })

    /// POUR AJOUTER IMAGE 

    image.forEach(elementImage => {
        document.getElementById('imagetecho' + number).src = elementImage;
        console.log(elementImage)
        number += 1;
        if(number === 7) {
                console.log("STOP")
                number = 1;
                linkFunction()
        }
    })


    
            /// POUR AJOUTER LIEN 

    function linkFunction() {
        link.forEach(elementLink => {
                    document.getElementById('linktecho' + number).href = elementLink;
                    number += 1;
                    if(number === 6) {
                            console.log("STOP")
                            number = 1;
                            //contenuFunction()
                    }
            })
        }
    // function contenuFunction() {
    //     contenu.forEach(elementContenu => {
    //         document.getElementById('contenutechno' + number).textContent += elementContenu;
    //         number += 1;
    // })
//}
});