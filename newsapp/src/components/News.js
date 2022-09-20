import React, { Component } from 'react'
import NewsItem from './NewsItem';
export class News extends Component {

  constructor() {
    super();
    console.log("fuckkk");
    this.state = {
      articles: [],
      loading: false,
      page: 1

    }
  }
  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=3f54594560e74388b45e1b0c4f659b76&page=1pageSize=20"
    let data = await fetch(url)
    let parseddata = await data.json()
    console.log(parseddata);
    this.setState({ articles: parseddata.articles, totalResults: parseddata.totalResults })
  }
  PrevClick = async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=3f54594560e74388b45e1b0c4f659b76&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url)
    let parseddata = await data.json()
    console.log(parseddata);
    this.setState({
      page: this.state.page - 1,
      articles: parseddata.articles
    })
  }

  NextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
    } else {

      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=3f54594560e74388b45e1b0c4f659b76&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url)
      let parseddata = await data.json()
      console.log(parseddata);
      this.setState({
        page: this.state.page + 1,
        articles: parseddata.articles
      })
    }
  }
  render() {
    // let { title, description, img } = this.props;
    return (
      <div className="container my-3">
        <h1>Top Headlines</h1>

        <div className="row">

          {this.state.articles.map((element) => {
            console.log(element.title.slice(0, 45) + "....");
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : " "} description={element.description ? element.description : " "} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}


        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.PrevClick}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" onClick={this.NextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}


export default News