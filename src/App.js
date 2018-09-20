import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state= {
      queryEntered: '',
      recipes: [],
    }
  }

  getData = () => {
    fetch(`http://www.recipepuppy.com/api/?q=${this.state.queryEntered}`)
    .then(results => {
      return results.json();
    }).then(data => {
      let recipes = data.results.map((recipe) => {
        return(
          <div key={recipe.title}>
            <p>{recipe.title}</p>
          </div>
        )
      })
      this.setState({recipes: recipes});
      console.log("state", this.state.recipes);
    })
  }

  handleQueryChange = (e) => {
    this.setState({queryEntered: e.target.value});
    this.getData()
  }


  render() {

    console.log(this.state.queryEntered);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Finder</h1>
          <p className="Home-text">Home</p>
        </header>
        <div className="Search-container">
          <form>
            <input type="text" placeholder="Search for..." value={this.state.queryEntered} onChange={this.handleQueryChange} />
          </form>
          <button className="Search-button" onClick={this.handleQueryChange}>Search</button>
        </div>
        <div className="Results-section">
					<div className="Recipe-name">
              {this.state.recipes}
					</div>
				</div>
      </div>
    );
  }
}

export default App;
