const inpt = document.querySelector(".inp");

const btn = document.querySelector(".btn");

const lyrics = document.querySelector(".lyrics");


const apiUrl = "https://api.lyrics.ovh";

let inpttext = "";

//event listener on input
inpt.addEventListener("change", (e) => {

                                inpttext = e.target.value;

                                console.log(inpttext);
})

///click listner on button
btn.addEventListener("click", () => {

                                    if (inpttext == "") {

                                        alert("Enter the  song name and submit")
                                    }

                                    else {

                                        
                                        lyrics.innerHTML = `<div id="loader"></div >`;
                                        searchsong(inpttext);
                                        }

})


async function searchsong(inpttext) {
    try {
                                    const searchresult = await fetch(`${apiUrl}/suggest/${inpttext}`)

                                    const data = await searchresult.json();

                                    console.log(data);
                                    const waiting = showresults(data);
    } catch (error) {
                                    
                                    lyrics.innerHTML = "cant load the data right now  check the internet";
    }
}

//by searching showing result
function showresults(data) {


    lyrics.innerHTML = `<ul class="song">${data.data.map(elem => `<li class="songs"><div> ${elem.artist.name}----
                                    ${elem.title}
                                    <br>
                                    <span class="getly" data-artist="${elem.artist.name}"
                                    data-songtitle="${elem.title}">->getlyrics</span></di v>
                                    </li>`).join("")}
                                    </ul>`
}


//getting lyrics from ns attribute like getattribute
//i gave a attribute name to the span then if i cilck on that it should retrurn artis name and 
//title of the song and with thst iam  calling api with the artist name and etc and get the lyrics
lyrics.addEventListener("click", (e) => {

                        const clickedelement = e.target;

                        if (clickedelement.tagName === "SPAN") {

                                    const artist = clickedelement.getAttribute("data-artist");

                                    const songtitle = clickedelement.getAttribute("data-songtitle");
                                    lyrics.innerHTML = `<div id="loader2"></div >`;
                                    getlyrics(artist, songtitle)
                                    
                                                            }
})



//getting lyrics getlyrics funtion to fetch the lyrics

async function getlyrics(artist, songtitle) {
    try {
                                const response = await fetch(`${apiUrl}/v1/${artist}/${songtitle}`)

                                const data = await response.json();

                                const finallyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

                                console.log(finallyrics);
                                //replacing the old list with new lyrics
                                
                               

                                lyrics.innerHTML = `<h2><strong>${artist}</strong>--${songtitle}</h2>
                            
                            <p class="oglyrics">${finallyrics}</p>`


                            


                            } 
    catch (error) {
                                lyrics.innerHTML = "<h1>opps......cant find the song lyrics</h1>";
                            }
}
