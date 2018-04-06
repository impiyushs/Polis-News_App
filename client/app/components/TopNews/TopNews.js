import React, { Component } from 'react';
import './TopNews.css';
export default class TopNews extends Component {

        constructor(props) {
            super(props)

            this.state = {
              data: []
            };
        }

        componentDidMount() {
          const NewsAPI = require('newsapi');
  const newsapi = new NewsAPI('ad1258bc8c854d8ba05f0740c1347eee');
  // To query /v2/top-headlines
  // All options passed to topHeadlines are optional, but you need to include at least one of them
  newsapi.v2.topHeadlines({
    country: 'us'
  })
               .then(json =>{
                 const articles = json.articles;
                 console.log(articles);
                  //console.log(json.articles);
                  this.setState({ data: articles })
               });

        }

             saveNews(news){


                         this.setState({
                           isLoading:true,
                         });

                         //Post req to backend
                         fetch('/api/saveNews', {
                            method: 'POST',
                            headers: {
                         'Content-Type': 'application/json'
                       },
                            body: JSON.stringify({
                              url: news.url,
                              title: news.title,
                              description: news.description,
                              author: news.author,
                              urlToImage: news.urlToImage,
                            }),
                           }).then(res => res.json())
                           .then(json => {
                             console.log('json', json);
                             if (json.success) {
                               this.setState({
                                 saveError: json.message,
                                 isLoading: false,
                               });
                             } else {
                               this.setState({
                                 saveError: json.message,
                                 isLoading: false,
                               });
                             }
                           });
                       }

          render() {
               return (
                <div className="cardsContainer">
                   {
                    this.state.data.map((news, i) =>{
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
                                <div className="button">
                                  <button onClick={() => this.saveNews(news)}>Save Article</button>
                                </div>
                              </div>
                            );
                   }
                    )}
                </div>
          )}
    }
