import React, { Component } from 'react';
import $ from 'jquery'; 
import injector from './../../../../src/inject.js';
import Row from './Row.js'; 
injector(React);

function keyPress(e){
    const keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      let newState = this.state.list.slice();
      const input = document.getElementById("listInput");
      newState.push(input.value);
      this.setState({list: newState});
      input.value = '';
    }
}

function deleteItem(i) {
  let newState = this.state.list.slice();
  newState.splice(i, 1);
  this.setState({list: newState});
}

class App extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = deleteItem.bind(this);
    this.getData = this.getData.bind(this);
    this.editData = this.editData.bind(this);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      list: [], 
      test: 'testy'
    };
    this.editing = -1; 
  }

  componentWillMount() {
    this.getData();
  }

  editData(e, i) {
    const keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      const item = document.getElementById('editItem'); 
      const val = item.value; 
      let newList = this.state.list.slice(0);
      newList[i] = val; 
      console.log('updated state is', newList);
      this.setState({list: newList, editing: -1});
    }

  }

  getData() {
        this.setState({list: ['one', 'two', 'three', 'four', 'five', 'six']});
  }


  render() {

    const listElements = this.state.list.map((content, i) => {
      if (i === this.state.editing) {
        return <input key = {i} className="listInput" id="editItem" defaultValue={content} onKeyPress={(e) => this.editData(e,i)} onChange={() => console.log('change')} autoFocus></input>
      } else {
        return <li key = {i} className="listItem" onDoubleClick={() => this.setState({editing: i})}>{content}<button className="destroy" id="destroy" onClick={() => this.deleteItem(i)}></button></li>;

      }
    });

   const funtimes = [1,2,3,4,5];


  return (
      <div>
      <h1 id="shopList">Shopping List</h1>
      <input type="text" placeholder="Add an item" id="listInput" className="listInput" onKeyPress={keyPress.bind(this)}/>
      <ul id="list">
        {listElements}
      </ul>
      <Row className = "funzo" funarr = {funtimes} number={this.state.list.length} />
      <Row className = "funzo" funarr = {funtimes} number={this.state.list.length + 1} />
      </div>
    );
  }
}


export default App;