import React, { Component } from 'react';
import './SavedNews.css';
export default class TopNews extends Component {

  constructor (props) {
    super(props)
    this.state = {data: []};
  }

  componentDidMount() {
      fetch('/api/getnews')
      .then(res => res.json())
      .then(json =>{
        console.log(json);
         console.log(json);
         this.setState({ data: json })
      });

  }


          render() {
               return (
                <div className="cardsContainer">
                   {
                     this.state.data.map((news,i) => {
                  //  this.state.data.map((news, i) =>{
                      return (
                              <div className="card" key={i}>
                                <div className="content">
                                  <h3>
                                    <a href={news.url} target="_blank" value={news.url}>
                                      {news.title}  value={news.title}
                                    </a>
                                  </h3>
                                  <p>{news.description}  value={news.description}</p>
                                  <div className="author">
                                    <p>
                                      By <i>{news.author ? news.author : this.props.default}  value={news.author}</i>
                                    </p>
                                    <p>Date: {news.publishedAt}</p>
                                  </div>
                                </div>
                                <div className="image">
                                  <img src={news.urlToImage} value={news.urlToImage} alt="" />
                                </div>
                              </div>
                            );
                   }
                    )}
                </div>
          )}
    }
