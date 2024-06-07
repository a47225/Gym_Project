import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './NutritionTable.css';

function NutritionTable() {
    const [mealTypes, setMealTypes] = React.useState([]);

    function addMealType() {
        const mealType = document.getElementById('meal-type-input').value;
        if(mealType === '') return;
        const newMealTypes = [...mealTypes, mealType];
        setMealTypes(newMealTypes);
        document.getElementById('meal-type-input').value = '';
    }

    function addFoodInput(e) {
        let id = e.target.id;
        console.log(e,e.target.tagName);
        if(e.target.tagName ==="path") id = e.target.parentElement.parentElement.id;
        if(e.target.tagName === 'svg') id = e.target.parentElement.id;
        console.log(id);
        const parent = document.getElementById("meal-type-" + id);
        const foodInputWrapper = document.createElement('div');
        foodInputWrapper.className = 'food-input-wrapper';
        const foodInput = document.createElement('input');
        foodInput.placeholder = 'Food';
        const foodButton = document.createElement('button');
        foodButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
        foodButton.onclick = addFood;
        foodInputWrapper.appendChild(foodInput);
        foodInputWrapper.appendChild(foodButton);
        parent.appendChild(foodInputWrapper);
    }

    function addFood() {
        const food = this.previousSibling.value;
        const parent = this.parentElement;
        if(food === '') {parent.remove(); return;};
        const parentParent = parent.parentElement;
        console.log(parentParent);
        const foodDiv = document.createElement('div');
        foodDiv.className = 'food';
        foodDiv.innerHTML = food;
        parent.remove();
        parentParent.appendChild(foodDiv);
    }


    return(
        <div id="table-wrapper" className='table-wrapper'>
            <div id="table">
                {mealTypes.map((mealType, index) => {
                    return (
                        <div className="meal-type" key={mealType + "-" + index} id={"meal-type-" + index}>
                            <div className="meal-type-banner" key={"banner-"+ index}>
                                <h3 key={"h3" + index}>{mealType}</h3>
                                <button onClick={addFoodInput} key={"button" + index} id={index}>
                                <FontAwesomeIcon icon={faPlus} key={"Fontawesome" + index}/>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div id="meal-type-add">
                <input type="text" placeholder="Meal Type..." id="meal-type-input"/>
                <button onClick={addMealType}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
        </div>
    )
}

export default NutritionTable;