import React from 'react';


class FoodCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foodData: this.props.foodData,
        }
    }

    render() {
        console.log("rendering FoodCard");
        return(
            <div className="food-card" id={this.state.foodData.fdcId}>
                <div className="food-card-header">
                    <h3>{this.state.foodData.description}</h3>
                    <p>{this.state.foodData.foodCategory}</p>
                    <p>Weight per {this.state.foodData.itemType}: {this.state.foodData.weightPerItem}g</p>
                </div>
                <div className="food-card-body">
                    <div className="per-100">
                        <p></p><p>Per 100g</p>
                    </div>
                    <div className="food-card-nutrients">
                        <p>Calories:</p> <p>{this.state.foodData.nutrients.calories}KCal</p>
                    </div>
                    <div className="food-card-nutrients">
                        <p>Protein:</p> <p>{this.state.foodData.nutrients.protein}g</p>
                    </div>
                    <div className="food-card-nutrients">
                        <p>Fat:</p> <p>{this.state.foodData.nutrients.fat}g</p>
                    </div>
                    <div className="food-card-nutrients">
                        <p>Carbs:</p> <p>{this.state.foodData.nutrients.carbohydrates}g</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default FoodCard;