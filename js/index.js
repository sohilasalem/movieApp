var rowData = document.getElementById("rowData");
var searchInput = document.getElementById("searchInput");
var polo = document.getElementById("polo");

function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify ");
    $(".open-close-icon").addClass("fa-xmark");


    for (let i = 0; i < 6; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 6) * 100)
    }
    // $(".links li").animate({
    //     top: 0
    // }, 1000)
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-xmark");


    $(".links li").animate({
        top: 200
    }, 400)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})
//////////////////////////////////////////////////////

async function searchByName(term) {
    let myData = await fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    var response = await myData.json()
    allData=response.results
    // console.log(trem);
    displayMovies();

if (term.trim() === "") {
    getPopularMovies();
    
}

}






/////////////////////////////////////////////////////

// https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=ba8b9a7199efdcb0ca1f96879b83c44

async function getMovies() {
//    document.getElementById('rowData').innerHTML='';
rowData.innerHTML=""
// document.addEventListener("click",getMovies);

    var  myData = await fetch(`https://api.themoviedb.org/3/discover/movie?query=movie&api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    var response = await myData.json()
    allData=response.results
    // console.log(response.results);
displayMovies(allData);
// console.log(response.results);
} 
getMovies();

// function displayMovies() {
//     const rowData = document.getElementById('rowData');
//     rowData.innerHeight=""
//     var items = "";

//     for (var i = 0; i < allData.length; i++) {
//         items += `
//                  <div class="movie-card overflow-hidden col-lg-4 col-md-6 col-sm-12 p-4 ">
//     <div class="movie overflow-hidden p-1 rounded-2 cursor-pointer">
    
//              <img src="https://image.tmdb.org/t/p/w500${allData[i].poster_path}" alt="${allData[i].title}" class=" rounded-2">
       
//          <div class="layer rounded-2 p-3">
//              <h1 class="animate__animated animate__fadeInDown  fs-2">${allData[i].original_title}</h1>    
//              <p id="polo" class="animate__animated animate__flipInX d-none" > ${allData[i].overview.slice(0,300)}</p>
//              <p class="animate__animated animate__fadeInUp"><span class="fst-normal"><span> release_date </span> ${allData[i].release_date}</span></p>
//              <h3 class="animate__animated animate__fadeInUp"><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-regular fa-star-half-stroke text-warning fs-6"></i></h3>
//              <h3 class="animate__animated animate__fadeInUp"> ${allData[i].vote_average}</h3>
             
//          </div>   
//      </div>
//    </div>
//         `
//     }

//     rowData.innerHTML = items
// }




function displayMovies() {
    const rowData = document.getElementById('rowData');
    rowData.innerHTML = ""; 
    var items = "";

    for (var i = 0; i < allData.length; i++) {
        let overview = allData[i].overview;
        if (overview.length > 300) {
            overview = overview.slice(0, 300) + '..';
        }

        items += `
            <div class="movie-card overflow-hidden col-lg-4 col-md-6 col-sm-12 p-4">
                <div class="movie overflow-hidden p-1 rounded-2 cursor-pointer">
                    <img src="https://image.tmdb.org/t/p/w500${allData[i].poster_path}" alt="${allData[i].title}" class="rounded-2">
                    <div class="layer rounded-2 p-3">
                        <h1 class="animate__animated animate__fadeInDown fs-2">${allData[i].original_title}</h1>
                        <p class="polo animate__animated animate__flipInX ">${overview}</p>
                        <p class="animate__animated animate__fadeInUp"><span class="fst-normal"><span> release_date </span> ${allData[i].release_date}</span></p>
                        <h3 class="animate__animated animate__fadeInUp"><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-regular fa-star-half-stroke text-warning fs-6"></i></h3>
                        <h3 class="animate__animated animate__fadeInUp">${allData[i].vote_average}</h3>
                    </div>
                </div>
            </div>
        `;
    }
    rowData.innerHTML = items;
}



async function getPopularMovies() {
    rowData.innerHTML=""
    let  myData = await fetch(`https://api.themoviedb.org/3/search/movie?query=movie&api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    let response = await myData.json()
    allData=response.results
    // console.log(response.results);
    displayMovies(response.results);
    console.log(response.results);
    
} 
// getPopularMovies();


///////////////////////////////////////////////////////

async function getTrendyMovies() {
    rowData.innerHTML=""
    var  myData = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    var response = await myData.json()
    allData=response.results

    $('#trendy').click(function getTrendyMovies() {
        
    })

    // console.log(response.results);
    displayMovies(response.results);
}

/////////////////////////////////////////////////////////////////////


async function getUpComingMovies() {
    rowData.innerHTML=""
    var  myData = await fetch(`https://api.themoviedb.org/3/movie/upcoming?query=movie&api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    var response = await myData.json()
    allData=response.results
    // console.log(response.results);
    displayMovies(response.results);
    console.log(response.results);
} 
getUpComingMovies();



//////////////////////////////////////////////////////////////////


async function getTopRatedMovies() {
    rowData.innerHTML=""
    var  myData = await fetch(`https://api.themoviedb.org/3/movie/top_rated?query=movie&api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    var response = await myData.json()
    allData=response.results
    // console.log(response.results);
    displayMovies(response.results);
    console.log(response.results);
} 
// getTopRatedMovies();


////////////////////////////
