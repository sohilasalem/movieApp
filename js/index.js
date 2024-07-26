var rowData = document.getElementById("rowData");
var searchInput = document.getElementById("searchInput");
var animateanimated = document.getElementById("animate__animated");
var newplaying = document.getElementById("newplaying");
var airtoday = document.getElementById("airtoday");
var onair = document.getElementById("onair");
var popular = document.getElementById("popular");
var toprated = document.getElementById("toprated");
var trendy = document.getElementById("trendy");
var upcoming = document.getElementById("upcoming");
var inputs = document.querySelectorAll("input");
var UsertEmail=document.getElementById('inputEmail');
var inputError=document.getElementById('inputError');





function openSideNav() {
$(".side-nav-menu").animate({
        left: 0
}, 500)
$(".open-close-icon").removeClass("fa-align-justify ");
$(".open-close-icon").addClass("fa-xmark");
for (let i = 0; i < 8; i++) {
$(".links li").eq(i).animate({
  top: 0
}, (i + 6) * 100)
}
}
//////////////////////////////////////////
$(window).scroll(function(){
    // console.log("hiu");
    // var btn=
var top=  $(window).scrollTop()
    // console.log(top);
    if(top > 800){
$('#btn-up').show()

    }else{
$('#btn-up').hide()

    }
})

$('#btn-up').click(function(){
    $(window).scrollTop(0)
    $('html,body').animate({
    scrollTop:0
    },400)
  })

  ///////////////////////////////////////////

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
    
}}

/////////////////////////////////////////////////////


async function getMovies() {
    rowData.innerHTML=""
    var  myData = await fetch(`https://api.themoviedb.org/3/discover/movie?query=movie&api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    var response = await myData.json()
    allData=response.results
    // console.log(response.results);
    displayMovies(allData);
// console.log(response.results);
} 
getMovies();

newplaying.addEventListener("click", function (e) {
    closeSideNav();
    $(window).scrollTop(0)
    $('html,body').animate({
    scrollTop:0
    },400)
    getMovies();
 });

/////////////////////////////////////////////////

function displayMovies() {
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
                  <img src="${allData[i].poster_path ? `https://image.tmdb.org/t/p/w500${allData[i].poster_path}` : 'imgs/default-movie.jpg'}" alt="${allData[i].title ? allData[i].title : 'undefined'}" class="rounded-2">
                     <div class="layer rounded-2 p-3">
                        <h1 class="animate__animated  animate__fadeInDown text-center mb-2 fs-2">${allData[i].original_title ? allData[i].original_title : allData[i].original_name}</h1>                       
                        <p id="p" class="mmm animate__animated animate__flipInX ">${overview}</p>
                        <p class="animate__animated animate__fadeInUp mb-4"><span class="fst-normal"><span> Release Date: </span> ${allData[i].release_date ? allData[i].release_date : allData[i].first_air_date}</span></p>
                        <h4 class="animate__animated animate__fadeInUp">
                        ${allData[i].vote_average == 0 ? '<i class="fa-solid fa-star text-gray fs-6"></i>' : ''}
                        ${allData[i].vote_average >= 4 && allData[i].vote_average < 5 ? '<i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i>' : ''}
                        ${allData[i].vote_average >= 5 && allData[i].vote_average < 6 ? '<i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>' : ''}
                        ${allData[i].vote_average >= 6 && allData[i].vote_average < 7 ? '<i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i>' : ''}
                        ${allData[i].vote_average >= 7 && allData[i].vote_average < 8 ? '<i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>' : ''}
                        ${allData[i].vote_average >= 8 ? '<i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i>' : ''}
                        </h4>
                     <div class="icon rounded-circle animate__animated animate__fadeInUp">
                         <h3 class="animate__animated animate__fadeInUp ">${allData[i].vote_average.toString().length > 3 ? allData[i].vote_average.toString().substring(0, 3) : allData[i].vote_average}</h3>                    
                     </div>
                     </div>
                </div>
            </div>
        `;
    }
    rowData.innerHTML = items;

}

async function getAiringTodayMovies() {
    rowData.innerHTML=""
    let  myData = await fetch(`https://api.themoviedb.org/3/tv/airing_today?query=movies&api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    let response = await myData.json()
    allData=response.results
    // console.log(response.results);
    displayMovies(response.results);
    console.log(response.results);
    
} 
// getAiringTodayMovies();

airtoday.addEventListener("click", function (e) {
    closeSideNav();
    $(window).scrollTop(0)
    $('html,body').animate({
    scrollTop:0
    },400)
    getAiringTodayMovies();
 });
//////////////////////////////////////////////////////////

async function getOnAirMovies() {
    rowData.innerHTML=""
    let  myData = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?query=movies&api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    let response = await myData.json()
    allData=response.results
    // console.log(response.results);
    displayMovies(response.results);
    console.log(response.results);
    
} 
// getOnAirMovies();
onair.addEventListener("click", function (e) {
    closeSideNav();
    $(window).scrollTop(0)
    $('html,body').animate({
    scrollTop:0
    },400)
    getOnAirMovies();
 });


/////////////////////////////////////////////////////////////////////////


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
popular.addEventListener("click", function (e) {
    closeSideNav();
    $(window).scrollTop(0)
    $('html,body').animate({
    scrollTop:0
    },400)
    getPopularMovies();
 });

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
// getTrendyMovies();
trendy.addEventListener("click", function (e) {
    closeSideNav();
    $(window).scrollTop(0)
    $('html,body').animate({
    scrollTop:0
    },400)
    getTrendyMovies();
 });


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
// getUpComingMovies();
upcoming.addEventListener("click", function (e) {
    closeSideNav();
    $(window).scrollTop(0)
    $('html,body').animate({
    scrollTop:0
    },400)
    getUpComingMovies();
 });


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
toprated.addEventListener("click", function (e) {
    closeSideNav();
    $(window).scrollTop(0)
    $('html,body').animate({
    scrollTop:0
    },400)
    getTopRatedMovies();
 });


//  ////////////////////////
var Userpass=document.getElementById('inputPass');
var UserRepass=document.getElementById('inputRepass');
var Userage=document.getElementById('inputAge');
var Userphone=document.getElementById('inputPhone');
var inputError=document.getElementById('inputError');

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation(){
    document.getElementById("UsertEmail").addEventListener("focus", () => {
    emailInputTouched = true
})

document.getElementById("Userphone").addEventListener("focus", () => {
    phoneInputTouched = true
})

document.getElementById("Userage").addEventListener("focus", () => {
    ageInputTouched = true
})

document.getElementById("Userpass").addEventListener("focus", () => {
    passwordInputTouched = true
})

document.getElementById("UserRepass").addEventListener("focus", () => {
    repasswordInputTouched = true
})



const button = document.getElementById('btn');
let moved = false;


    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("UsertName").classList.replace("d-block", "d-none")
            $('.form-control').css('border-color','#fff')
        } else {
            document.getElementById("UsertName").classList.replace("d-none", "d-block")
            $('.form-control').css('border-color','#DC3545')
        }
    }
    
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("inputEmail").classList.replace("d-block", "d-none")
            $('.form-control').css('border-color','#fff')
        } else {
            document.getElementById("inputEmail").classList.replace("d-none", "d-block")
            $('.form-control').css('border-color','#DC3545')

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("inputPhone").classList.replace("d-block", "d-none")
            $('.form-control').css('border-color','#fff')
        } else {
            document.getElementById("inputPhone").classList.replace("d-none", "d-block")
            $('.form-control').css('border-color','#DC3545')

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("inputAge").classList.replace("d-block", "d-none")
            $('.form-control').css('border-color','#fff')
        } else {
            document.getElementById("inputAge").classList.replace("d-none", "d-block")
            $('.form-control').css('border-color','#DC3545')
        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("inputPass").classList.replace("d-block", "d-none")
            $('.form-control').css('border-color','#fff')
        } else {
            document.getElementById("inputPass").classList.replace("d-none", "d-block")
            $('.form-control').css('border-color','#DC3545')

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("inputRepass").classList.replace("d-block", "d-none")
            $('.form-control').css('border-color','#fff')
        } else {
            document.getElementById("inputRepass").classList.replace("d-none", "d-block")
            $('.form-control').css('border-color','#DC3545')

        }
    }


  if(   nameValidation() == false ||
  emailValidation() == false ||
  phoneValidation() == false ||
  ageValidation() == false ||
  passwordValidation() == false ||
  repasswordValidation() == false) {
    console.log('no');

    $('.form-btn').addClass('shake-button')
    $('.form-btn').addClass('invalid')
    button.addEventListener('mouseover', () => {
        if (!moved) {
            $('.form-btn').addClass('ttn')
            button.style.left = '200px';
        } 
        
    });
    button.addEventListener('mouseover', () => {
        if (moved) {
            button.style.left = '0px';
            $('.form-btn').addClass('ttn')
        } 
        moved = !moved;
    });

  }
  else{
    $('.form-btn').removeClass('invalid')
    $('.form-btn').removeClass('shake-button')
$('.form-btn').removeClass('ttn')

    button.addEventListener('mouseover', () => {
        if (!moved) {
            $('.form-btn').removeClass('ttn')
            button.style.left = '0px';
        } 
        
    });

    button.addEventListener('mouseover', () => {
        if (moved) {
            button.style.left = '0px';
            $('.form-btn').removeClass('ttn')
        } 
        else {
            button.style.left = '200px';
        }
        moved = !moved;
    });
    // $('.form-btn').removeClass('ttn')
  }

}


/////////////////////////////////////////////////////////////////////////////
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("UsertName").value))
    
}



function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3}))$/.test(document.getElementById("UsertEmail").value))
}

function phoneValidation() {
    return (/^01\d{8}$/.test(document.getElementById("Userphone").value))
}

function ageValidation() {
    return (/^(1[6-9]|[2-9][0-9]|1[0-9]{2,})$/.test(document.getElementById("Userage").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("Userpass").value))
}

function repasswordValidation() {
    return document.getElementById("UserRepass").value == document.getElementById("Userpass").value
} 
