import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FoodInfo from "./FoodInfo.js";



class NutritionTableBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mealType: this.props.mealType,
            index: this.props.index,
            foodIds: [],
            foodInfos: [],
        }
        this.addAdder = this.addAdder.bind(this);
        this.addFood = this.addFood.bind(this);
        this.selectOneFood = this.selectOneFood.bind(this);
        this.addFoodId = this.addFoodId.bind(this);
    }


    addAdder(e) {
        this.setState({foodIds: []});
        this.setState({foodCards: []});
        console.log(this.state);
        let parentElement = e.target.parentElement.parentElement;
        console.log(e.target.tagName);
        if(e.target.nodeName ==="path") {
            parentElement = e.target.parentElement.parentElement.parentElement.parentElement;
        }
        if(e.target.nodeName === 'svg') {
            parentElement = e.target.parentElement.parentElement.parentElement;
        }
        console.log(parentElement);
        const foodInputWrapper = document.createElement('div');
        foodInputWrapper.id = 'food-input-wrapper';
        foodInputWrapper.className = 'food-input-wrapper';
        foodInputWrapper.innerHTML = `
            <input type="text" placeholder="Write here..." id="food-id-input"/>
            <button id="add-food-button"><i class="fa-solid fa-plus"></i></button>
        `;
        parentElement.firstChild.after(foodInputWrapper);
        foodInputWrapper.children[1].addEventListener('click', this.addFood);
    }

    addFood() {
        console.log("Adding food");
        const foodInput = document.getElementById('food-id-input').value;
        if(foodInput === '') return;
        const idRegex = /^\d+$/;
        if(foodInput.match(idRegex)) {
            const newFoodIds = [...this.state.foodIds, foodInput];
            this.setState({foodIds: newFoodIds});
            this.getFoodData({fdcId: foodInput});
        }
        else{
            this.getThreeFoods(foodInput);
        }
    }

    async getThreeFoods(foodName) {
        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=L0yOlAsUuTJuZCDIxfW8dFL55AGRxSnpVhttLJ2h&query=${foodName}&dataType=SR%20Legacy&pageSize=50&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc`);
        const data = await response.json();
        console.log(data);
        for(let i = 0; i < 3; i++) {
            this.getFoodData(data.foods[i]);
        }
    }

    async getFoodData(data) {
        console.log(data);
        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${data.fdcId}?api_key=L0yOlAsUuTJuZCDIxfW8dFL55AGRxSnpVhttLJ2h`);
        const foodData = await response.json();
        this.selectOneFood(foodData);
    }

    selectOneFood(data) {
        const foodData = {
            fdcId: data.fdcId,
            description: data.description,
            foodCategory: data.foodCategory.description,
            itemType: data.foodPortions !== undefined? data.foodPortions[0].modifier : data.itemType !== undefined? data.itemType : "",
            weightPerItem: data.foodPortions !==undefined? data.foodPortions[0].gramWeight : data.weightPerItem !== undefined? data.weightPerItem : "",
            nutrients: {
                calories: data.foodNutrients[2].amount,
                protein: data.foodNutrients[4].amount,
                fat: data.foodNutrients[5].amount,
                carbohydrates: data.foodNutrients[8].amount,
            }
        }
        const foodCard = React.createElement(FoodInfo, {foodData: foodData , addFoodId: this.addFoodId});
        this.setState({foodInfos: [...this.state.foodInfos, foodCard]});
        if(document.getElementById('food-input-wrapper')) {
            const foodInputWrapper = document.getElementById('food-input-wrapper');
            foodInputWrapper.remove();
        }
    }

    addFoodId(e) {
        const foodInfo = e.target.parentElement.parentElement;
        const foodCards = foodInfo.parentElement;
        const destination = foodInfo.parentElement.previousElementSibling;
        destination.appendChild(foodInfo);
        console.log(foodInfo);
        foodCards.innerHTML = '';
        e.target.remove();
    }

    render() {
        return (
            <div className="nutrition-table-container" id={this.state.mealType}>
                <div className="nutrition-table-banner">
                    <h2>{this.state.mealType}</h2>
                    <button onClick={this.addAdder}><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <div className="nutrition-table-content" id="nutrition-table-content">
                </div>
                <div className="food-cards" id="food-cards">
                    {this.state.foodInfos.map((foodInfo) => foodInfo)}
                </div>
            </div>
        )
    }
}

export default NutritionTableBanner;