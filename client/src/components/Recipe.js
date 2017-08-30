import React, { Component } from 'react';
import {TimelineMax, Elastic} from 'gsap';
import GSAP from 'react-gsap-enhancer';

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeContainerStyle: "recipeNotClicked"
    }
  }

  recipeClickHandler() {
    console.log("clicked");
    this.setState({
      recipeContainerStyle: (this.state.recipeContainerStyle == "recipeClicked") ? "recipeNotClicked" : "recipeClicked"
    });
    const recipeWindow = new TimelineMax();
    recipeWindow.to(".recipeClicked", 2, {x:0, y:0, force3D:true}, 0.01);
  }

  getRecipeStats() {
    if (this.state.recipeContainerStyle == "recipeNotClicked") {
      return (
        <div className="recipeContainer" onClick={this.recipeClickHandler.bind(this)}>
          <li className={this.state.recipeContainerStyle} style={{
            backgroundImage: 'url(' + this.props.recipe.image_url + ')'
          }}></li>
          <li className="recipeData">{this.props.recipe.title}</li>
        </div>
      )
    } else {
      return (
        <div className="recipeContainerLarge" onClick={this.recipeClickHandler.bind(this)}>
          <li className="openRecipeImgHolder">
            <div className={this.state.recipeContainerStyle} style={{
              backgroundImage: 'url(' + this.props.recipe.image_url + ')'
            }}></div>
          </li>
          <div className="openRecipeData">
            <hr />
            <li className="openRecipeTitle"><h2><a href={this.props.recipe.source_url} target="_blank" alt="click to go view this recipe">{this.props.recipe.title}</a></h2></li>
            <li className="openRecipePublisher">from <em><a href={this.props.recipe.publisher_url} target="_blank" alt={this.props.recipe.pusblisher}>{this.props.recipe.publisher}</a></em></li>
          </div>
        </div>
      )
    }

  }

  render() {
    return (
      this.getRecipeStats()
    );
  }

}

export default Recipe;
