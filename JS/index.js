$(document).ready(function () {
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


  async function getabi() {


    // https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef
    //                        https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
    //                         www.themealdb.com/api/json/v1/1/categories.php

    let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let api = await apiData.json();
    let meals = api.meals;
    let menuContainer = ``;
    let CategoryContainer = ``;
    let selectedCatogryMeals = [];


    $('#menu ').css('display', 'block')


    for (let i = 0; i < meals.length; i++) {
      // console.log(meals[i].strMealThumb);
      menuContainer += `   <div class="col-md-3 position-relative " number="${i}">
                <img src="${meals[i].strMealThumb}" class="w-100 "   number="${i}"alt="">
    
                <div class="lyear "  number="${i}" >
                <p class=" px-2 fs-2 fw-light" number="${i}" >${meals[i].strMeal}</p>
                </div>
    
                </div>
                
       `



    }

    $('#menu .row').html(menuContainer);


    $('#menu .row').click(async function (e) {
      console.log(e.target);
      let mealindex = meals[e.target.getAttribute("number")].idMeal;

      console.log(mealindex);
      $('#menu ').css('display', 'none')
      $('#Instructions ').css('display', 'block')
      let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealindex}`);
      let api = await apiData.json();
      let selectedMeal = api.meals[0]
      // console.log(api);


      $('#Instructions .row .text-center h2').html(selectedMeal.strMeal);
      $('#Instructions .row .text-center img').attr('src', selectedMeal.strMealThumb);

      $('#Instructions .row .col-md-8 p').html(selectedMeal.strInstructions);

      $('#Instructions .row .col-md-8 .Area').html(selectedMeal.strArea);
      $('#Instructions .row .col-md-8 .Category').html(selectedMeal.strCategory);


      $('#Instructions .row .col-md-8 .Recipes').html(`<div class="col-md-2">


            <p class="bg-success">${selectedMeal.strMeasure1}</p>
          </div>
          <div class="col-md-2">
            <p class="bg-success">${selectedMeal.strMeasure2}</p>


          </div>
          <div class="col-md-2">
            <p class="bg-success">${selectedMeal.strMeasure3}</p>


          </div>
          <div class="col-md-2">
            <p class="bg-success">${selectedMeal.strMeasure4}</p>


          </div>
          <div class="col-md-2">
            <p class="bg-success">${selectedMeal.strMeasure5}</p>


          </div>
          <div class="col-md-2">
            <p class="bg-success">${selectedMeal.strMeasure6}</p>


          </div>
          <div class="col-md-2">
            <p class="bg-success">${selectedMeal.strMeasure7}</p>


          </div>
          <div class="col-md-2">
            <p class="bg-success">${selectedMeal.strMeasure8}</p>


          </div>
          <div class="col-md-2">
            <p class="bg-success">${selectedMeal.strMeasure9}</p>
          </div>
          

          
          
          `);




      // console.log(selectedMeal.strTags.split(","));
      let tagesContainer = ``
      for (let i = 0; i < selectedMeal.strTags.split(",").length; i++) {
        tagesContainer += `  <li>
   
                ${selectedMeal.strTags.split(",")[i]}
                
   
                </li>`


      }
      $('#Instructions .row .col-md-8 ul').html(tagesContainer);


      $('#Instructions .row .col-md-8 .Source a').attr('href', selectedMeal.strSource);
      $('#Instructions .row .col-md-8  .Youtube a').attr('href', selectedMeal.strYoutube);
    });


    // Categorie selection 

    $('.nav .Categories').click(async () => {


      $('#menu ').css('display', 'none')
      $('#Instructions ').css('display', 'none')

      $('#Categories').css('display', 'block')

      let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
      let api = await apiData.json();
      let Category = api.categories;
      // console.log(Category);

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

    });

    $('#Categories .row').click(async function (e) {
      let selectedCatogry = ``;
      selectedCatogry = e.target.getAttribute('Category');
      $('#Categories').css('display', 'none')

      console.log(selectedCatogry);
      let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCatogry}`);
      let api = await apiData.json();
      selectedCatogryMeals = api.meals;
      // console.log(selectedCatogryMeals);

      let selectedCatogryMealsContainer = ``;
      for (let i = 0; i < selectedCatogryMeals.length; i++) {
        // console.log(meals[i].strMealThumb);
        selectedCatogryMealsContainer += `   <div class="col-md-3 position-relative " number="${i}">
                <img src="${selectedCatogryMeals[i].strMealThumb}" class="w-100 "   number="${i}"alt="">
    
                <div class="lyear "  number="${i}" >
                <p class=" px-2 fs-2 fw-light" number="${i}" >${selectedCatogryMeals[i].strMeal}</p>
                </div>
    
                </div>
                
       `    }

      $('#menu').css('display', 'none')
      $('#CategoriesMeal').css('display', 'block')
      $('#CategoriesMeal .row').html(selectedCatogryMealsContainer);



      $('#CategoriesMeal .row').click(async function (e) {

        let mealindex = selectedCatogryMeals[e.target.getAttribute("number")].idMeal;


        // console.log(mealindex);
        $('#CategoriesMeal ').css('display', 'none')
        $('#Instructions ').css('display', 'block')
        let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealindex}`);
        let api = await apiData.json();
        let selectedMeal = api.meals[0]
        console.log(selectedMeal);
        // console.log(api);


        $('#Instructions .row .text-center h2').html(selectedMeal.strMeal);
        $('#Instructions .row .text-center img').attr('src', selectedMeal.strMealThumb);

        $('#Instructions .row .col-md-8 p').html(selectedMeal.strInstructions);

        $('#Instructions .row .col-md-8 .Area').html(selectedMeal.strArea);
        $('#Instructions .row .col-md-8 .Category').html(selectedMeal.strCategory);


        $('#Instructions .row .col-md-8 .Recipes').html(`<div class="col-md-2">
    
    
                <p class="bg-success">${selectedMeal.strMeasure1}</p>
              </div>
              <div class="col-md-2">
                <p class="bg-success">${selectedMeal.strMeasure2}</p>
    
    
              </div>
              <div class="col-md-2">
                <p class="bg-success">${selectedMeal.strMeasure3}</p>
    
    
              </div>
              <div class="col-md-2">
                <p class="bg-success">${selectedMeal.strMeasure4}</p>
    
    
              </div>
              <div class="col-md-2">
                <p class="bg-success">${selectedMeal.strMeasure5}</p>
    
    
              </div>
              <div class="col-md-2">
                <p class="bg-success">${selectedMeal.strMeasure6}</p>
    
    
              </div>
              <div class="col-md-2">
                <p class="bg-success">${selectedMeal.strMeasure7}</p>
    
    
              </div>
              <div class="col-md-2">
                <p class="bg-success">${selectedMeal.strMeasure8}</p>
    
    
              </div>
              <div class="col-md-2">
                <p class="bg-success">${selectedMeal.strMeasure9}</p>
              </div>
              
    
              
              
              `);




        // console.log(selectedMeal.strTags.split(","));
        let tagesContainer = ``
        for (let i = 0; i < selectedMeal.strTags.split(",").length; i++) {
          tagesContainer += `  <li>
       
                    ${selectedMeal.strTags.split(",")[i]}
                    
       
                    </li>`


        }
        $('#Instructions .row .col-md-8 ul').html(tagesContainer);


        $('#Instructions .row .col-md-8 .Source a').attr('href', selectedMeal.strSource);
        $('#Instructions .row .col-md-8  .Youtube a').attr('href', selectedMeal.strYoutube);
      });



    });

    //  area selection 

    $('.nav-link').click(function (e) {
      $('#Instructions').css('display', 'none')

      let chosenLink = e.target.getAttribute('href');

      if (chosenLink == '#Ingredients') {
        areaIngredientsSelector('i')
        $('#Ingredients').css('display', 'block')
        $('#Area').css('display', 'none')
        $('#Contact').css('display', 'none')
        $('#Search').css('display', 'none')
        $('#Categories').css('display', 'none')
        $('#CategoriesMeal').css('display', 'none')




      }
      else if (chosenLink == '#Area') {
        areaIngredientsSelector('a')
        $('#Area').css('display', 'block')
        $('#Ingredients').css('display', 'none')
        $('#Contact').css('display', 'none')
        $('#Search').css('display', 'none')
        $('#Categories').css('display', 'none')
        $('#CategoriesMeal').css('display', 'none')
        $('#Instructions').css('display', 'none')


      }

      else if (chosenLink == '#Contact') {

        $('#Contact').css('display', 'block')
        $('#Ingredients').css('display', 'none')
        $('#Area').css('display', 'none')
        $('#Search').css('display', 'none')
        $('#Categories').css('display', 'none')
        $('#CategoriesMeal').css('display', 'none')
        $('#Instructions').css('display', 'none')


        //Validation Massage 
        $('#Contact  .number').click(function (e) {

          $('#Contact .number-v').html('<p> Enter valid Phone Number</p>');

        });
        $('#Contact  .number').blur(function (e) {

          $('#Contact .number-v').html('');

        });

        $('#Contact  .password').click(function (e) {

          $('#Contact .password-v').html('<p> Enter valid password *Minimum eight characters, at least one letter and one number:*</p>');

        });
        $('#Contact  .password').blur(function (e) {

          $('#Contact .password-v').html('');

        });

        $('#Contact  .repassword').click(function (e) {

          $('#Contact .repassword-v').html('<p> Special Characters and Numbers not allowed and must equal password</p>');

        });
        $('#Contact  .repassword').blur(function (e) {

          $('#Contact .repassword-v').html('');

        });
        function validataInput() {
          let regxName = /^[A-Z]?[a-z]{2,8}$/gm;
          let regxMail = /^\w{3,30}@(gmail|yahoo|hotmail)\.com$/gm;
          let regxPassword = /^\w{8,30}$/;
          let regxREPassword = /^\w{8,30}$/;
          let regexNumber = /^(002)?01[0125][0-9]{8}$/;

          let nameInput = $('.col-md-6 .name').val();
          let numberInput = $('.col-md-6 .number').val();
          let ageInput = $('.col-md-6 .age').val();
          let emailInput = $('.col-md-6 .email').val();
          let passwordInput = $('.col-md-6 .password').val();
          let repasswordInput = $('.col-md-6 .repassword').val();



          if (regxName.test(nameInput.value) === true && regexNumber.test(numberInput.value) === true && regxMail.test(emailInput.value) === true && regxPassword.test(passwordInput.value) === true && repasswordInput === passwordInput) {
            return true;

          }
          else {

            $('.valid').html('<h2 class=" border border-2 p-4 w-50 m-auto text-bg-danger ">Please inter valid Data </h2>');
          }

        }


        $('#Contact .Submit').click(function () {
          if (validataInput()) {
            console.log(true);
          }
          else {
            console.log(false);
          }

        })


      }
      else if (chosenLink == '#Search') {

        $('#Search').css('display', 'block')
        $('#Ingredients').css('display', 'none')
        $('#Area').css('display', 'none')
        $('#Contact').css('display', 'none')
        $('#Categories').css('display', 'none')
        $('#CategoriesMeal').css('display', 'none')
        $('#Instructions').css('display', 'none')





      }
      else if (chosenLink == '##Duration') {
        $('#Categories').css('display', 'block')
        $('#Ingredients').css('display', 'none')
        $('#Area').css('display', 'none')
        $('#Contact').css('display', 'none')
        $('#Search').css('display', 'none')
        $('#CategoriesMeal').css('display', 'none')
        $('#Instructions').css('display', 'none')

      }

    });


    async function areaIngredientsSelector(carchter) {
      let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${carchter}=list`);
      let api = await apiData.json();
      let areaIngredients = api.meals;
      // console.log(areaIngredients);
      $('#menu ').css('display', 'none')
      $('#search ').css('display', 'none')
      $('#Categories ').css('display', 'none')
      $('#CategoriesMeal ').css('display', 'none')
      $('#contact ').css('display', 'none')

      let areaContainer = ``;
      for (let i = 0; i < areaIngredients.length; i++) {
        if (carchter == 'a') {
          areaContainer += `<div class="col-md-3 text-center shadow " strArea=${areaIngredients[i].strArea}>
                    <i class="fa-solid fa-city fa-3x p-4" strArea=${areaIngredients[i].strArea}></i>
                    <h3 strArea=${areaIngredients[i].strArea} >${areaIngredients[i].strArea}</h3>
    
                  </div>`
          $('#Area .row').html(areaContainer);
        }
        else if (carchter == 'i') {
          areaContainer += `  <div class="col-md-3 text-center shadow " strIngredient=${areaIngredients[i].strIngredient} >
                    <i class="fa-solid fa-bowl-food fa-3x" strIngredient=${areaIngredients[i].strIngredient}>
                    </i>
                    <h3 strIngredient=${areaIngredients[i].strIngredient}>
                    ${areaIngredients[i].strIngredient}
                    </h3>
                    <p strIngredient=${areaIngredients[i].strIngredient} >
                     ${areaIngredients[i].strDescription}

                    </p>
                  </div>`
          $('#Ingredients .row').html(areaContainer);
        }
      }

      $('#Area .row').click(async function (e) {
        // console.log(e.target.getAttribute("strArea"));
        let areaSlected = e.target.getAttribute("strArea");
        areaCatogryDispaly('a', areaSlected)


      })
      $('#Ingredients .row').click(async function (e) {
        let selectedIngredient = e.target.getAttribute("strIngredient");
        // console.log(selectedIngredient);
        areaCatogryDispaly('i', selectedIngredient)



      })
      async function areaCatogryDispaly(carchter, SlectedItem) {
        let DAta = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${carchter}=${SlectedItem}`);
        let apis = await DAta.json();
        let areaIngredientsData = apis.meals;
        // console.log(areaIngredientsData);



        let selectedCatogryMealsContainer = ``;

        for (let i = 0; i < areaIngredientsData.length; i++) {
          // console.log(meals[i].strMealThumb);
          selectedCatogryMealsContainer += `    <div class="col-md-3 position-relative " idMeal="${areaIngredientsData[i].idMeal}">
                    <img src="${areaIngredientsData[i].strMealThumb}" class="w-100 "   idMeal="${areaIngredientsData[i].idMeal}"alt="">
        
                    <div class="lyear "   idMeal="${areaIngredientsData[i].idMeal}" >
                    <p class=" px-2 fs-2 fw-light"  idMeal="${areaIngredientsData[i].idMeal}" >${areaIngredientsData[i].strMeal}</p>
                    </div>
        
                    </div>
                    
           `    }

        $('#menu').css('display', 'none')
        $('#Ingredients').css('display', 'none')
        $('#Area').css('display', 'none')
        $('#menu').css('display', 'none')

        $('#CategoriesMeal').css('display', 'block')
        $('#CategoriesMeal .row').html(selectedCatogryMealsContainer);



        $('#CategoriesMeal .row').click(async function (e) {

          let mealindex = selectedCatogryMeals[e.target.getAttribute("idMeal")];



          // console.log(mealindex);
          $('#CategoriesMeal ').css('display', 'none')
          $('#Instructions ').css('display', 'block')
          let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealindex}`);
          let api = await apiData.json();
          let selectedMeal = api.meals[0]
          console.log(selectedMeal);
          // console.log(api);


          $('#Instructions .row .text-center h2').html(selectedMeal.strMeal);
          $('#Instructions .row .text-center img').attr('src', selectedMeal.strMealThumb);

          $('#Instructions .row .col-md-8 p').html(selectedMeal.strInstructions);

          $('#Instructions .row .col-md-8 .Area').html(selectedMeal.strArea);
          $('#Instructions .row .col-md-8 .Category').html(selectedMeal.strCategory);


          $('#Instructions .row .col-md-8 .Recipes').html(`<div class="col-md-2">
    
    
                <p class="bg-success">${selectedMeal.strMeasure1}</p>
              </div>
              <div class="col-md-2">
                <p class="bg-success">${selectedMeal.strMeasure2}</p>
    
    
              </div>
              <div class="col-md-2">
                <p class="bg-success">${selectedMeal.strMeasure3}</p>
    
    
              </div>
              <div class="col-md-2">
                <p class="bg-success">${selectedMeal.strMeasure4}</p>
    
    
              </div>
              <div class="col-md-2">
                <p class="bg-success">${selectedMeal.strMeasure5}</p>
    
    
              </div>
              <div class="col-md-2">
                <p class="bg-success">${selectedMeal.strMeasure6}</p>
    
    
              </div>
              <div class="col-md-2">
                <p class="bg-success">${selectedMeal.strMeasure7}</p>
    
    
              </div>
              <div class="col-md-2">
                <p class="bg-success">${selectedMeal.strMeasure8}</p>
    
    
              </div>
              <div class="col-md-2">
                <p class="bg-success">${selectedMeal.strMeasure9}</p>
              </div>
              
    
              
              
              `);




          // console.log(selectedMeal.strTags.split(","));
          let tagesContainer = ``
          for (let i = 0; i < selectedMeal.strTags.split(",").length; i++) {
            tagesContainer += `  <li>
       
                    ${selectedMeal.strTags.split(",")[i]}
                    
       
                    </li>`


          }
          $('#Instructions .row .col-md-8 ul').html(tagesContainer);


          $('#Instructions .row .col-md-8 .Source a').attr('href', selectedMeal.strSource);
          $('#Instructions .row .col-md-8  .Youtube a').attr('href', selectedMeal.strYoutube);
        });




      }
    }

    $('.nav .Contact').click(function () {
      console.log('hello');
      $('#menu ').css('display', 'none')
      $('#Contact ').css('display', 'block')
    })

    $('.nav .Search').click(function () {

      $('#menu ').css('display', 'none')
      $('#Search').css('display', 'block')
    })


    // search 

    $('.nav .Search').click(function (e) {
      console.log('search');

      $('#Search .SearchMeal').keypress(async function () {
        let SearchMeal = $('#Search .SearchMeal').val();
      
        searchValue('s',SearchMeal)
        $('#menu').css('display', 'none')


      });
 
      $('#Search .SearchChar').keyup(async function () {
        let SearchChar = $('#Search .SearchChar').val();
        searchValue('s',SearchChar)
     console.log(SearchChar);
     

    


      });


      $('#Search .SearchMeal').blur(()=>{
        $('#Search .SearchMeal').val('')
        $('#menu').css('display', 'none')

      })
      async function searchValue(char ,params) {


        let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${char}=${params}`);
        let api = await apiData.json();
        let meals = api.meals;
        let menuContainer = ``;
        let CategoryContainer = ``;
        let selectedCatogryMeals = [];

        $('#Search').css('display', 'block')

        $('#menu ').css('display', 'block')


        for (let i = 0; i < meals.length; i++) {
          // console.log(meals[i].strMealThumb);
          menuContainer += `   <div class="col-md-3 position-relative " number="${i}">
                <img src="${meals[i].strMealThumb}" class="w-100 "   number="${i}"alt="">
    
                <div class="lyear "  number="${i}" >
                <p class=" px-2 fs-2 fw-light" number="${i}" >${meals[i].strMeal}</p>
                </div>
    
                </div>
                
       `



        }
      
        $('#menu .row').html(menuContainer);
      }
    });




  }

  getabi()
});


$('#Contact  .name').click(function (e) {

  $('#Contact .name-v').html('<p> Special Characters and Numbers not allowed</p>');

});
$('#Contact  .name').blur(function (e) {

  $('#Contact .name-v').html('');

});

$('#Contact  .email').click(function (e) {

  $('#Contact .email-v').html('<p> Enter valid email. *Ex: xxx@yyy.zzz </p>');

});
$('#Contact  .email').blur(function (e) {

  $('#Contact .email-v').html('');

});


