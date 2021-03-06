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
  renderHeader(state, header);
