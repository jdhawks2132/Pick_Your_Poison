const randomBASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const baseURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const drinkMenu = document.querySelector("#drink-menu")
const randomDrink = document.getElementsByClassName("surprise")
const randomDrinkImage = document.getElementById("sup")
const randomDrinkName = document.getElementById("sup-drink-name")
const randomDrinkGlass = document.getElementById("sup-drink-glass")
const randomDrinkIngridients = document.getElementById("sup-drink-ing")
const randomDrinkRecipe = document.getElementById("sup-drink-inst")
const surpriseMeButton = document.getElementById("surprise-me")
const newDrinkForm = document.querySelector('#new-drink')
const numberOfLikes = document.getElementById("number-of-likes")
const likesButton = document.getElementById("drink-likes")
const likeNumber = document.getElementById("like-number")

let dataHolder= [];

newDrinkForm.addEventListener('submit', formHandler)

document.addEventListener("DOMContentLoaded", () => {
    fetch(baseURL)
    .then(resp => resp.json())
    .then(drinks => {
        drinksArray = Object.entries(drinks.drinks)
        dataFeeder(drinksArray)
})
})

function dataFeeder(drinksArray){
    drinksArray.forEach(displayDrinks);
    displayFirstDrink(drinksArray[0])
    makeDataGlobal(drinksArray);
}

function makeDataGlobal(drinksArray){
    dataHolder = [...drinksArray]
    return dataHolder;
}

function displayDrinks(drinksArray) {
        const menuImage = document.createElement("img")
        menuImage.src = drinksArray[1].strDrinkThumb

        menuImage.addEventListener('click', () => {
            document.querySelector("#drink-img").src = drinksArray[1].strDrinkThumb;
            document.querySelector("#drink-name").textContent = drinksArray[1].strDrink;
            document.querySelector("#drink-glass").textContent = drinksArray[1].strGlass;
            document.getElementById("drink-inst").textContent = drinksArray[1].strInstructions;
            
            var stringText = ""
            for (const key in drinksArray[1]) {
                console.log(drinksArray[1])
                if (!key.startsWith("strIngredient")) { continue }
                if (drinksArray[1][key] != null && drinksArray[1][key] != undefined) {
                let measureKey = key.replace('Ingredient', 'Measure') // strIngredient1 => strMeasure1
                stringText = stringText + `${drinksArray[1][key]}(${drinksArray[1][measureKey]}), `
            }
        }
            document.getElementById("ing").textContent = stringText.replaceAll('(null)', '').slice(0, -2)
            // document.getElementById("ing").textContent = `${drinksArray[1].strIngredient1}, ${drinksArray[1].strIngredient2}, ${drinksArray[1].strIngredient3}`;
            
            likeNumber.textContent = 0
        })
        drinkMenu.append(menuImage)
}

function displayFirstDrink(drinksArray){
    document.querySelector("#drink-img").src = drinksArray[1].strDrinkThumb;
    document.querySelector("#drink-name").textContent = drinksArray[1].strDrink;
    document.querySelector("#drink-glass").textContent = drinksArray[1].strGlass;
    document.getElementById("drink-inst").textContent = drinksArray[1].strInstructions;

    var stringText = ""
    for (const key in drinksArray[1]) {
        if (!key.startsWith("strIngredient")) { continue }
        if (drinksArray[1][key] != null && drinksArray[1][key] != undefined) {
            let measureKey = key.replace('Ingredient', 'Measure') // strIngredient1 => strMeasure1
            stringText = stringText + `${drinksArray[1][key]}(${drinksArray[1][measureKey]}), `
        }
    }

    document.getElementById("ing").textContent = stringText.replaceAll('(null)', '').slice(0, -2)
    // document.getElementById("ing").textContent = `${drinksArray[1].strIngredient1}(${drinksArray[1].strMeasure1}), ${drinksArray[1].strIngredient2}(${drinksArray[1].strMeasure2}), ${drinksArray[1].strIngredient3}(${drinksArray[1].strMeasure3})`;
}

surpriseMeButton.addEventListener("click", () => {
    fetch(randomBASE_URL)
    .then(resp => resp.json())
    .then(drinks => {
        randomDrinkArray = Object.entries(drinks.drinks)
        dataFeeder(randomDrinkArray)
        })
        function dataFeeder(randomDrinkArray){
            randomDrinkArray.forEach(displayRandomDrinks);
            makeDataGlobal(randomDrinkArray);
        }
        
        function displayRandomDrinks(randomDrinkArray) {
            randomDrinkImage.src = randomDrinkArray[1].strDrinkThumb
            randomDrinkName.textContent = `${randomDrinkArray[1].strDrink}`
            randomDrinkGlass.textContent = `${randomDrinkArray[1].strGlass}`
            randomDrinkRecipe.textContent = `Instructions: ${randomDrinkArray[1].strInstructions}`
            
        var stringText = ""
        for (const key in randomDrinkArray[1]) {
            if (!key.startsWith("strIngredient")) { continue }
            if (randomDrinkArray[1][key] != null && randomDrinkArray[1][key] != undefined) {
            let measureKey = key.replace('Ingredient', 'Measure') // strIngredient1 => strMeasure1
            stringText = stringText + `${randomDrinkArray[1][key]}(${randomDrinkArray[1][measureKey]}), `
        }
    }

            randomDrinkIngridients.textContent = stringText.replaceAll('(null)', '').slice(0, -2)
            // randomDrinkIngridients.textContent = `Ingredients: ${randomDrinkArray[1].strIngredient1}(${randomDrinkArray[1].strMeasure1}), ${randomDrinkArray[1].strIngredient2}(${randomDrinkArray[1].strMeasure2}), ${randomDrinkArray[1].strIngredient3}(${randomDrinkArray[1].strMeasure3}), ${randomDrinkArray[1].strIngredient4}(${randomDrinkArray[1].strMeasure4})`
            
        }
})

function formHandler (e) {
    e.preventDefault()
    const newDrinksObj = {};
    newDrinksObj.strDrink = document.querySelector("#new-name").value,
    newDrinksObj.strGlass = document.querySelector("#new-glass").value,
    newDrinksObj.strDrinkThumb = document.querySelector("#new-image").value,
    newDrinksObj.strIngredient1 = document.querySelector("#new-ingredients").value,
    newDrinksObj.strInstructions = document.querySelector("#new-instructions").value

    displayUserDrink(newDrinksObj)
    newDrinkForm.reset()
}

function displayUserDrink(newDrinksObj) {
    const newMenuImage = document.createElement("img")
    newMenuImage.src = newDrinksObj.strDrinkThumb

    newMenuImage.addEventListener('click', () => {
        document.querySelector("#drink-img").src = newDrinksObj.strDrinkThumb;
        document.querySelector("#drink-name").textContent = newDrinksObj.strDrink;
        document.querySelector("#drink-glass").textContent = newDrinksObj.strGlass;
        document.getElementById("drink-inst").textContent = newDrinksObj.strInstructions;
        
        // var stringText = ""
    //     for (const key in newDrinksObj[1]) {
    //         console.log(newDrinksObj[1])
    //         if (!key.startsWith("strIngredient")) { continue }
    //         if (newDrinksObj[1][key] != null && newDrinksObj[1][key] != undefined) {
    //         let measureKey = key.replace('Ingredient', 'Measure') // strIngredient1 => strMeasure1
    //         stringText = stringText + `${newDrinksObj[1][key]}(${newDrinksObj[1][measureKey]}), `
    //     }
    // }
        // document.getElementById("ing").textContent = stringText.replaceAll('(null)', '').slice(0, -2)
        document.getElementById("ing").textContent = `${newDrinksObj.strIngredient1}`;

        
        likeNumber.textContent = 0
    })
    drinkMenu.append(newMenuImage)
}

likesButton.addEventListener("click", () => {
    let currNum = likeNumber.innerText;
    currNum++;
    let newCount = parseInt(currNum);
    likeNumber.textContent= newCount
})