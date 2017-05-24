import React from 'react';

class Wikiarticle extends React.Component {
  constructor (props) {
    super(props);
    this.searchArticle = this.searchArticle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.makeView = this.makeView.bind(this);
    this.query = "";
    this.result = "";
  }
  changeValue(e) {
      this.query = e.target.value;
      this.setState({});
  }
  searchArticle() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            this.result = JSON.parse(xmlhttp.response);
            this.setState({});
            this.makeView();
        }
    }.bind(this);
    let query = (this.query) ? this.query : "Example";
    xmlhttp.open("GET", `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${query}&limit=7&namespace=0&format=json`, true);
    xmlhttp.send();
  }
  makeView() {
      var view = "";
      var req = this.result;
      for (var x = 0, len = this.result[1].length; x < len; x += 1) {
          view += `<a href=${req[3][x]} target="_blank"><div class="resitem"><h2>${req[1][x]}</h2><p>${req[2][x]}</p></div></a>`;
      }
      document.getElementById('viewresult').innerHTML = view;
  }
  render () {
    return (
      <div className="board">
          <div id="panel">
              <h1 className="title">wiki search</h1>
              <footer className="foot">
                  Coded by <a href="https://www.freecodecamp.com/sshal" target="_blank">Sergey Shalimov</a>
              </footer>
              <a className="but" href="https://en.wikipedia.org/wiki/Special:Random" target="_blank">Random Article</a>
              <input id="query" onChange={this.changeValue} value={this.query} onSubmit={this.searchArticle}/>
              <div className="imgsp"><img src="https://image.ibb.co/mDVqAv/search_icon_1598775.jpg" alt="search" onClick={this.searchArticle}/></div>
          </div>
          <div id="viewresult"></div>
      </div>
    )}
}

module.exports = Wikiarticle;
