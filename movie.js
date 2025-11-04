Name = document.querySelector(".search input")
search = document.querySelector(".search button")

//imdb-movies-web-series
async function movies(movieName) {
const url = `https://imdb-movies-web-series-etc-search.p.rapidapi.com/${movieName}.json`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'e68df85751msh449107fb3fb89afp1c67c4jsn7acbb6f98c82',
		'x-rapidapi-host': 'imdb-movies-web-series-etc-search.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log("movies",result);
	const ids =[]
	for (var i=0; i<result.d.length; i++){
		ids.push(result.d[i].id);
	}
	return ids;
} catch (error) {
	console.error(error);
}
}

search.addEventListener("click", async()=>{
  const ids = await movies(Name.value);
  console.log("ids:",ids);
	for(var i=0; i<ids.length; i++){
	async function movie() {
//imdb rapid
		const url = `https://imdb236.p.rapidapi.com/api/imdb/${ids[i]}`;
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': 'e68df85751msh449107fb3fb89afp1c67c4jsn7acbb6f98c82',
			'x-rapidapi-host': 'imdb236.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log("movie:",result);
		document.querySelector(".names").innerHTML += `<div class="m-3 bg-info bg-opacity-25 p-2">
            <a class="alink text-decoration-none text-light" href="" >
			<h3> ${result.originalTitle} </h3></a>
        </div>  `

		link = document.querySelector(".alink")
		link.addEventListener("click", (e)=>{
			e.preventDefault();
			document.querySelector(".names").innerHTML = ``		
		document.querySelector(".details").innerHTML += `
		<div class=" mx-auto text-center">
            <h1>${result.originalTitle}</h1>
            <div class="d-flex justify-content-between">
                 <div class="col-2 d-flex"><p class="fs-5  border-end">${result.releaseDate}</p>
                <p class=" ms-2 fs-5">${result.runtimeMinutes} minutes</p></div>
                
                <div class="d-flex "><p class="fs-5 ms-2 border-end">${result.productionCompanies[0].name}</p>
                <p class="fs-5 ms-2">${result.type}</p></div>
                
            </div>
           <a href="${result.trailer}"> <img src="${result.thumbnails[0].url}" style="width: 70%; height: 90vh;"></a>
		</div> <br>
            <p>${result.description}</p>
            <p class="fs-5 border border-1 rounded-5 p-2">${result.genres[0]},${result.genres[1]}</p>
			<p class="fs-5 border border-1 rounded-5 p-2">${result.genres.join(", ")}</p>
		<div class=" bg-info bg-opacity-25 p-3">
                <p class="fs-4 border-bottom"> Director: ${result.directors[0].fullName}</p>
                <p class="fs-4 border-bottom">Cast:${result.cast[0].fullName},${result.cast[1].fullName},${result.cast[2].fullName},${result.cast[3].fullName}</p>
                <p class="fs-4 border-bottom">Cast:${result.cast.slice(0,5).map(a => a.fullName).join(", ")}</p>
				<p class="fs-4 border-bottom">Average rating: ${result.averageRating}
                    <ul><li> ratings</li> </ul>
                </p>

		</div>`
		})
	} catch (error) {
		console.error(error);
	}
	}
	movie();
	}

}
)