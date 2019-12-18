{
	const titleClickHandler = function(event) {
		event.preventDefault();
		const clickedElement = this;
		console.log('Link was clicked!');
		console.log(event);

		/* [DONE] remove class 'active' from all article links  */
		const activeLinks = document.querySelectorAll('.titles a.active');
		for (let activeLink of activeLinks) {
			activeLink.classList.remove('active');
		}

		/* [DONE] add class 'active' to the clicked link */
		console.log('clickedElement:', clickedElement);
		clickedElement.classList.add('active');

		/*[DONE] remove class 'active' from all articles */
		const activeArticles = document.querySelectorAll('.posts article.active');
		for (let activeArticle of activeArticles) {
			activeArticle.classList.remove('active');
		}

		/*[DONE] get 'href' attribute from the clicked link */
		const articleSelector = clickedElement.getAttribute('href');

		/*[DONE] find the correct article using the selector (value of 'href' attribute) */
		const targetArticle = document.querySelector(articleSelector);
		console.log(targetArticle);

		/*[Done] add class 'active' to the correct article */
		targetArticle.classList.add('active');
	};
	const optArticleSelector = '.post',
		optTitleSelector = '.post-title',
		optTitleListSelector = '.titles';
	optArticleTagsSelector = '.post-tags .list';

	function generateTitleLinks() {
		/* [DONE]remove contents of titleList*/

		const titleList = document.querySelector(optTitleListSelector);
		titleList.innerHTML = '';
		console.log(titleList);

		/*[DONE]Get article id */
		let html = '';
		const articles = document.querySelectorAll(optArticleSelector);
		for (let article of articles) {
			const articleId = article.getAttribute('Id');

			/*[DONE]find the title element*/
			const articleTitle = article.querySelector(optTitleSelector).innerHTML;

			/*[DONE]create html of the link*/
			const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
			console.log(linkHTML);

			/*[DONE]insert html into titleList*/
			html = html + linkHTML;

			/*[insertAdjacentHTML-generuje listę linkó od tyłu?]titleList.insertAdjacentHTML('afterbegin', linkHTML)*/
		}
		titleList.innerHTML = html;
	}
	generateTitleLinks();

	const links = document.querySelectorAll('.titles a');
	for (let link of links) {
		link.addEventListener('click', titleClickHandler);
	}

	function generateTags() {
		/* find all articles */
		const articles = document.querySelectorAll('.post');
		console.log(articles);

		/* START LOOP: for every article: */
		for (article of articles) {

			/* find tags wrapper */
			const tagsWrapper = article.querySelectorAll(optArticleTagsSelector);

			console.log(tagsWrapper);

			/* make html variable with empty string */
			let html = '';

			/* get tags from data-tags attribute */
			const articleTags = article.getAttribute('data-tags');
			console.log(articleTags);

			/* split tags into array */
			const articleTagsArray = articleTags.split(' ');
			console.log(articleTagsArray);

			/* START LOOP: for each tag */
			for (let tag of articleTagsArray) {

				/* generate HTML of the link */
				const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
				console.log(linkHTML);
				/* add generated code to html variable */
				html = html + linkHTML;
				/* END LOOP: for each tag */
			}
			/* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
			/* END LOOP: for every article: */
		}
}
		generateTags();

}
