$(document).ready(function () {

$('.loading').fadeOut(1000);
  // nav Bar 
  $('.tabes').click(function () {


    $('.nav').animate({ left: 0 }, 500, () => {
      $('.nav').css('display', 'flex')

    });



    $('.logo').animate({ left: $('.nav').outerWidth() }, 500, function () {
      $('.tabes').css('display', 'none')
      $('.exit').css('display', 'block')
    })
  });



  $('.exit').click(function () {
    $('.nav').animate({ left: -$('.nav').outerWidth() }, 500);
    $('.logo').animate({ left: 0 }, 500, function () {
      $('.tabes').css('display', 'block')
      $('.exit').css('display', 'none')
    })
  })




  // menu  Api
  async function menuApi(char = "s") {
    let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${char}=`);
    let api = await apiData.json();
    let meals = api.meals;
    dispalyData(meals)
  }

  // menu Dispaly
  function dispalyData(meals) {



    $('#Area').css('display', 'none')
    $('#menu').css('display', 'block')
    $('#Ingredients').css('display', 'none')
    $('#CategoriesMeal').css('display', 'none')
 
    $('#Contact').css('display', 'none')
    $('#Instructions').css('display', 'none')
    $('#Contact').css('display', 'none')

    // $('#Search').css('display', 'none')

    let menuContainer = ``;






    $('#menu ').css('display', 'block')
    for (let i = 0; i < meals.length; i++) {
      // console.log(meals[i].strMealThumb);
      menuContainer += `   <div class="col-md-3 position-relative " idMeal="${meals[i].idMeal}">
                <img src="${meals[i].strMealThumb}" class="w-100 "   idMeal="${meals[i].idMeal}" alt="">
    
                <div class="lyear "  idMeal="${meals[i].idMeal}" >
                <p class=" px-2 fs-2 fw-light" idMeal="${meals[i].idMeal}" >${meals[i].strMeal}</p>
                </div>
    
                </div>
                
       `



    }

    $('#menu .row').html(menuContainer);

    $('#menu .row').click(async function (e) {
      let idMeal = e.target.getAttribute("idMeal");
      //  console.log(idMeal);
      $('#menu ').css('display', 'none');
      $('#Instructions ').css('display', 'block');


      dispalyInstructions(idMeal)
    });

  }


  // Instructions dispaly
  async function dispalyInstructions(mealindex) {
    let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealindex}`);
    let api = await apiData.json();
    let selectedMeal = api.meals[0]
    // console.log(mealindex);
    // console.log(selectedMeal.strMeal);
    $('#Area').css('display', 'none')
    $('#menu').css('display', 'none')
    $('#Ingredients').css('display', 'block')
    $('#CategoriesMeal').css('display', 'none')
 
    $('#Contact').css('display', 'none')
    $('#Instructions').css('display', 'block')

    $('#Search').css('display', 'none')



    $('#Instructions .row .text-center h2').html(selectedMeal.strMeal);
    $('#Instructions .row .text-center img').attr('src', selectedMeal.strMealThumb);

    $('#Instructions .row .col-md-8 p').html(selectedMeal.strInstructions);

    $('#Instructions .row .col-md-8 .Area').html(selectedMeal.strArea);
    $('#Instructions .row .col-md-8 .Category').html(selectedMeal.strCategory);


    $('#Instructions .row .col-md-8 .Recipes').html(`<div class="col-md-2">


          <p class="bg-success bg-opacity-75 p-1 text-center rounded-3 border-1">${selectedMeal.strIngredient1}</p>
        </div>
        <div class="col-md-2">
          <p class="bg-success bg-opacity-75 p-1 text-center rounded-3 border-1">${selectedMeal.strIngredient2}</p>


        </div>
        <div class="col-md-2">
          <p class="bg-success bg-opacity-75 p-1 text-center rounded-3 border-1">${selectedMeal.strIngredient3}</p>


        </div>
        <div class="col-md-2">
          <p class="bg-success bg-opacity-75 p-1 text-center rounded-3 border-1">${selectedMeal.strIngredient4}</p>


        </div>
        <div class="col-md-2">
          <p class="bg-success bg-opacity-75 p-1 text-center rounded-3 border-1">${selectedMeal.strIngredient5}</p>


        </div>
        <div class="col-md-2">
          <p class="bg-success bg-opacity-75 p-1 text-center rounded-3 border-1">${selectedMeal.strIngredient6}</p>


        </div>
        <div class="col-md-2">
          <p class="bg-success bg-opacity-75 p-1 text-center rounded-3 border-1">${selectedMeal.strIngredient7}</p>


        </div>
        <div class="col-md-2">
          <p class="bg-success bg-opacity-75 p-1 text-center rounded-3 border-1">${selectedMeal.strIngredient8}</p>


        </div>
        <div class="col-md-2">
          <p class="bg-success bg-opacity-75 p-1 text-center rounded-3 border-1">${selectedMeal.strIngredient9}</p>
        </div>




        `);




    // console.log(selectedMeal.strTags);




    let tagesContainer = ``;
    if (selectedMeal.strTags == null) {
      tagesContainer == ``;
    }
    else {
      for (let i = 0; i < selectedMeal.strTags.split(",").length; i++) {
        tagesContainer += `  <li>

              ${selectedMeal.strTags.split(",")[i]}


              </li>`


      }
    }

    $('#Instructions .row .col-md-8 ul').html(tagesContainer);


    $('#Instructions .row .col-md-8 .Source a').attr('href', selectedMeal.strSource);
    $('#Instructions .row .col-md-8  .Youtube a').attr('href', selectedMeal.strYoutube);

  }



  // Catogries display
  async function displayCatogries() {

    let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let api = await apiData.json();
    let Category = api.categories;

    let CategoryContainer = ``;
    for (let i = 0; i < Category.length; i++) {
      CategoryContainer += ` <div class="col-md-3 position-relative " Category=${Category[i].strCategory}>
            <img src="${Category[i].strCategoryThumb}" class="w-100 " Category="${Category[i].strCategory}" alt="">
  
            <div class="lyear d-block text-center " Category="${Category[i].strCategory}">
              <h3 class="d-block " Category="${Category[i].strCategory}">${Category[i].strCategory}</h3>
              <p class=" px-2 fs-5  "Category="${Category[i].strCategory}" >${Category[i].strCategoryDescription.split('.')[1]}</p>
            </div>
  
          </div>`

    }

    $('#Categories .row').html(CategoryContainer);

    $('#Categories .row').click(async function (e) {
      let selectedCatogry = ``;
      selectedCatogry = e.target.getAttribute('Category');
      console.log(selectedCatogry);
      areaIngredientsMealApi('c', selectedCatogry)


    })

  }


  // Area & Ingredients api
  async function areaIngredientsSelector(carchter) {
    let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${carchter}=list`);
    let api = await apiData.json();
    let areaIngredients = api.meals;
    if (carchter == 'a') {
      areaDisplay(areaIngredients)

    }
    else {
      ingredientsDisplay(areaIngredients)
    }

    // console.log(areaIngredients);
  }

  // Display Area
  function areaDisplay(areaIngredients) {

    let areaContainer = ``;
    for (let i = 0; i < areaIngredients.length; i++) {

      areaContainer += `<div class="col-md-3 text-center shadow " strArea=${areaIngredients[i].strArea}>
                <i class="fa-solid fa-city fa-3x p-4" strArea=${areaIngredients[i].strArea}></i>
                <h3 strArea=${areaIngredients[i].strArea} >${areaIngredients[i].strArea}</h3>

              </div>`

    }

    $('#Area .row').html(areaContainer);


    $('#Area .row').click(async function (e) {
      // console.log(e.target.getAttribute("strArea"));
      let areaSlected = e.target.getAttribute("strArea");


      areaIngredientsMealApi('a', areaSlected)

    })
  }

  // Display ingredients
  function ingredientsDisplay(areaIngredients) {

    let ingredientContainer = ``;
    for (let i = 0; i < 20; i++) {
      ingredientContainer += `  <div class="col-md-3 text-center shadow " strIngredient=${areaIngredients[i].strIngredient} >
                    <i class="fa-solid fa-bowl-food fa-3x" strIngredient=${areaIngredients[i].strIngredient}>
                    </i>
                    <h3 strIngredient=${areaIngredients[i].strIngredient}>
                    ${areaIngredients[i].strIngredient}
                    </h3>
                    <p strIngredient=${areaIngredients[i].strIngredient} >
                     ${areaIngredients[i].strDescription
        }</p>
                    </div>`


    }

    $('#Ingredients .row').html(ingredientContainer);

    $('#Ingredients .row').click(async function (e) {
      // console.log(e.target.getAttribute("strArea"));
      let IngredientsSlected = e.target.getAttribute("strIngredient");

      areaIngredientsMealApi('i', IngredientsSlected)



    })


  }





  // area ingred meals Api 
  async function areaIngredientsMealApi(carchter, item) {
    let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${carchter}=${item}`);
    let api = await apiData.json();
    let areaIngredients = api.meals;
    console.log(areaIngredients);
    dispalyData(areaIngredients)

  }


  // search Api


  async function searchValue(char, params) {


    let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${char}=${params}`);
    let api = await apiData.json();
    let meals = api.meals;

    dispalyData(meals)
  }

  // search display 

  $('.nav .Search').click(function (e) {


    $('#Search .SearchMeal').keyup(async function () {
      let SearchMeal = $('#Search .SearchMeal').val();

      searchValue('s', SearchMeal)

      $('#menu').css('display', 'none')


    });

    $('#Search .SearchMeal').blur(async () => $('#Search .SearchMeal').val(''));

    $('#Search .SearchChar').keyup(async function () {
      let SearchChar = $('#Search .SearchChar').val();
      searchValue('f', SearchChar)
      //  console.log(SearchChar);
      $('#menu').css('display', 'none')





    });
    $('#Search .SearchChar').blur(async () => $('#Search .SearchChar').val(''));



  })
  // nav item selection

  $('.nav-link').click(function (e) {
    $('#Instructions').css('display', 'none')

    let chosenLink = e.target.getAttribute('href');
    // console.log(chosenLink);

    if (chosenLink == '#Ingredients') {

      areaIngredientsSelector('i');
      $('#menu').css('display', 'none')
      $('#Ingredients').css('display', 'block')
      $('#CategoriesMeal').css('display', 'none')
      $('#Area').css('display', 'none')
      $('#Contact').css('display', 'none')
      $('#Instructions').css('display', 'none')
      $('#Search').css('display', 'none')
      $('#Contact').css('display', 'none')



    }
    else if (chosenLink == '#Area') {
      areaIngredientsSelector('a');
     
      $('#Area').css('display', 'block')
      $('#menu').css('display', 'none')
      $('#Ingredients').css('display', 'none')
      $('#CategoriesMeal').css('display', 'none')
   
      $('#Contact').css('display', 'none')
      $('#Instructions').css('display', 'none')
      $('#Contact').css('display', 'none')

      $('#Search').css('display', 'none')

    }

    else if (chosenLink == '#Contact') {

      $('#Contact').css('display', 'block')
    
      $('#Area').css('display', 'none')
      $('#menu').css('display', 'none')
      $('#Ingredients').css('display', 'none')
      $('#CategoriesMeal').css('display', 'none')
   
      $('#Search').css('display', 'none')
    
      $('#Instructions').css('display', 'none')


    }
    else if (chosenLink == '#Search') {
      $('#Search').css('display', 'block')
      $('#menu').css('display', 'none')

      $('#Contact').css('display', 'none')
     
    
      $('#Area').css('display', 'none')
      $('#menu').css('display', 'none')
      $('#Ingredients').css('display', 'none')
      $('#CategoriesMeal').css('display', 'none')
   
    
      $('#Instructions').css('display', 'none')





    }
    else if (chosenLink == '#Categories') {
      displayCatogries()
      $('#menu').css('display', 'none');
      $('#Categories').css('display', 'block');
      $('#Instructions').css('display', 'none')
      $('#Area').css('display', 'none')
      $('#Search').css('display', 'none')
      $('#Ingredients').css('display', 'none')
      $('#Contact').css('display', 'none')

    }

  });




  menuApi()






});









function validataNameInput(name) {

  console.log('fg');

  let regxName = /[A-Z]?[a-z]{1,8}$/igm;

  if (regxName.test(name) == true) {
    $('#Contact .name').addClass('is-valid');

    return true
  }
  else {

    $('#Contact .name').addClass('is-invalid');

    $('#Contact .name-v').removeClass('d-none');
    $('#Contact .name').blur(function (e) {
      $('#Contact .name').val('')
    })

  }

}




$('#Contact .name').keyup(function (e) {

  let name = $('#Contact .name').val();
  validataNameInput(name)

});



function validataemailInput(email) {


  let regxMail = /^\w{3,30}@(gmail|yahoo|hotmail)\.com$/gm;





  if (regxMail.test(email) == true) {
    $('#Contact .email').addClass('is-valid');
    return true
  } else {

    $('#Contact .email').addClass('is-invalid');

    $('#Contact .email-v').removeClass('d-none');

  }

}



$('#Contact .email').blur(function (e) {

  let email = $('#Contact .email').val();
  validataemailInput(email)

});

function validatanumberInput(number) {


  let regexNumber = /^(002)?01[0125][0-9]{8}$/;






  if (regexNumber.test(number) == true) {
    $('#Contact .number').addClass('is-valid');
    return true
  } else {

    $('#Contact .number').addClass('is-invalid');

    $('#Contact .number-v').removeClass('d-none');

  }

}



$('#Contact .number').blur(function (e) {

  let number = $('#Contact .number').val();
  validatanumberInput(number)

});

function validatapasswordInput(password) {


  let regxPassword = /^\w{8,30}$/;



  console.log(password);



  if (regxPassword.test(password) == true) {
    $('#Contact .password').addClass('is-valid');
    return true
  } else {

    $('#Contact .password').addClass('is-invalid');

    $('#Contact .password-v').removeClass('d-none');

  }

}



$('#Contact .password').blur(function (e) {

  let password = $('#Contact .password').val();
  validatapasswordInput(password)

});



function validatarepasswordInput(repassword) {


  let regxrepassword = /^\w{8,30}$/;



  console.log(repassword);



  if (regxrepassword.test(repassword) == true) {
    $('#Contact .repassword').addClass('is-valid');
    return true
  } else {

    $('#Contact .repassword').addClass('is-invalid');

    $('#Contact .repassword-v').removeClass('d-none');

  }

}



$('#Contact .repassword').blur(function (e) {

  let repassword = $('#Contact .repassword').val();
  validatarepasswordInput(repassword)

});


$('#Contact button').click( ()=>{
  
    
  
  if (validataNameInput ==true && validataemailInput==true && validatanumberInput==true && validatapasswordInput==true && validatarepasswordInput==true) {

console.log('valid Data');
    
  }
  
  else {
    $('#Contact .valid').removeClass('d-none');
   
    $('#Contact button').attr('disabled');

  }

  
});

