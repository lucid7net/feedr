/**
 * Project 2: Feedr
 * ====
 *
 * See the README.md for instructions
 */

/*(function() {

  var container = document.querySelector('#container')
  var state = {}

  renderLoading(state, container)

  function renderLoading(data, into) {
  }
})()
*/
  var header = document.querySelector('header')
	var container = document.querySelector('#container')
	var state = {
		id: 1,
		newsSources: [
	  	{
	  		name: 'Mashable',
	  		url: 'https://crossorigin.me/http://mashable.com/stories.json'
	  	},
	  	{
	  		name: 'Reddit',
	  		url: 'https://www.reddit.com/top.json'
	  	}
		],
		articles: []
	}



  function renderHeader(state, into){
      into.innerHTML = 
        `<section class="wrapper">
      <a href="#"><h1>Feedr</h1></a>
      <nav>
        <section id="search">
          <input type="text" name="name" value="">
          <div id="search-icon"><img src="images/search.png" alt="" /></div>
        </section>
        <ul>
          <li><a href="#">News Source: <span>Source Name</span></a>
          <ul>
          ${state.newsSources.map((source)=>{
            return renderHeaderSource(source)
          }).join('')}
          </ul>
          </li>
        </ul>
      </nav>
      <div class="clearfix"></div>
    </section>`
  }

  function renderHeaderSource(source) {
          return(
            `<li><a href="#">${source.name}</a></li>`
          )
  }


  function renderContainer (state, into){
    /*if*/
         into.innerHTML = `
          <section id="main" class="wrapper">
      ${state.articles.map((article)=>{
          return renderContainerArticle(article)
      }).join('')}
    </section>
         `
  }

  function renderContainerArticle(article){
        return(
        `
        <article class="article" id=${article.id}>
        <section class="featured-image">
          <img src="${article.img}" alt="" />
        </section>
        <section class="article-content">
          <a href="#"><h3>${article.title}</h3></a>
          <h6>${article.category}</h6>
        </section>
        <section class="impressions">
          ${article.impressions}
        </section>
        <div class="clearfix"></div>
      </article>
        `
        )

  }
//Loader popup HTML 
 function renderPopup(){
   return `<div id="pop-up" class="loader">${article.title}
    </div>`
 }

 //Article content popup HTML 
   function renderArticle(){
     return `<div id="pop-up">
      <a href="#" class="close-pop-up">X</a>
      <div class="wrapper">
        <h1>${article.title}</h1>
        <p>
        ${article.description}
        </p>
        <a href="${article.url}" class="pop-up-action" target="_blank">Read more</a>
      </div>
    </div>`}


 function fetchRedditData(){
    fetch('https://www.reddit.com/top.json')
      .then((response) => {
        return response.json();
      }).then((result) => {
        result.data.children.forEach((item) => {
          var article = {}
          article.title =  item.data.title
          article.img = item.data.thumbnail
          article.url =  'https://reddit.com' + item.data.permalink
          article.impressions =  item.data.score
          article.category =  item.data.subreddit
          article.description =  item.data.title
          article.id = state.id
          state.articles.push(article);
          state.id++
        })
        renderContainer(state, container);
      })  
 }

 fetchRedditData();

function fetchMashableData(){
  fetch('https://crossorigin.me/http://mashable.com/stories.json')
  .then((response) => {
    return response.json()
  }).then((result) => {
   
    result.new.forEach((item) => {
          var article = {}
          article.title =  item.display_title
          article.img = item.image
          article.url =  item.link
          article.impressions =  item.shares.total
          article.category =  item.channel
          article.description =  item.content.plain
          article.id = state.id
          state.articles.push(article);
          state.id++
        })
        renderContainer(state, container);
      })  
 }

fetchMashableData();

function getArticle() {
  /*var article = article.name;
  return article == selectedArticle;*/
  }

  
function filterArticlesBySource(){
		var selected = state.newsStream.find((source)=>{
			return source.selected
		})

var filteredArticles = state.articles.filter((article) => {
			return article.source == selected.name
		})

		return filteredArticles
	}

function handleArticleClick(event){
		event.preventDefault()
		state.selectedArticle = getArticle(event.delegateTarget.id)
		renderArticleList(state, container)
	}

	function handleClosePopUpClick(){
		delete state["selectedArticle"]
		renderArticleList(state, container)
	}

  function handleFilterClick(event){
		event.preventDefault()
		var newsSource = getNewsSource(event.delegateTarget.innerHTML);
		if(!newsSource.selected){
			deselectHeaderItems();
			newsSource.selected = true;
			fetchPosts(newsSource)
		}
	}

renderHeader(state, header);

    delegate('header','click','.news-source', handleFilterClick)
  	delegate('#container','click','.article', handleArticleClick)
	  delegate('#container','click','.close-pop-up', handleClosePopUpClick)