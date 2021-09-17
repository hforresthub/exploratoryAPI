

// get all meals of a type, seafood as test

// namespace
const mM = {}

// data
mM.meals = []
mM.categories = []

// query selectors
mM.mealCategoriesEl = document.querySelector('.categories>ul')
mM.mealNameEl = document.querySelector('.mealName')
mM.mealImageEl = document.querySelector('.mealImage')
mM.ingredientsEl = document.querySelector('.ingredients')
mM.instructionsEl = document.querySelector('.instructions')
mM.buttonsEl = document.querySelector('.buttonsWrapper')

// functions
// start up functions
mM.getMealCategories = () => {
	const newUrl = new URL(`https://www.themealdb.com/api/json/v1/1/categories.php`)
	
	mM.meals = fetch(newUrl)
	.then((response) => response.json())
	.then((jsonResult) => {
		// remove this log later
		console.log(jsonResult);
		
		mM.categories = jsonResult.categories
		
		mM.displayCategories()
	})
	
}

mM.displayCategories = () => {
	mM.mealCategoriesEl.innerHTML = ''
	mM.categories.forEach((category) => {
		const newLiEl = document.createElement('li')
		newLiEl.innerHTML = `
		<h2>${category.strCategory}</h2>
		<img src="${category.strCategoryThumb}" alt="${category.strCategory}">
		`
		mM.mealCategoriesEl.append(newLiEl)
	})
}

// listener functions
mM.acquireCategory = () => {
	
}

// other functions
mM.getMealsByCat = (category) => {
	const newUrl = new URL(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
	
	mM.meals = fetch(newUrl)
		.then((response) => response.json())
		.then((jsonResult) => {
			// remove this log later
			console.log(jsonResult);

			mM.meals = jsonResult.meals

			mM.getRandomMeal()
		})
	
}

mM.getRandomMeal = () => {
	const randomIndex = Math.floor(Math.random() * mM.meals.length)
	const meal = mM.meals[randomIndex]

	mM.displayMeal(meal)
}

mM.displayMeal = (meal) => {
	mM.mealNameEl.textContent = meal.strMeal
	mM.mealImageEl.src = meal.strMealThumb
	
	// api call for full details
	const newUrl = new URL(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
	
	mM.meals = fetch(newUrl)
		.then((response) => response.json())
		.then((jsonResult) => {
			// remove this log later
			console.log(jsonResult);


		})
}

// init
mM.init = () => {
	mM.getMealCategories()
}

mM.init()

// listeners
mM.buttonsEl.addEventListener('click', mM.acquireCategory)
