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
    // TODO: Add the template
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
	  	},
      {
        name: 'Guardian',
        url: 'https://crossorigin.me/http://content.guardianapis.com/au?show-editors-picks=true&api-key=622f5036-10b9-47a4-9f76-2b043582aaaf'
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
        <article class="article">
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


 function fetchRedditData(){
    fetch('https://www.reddit.com/top.json')
      .then((response) => {
        return response.json()
      }).then((result) => {
        result.data.children.forEach((item) => {
          var article = {}
          article.title =  item.data.title,
          article.img = item.data.thumbnail,
          article.url =  item.data.url,
          article.impressions =  item.data.ups,
          article.category =  'Latest from Reddit',
          article.description =  item.data.title
          state.articles.push(article);
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
          article.title =  item.display_title,
          article.img = item.image,
          article.url =  item.link,
          article.impressions =  item.shares.total,
          article.category =  item.channel,
          article.description =  item.excerpt
          state.articles.push(article);
        })
        renderContainer(state, container);
      })  
 }

fetchMashableData();


function fetchGuardianData(){
  fetch('https://crossorigin.me/http://content.guardianapis.com/au?show-editors-picks=true&api-key=622f5036-10b9-47a4-9f76-2b043582aaaf')
  .then((response) => {
    return response.json()
  }).then((result) => {
    result.response.editorsPicks.forEach((item) => {
     var article = {}
          article.title =  item.webTitle,
          article.img = item.image,
          article.url =  item.webUrl,
          article.impressions =  'unavailable'//item.shares.total,
          article.category =  item.sectionName,
          article.description =  item.apiUrl
          state.articles.push(article);
    })
  })}
  fetchGuardianData();
  


renderHeader(state, header);

    /*delegate('header','click','.news-source', handleFilterClick)
  	delegate('#container','click','.article', handleArticleClick)
	  delegate('#container','click','.close-pop-up', handleClosePopUpClick)*/