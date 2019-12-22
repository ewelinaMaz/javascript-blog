const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tags-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-cloud-tag-link').innerHTML)
}; {
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optCloudClassCount = 5,
    optAutorsListSelector = '.authors',
    optTagsListSelector = '.tags';

  function titleClickHandler(event) {
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
  }

  function generateTitleLinks(customSelector = '') {
    /* [DONE]remove contents of titleList*/

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log(titleList);

    /*[DONE]Get article id */
    let html = '';
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for (let article of articles) {
      const articleId = article.getAttribute('id');
      /*[DONE]find the title element*/
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /*[DONE]create html of the link*/
      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* create html link with handlebars template*/
      const linkHTMLData = {
        id: articleId,
        title: articleTitle
      };
      const linkHTML = templates.articleLink(linkHTMLData);
      console.log(linkHTML);
      /*[DONE]insert html into titleList*/
      html = html + linkHTML;
      console.log(optArticleSelector + customSelector);
      /*[insertAdjacentHTML-generuje listę linkó od tyłu?]titleList.insertAdjacentHTML('afterbegin', linkHTML)*/
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function calculateTagsParams(tags) {
    const params = {
      min: 99999,
      max: 0,
    };
    for (let tag in tags) {
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  }

  function calculateTagsClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    // classNumber = Math.floor(((count-params.min) / (params.max - params.min))*optCloudClassCount + 1 );

    return classNumber;
  }

  function generateTags() {
    /*[NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);

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
        //let linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        /* generate HTML link with handlebars tempale */
        const linkHTMLData = {
          id: tag,
          title: tag
        };
        let linkHTML = templates.tagLink(linkHTMLData);
        console.log(linkHTML);
        /* add generated code to html variable */
        html = html + linkHTML;
        /*[NEW] check if this link is NOT already in allTags */
        if (!allTags.hasOwnProperty(tag)) {
          /*[NEW] add tag to allTags object*/
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /*[NEW] find list of tags in right column*/
    const tagList = document.querySelector(optTagsListSelector);
    /*[NEW] create variable for all links HTML code*/
    //let allTagsHTML = '';
    /* Generate Data for handlebars links tamplete */
    const allTagsData = {
      tags: []
    };

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /*[NEW] START LOOP: for each tag in allTags*/
    for (let tag in allTags) {
      //  const classNumber = calculateTagsClass(allTags[tag]);
      /*[NEW] generate code of a link and add it to allTagsHTML*/
      //const tagLinkHTML = '<li><a href = "#tag-' + tag + '" class="' + 'tag-size-' + calculateTagsClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
      //allTagsHTML += tagLinkHTML;
      /* generate HTML links with handlebars*/
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagsClass(allTags[tag], tagsParams)
      });
    }
    /*[NEW] add html from allTags to tagList*/
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTags);
  }
  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let tagActiveLink of tagActiveLinks) {
      /* Remove class active */
      tagActiveLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* add class active */
      tagLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '" ]');
  }

  function addClickListtenersToTag() {
    /* find all links to tags */
    const linksToTag = document.querySelectorAll('.post-tags .list a, .sidebar .tags a');
    /* START LOOP: for each link */
    for (let linkToTag of linksToTag) {
      /* add tagClikhandler as event listener for that link */
      linkToTag.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  }
  addClickListtenersToTag();

  function generateAuthor() {
    /*[NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      /* make html variable with empty string */
      let html = '';
      /* get author from data-author attribute */
      const dataAuthor = article.getAttribute('data-author');
      /* generate HTML of the link */
      //let linkHTML = '<p><a href="#author-' + dataAuthor + '">' + dataAuthor + '</a></p>';
      /* generate HTML link with handlebars teplate*/
      const linkHTMLData = {
        id: dataAuthor,
        title: dataAuthor
      };
      let linkHTML = templates.authorLink(linkHTMLData);
      /* add generated code to html variable */
      html += linkHTML;
      console.log(linkHTML);
      /* insert HTML of all the links into the tags wrapper */
      authorWrapper.innerHTML = html;
      /* count articles for each author*/
      if (allAuthors[dataAuthor]) {
        allAuthors[dataAuthor]++;
      } else {
        allAuthors[dataAuthor] = 1;
      }
      console.log(allAuthors);
      /* END LOOP: for every article: */
    }
    /*[NEW] find list of Authors in right column*/
    const authorList = document.querySelector(optAutorsListSelector);
    /*[NEW] create variable for all links HTML code*/
    let allAuthorsHTML = '';

    /*[NEW] START LOOP: for each author in allAuthors*/
    for (let dataAuthor in allAuthors) {
      /*[NEW] generate code of a link and add it to allAuthorsHTML*/
      const authorLinkHTML = '<li><a href = "#author-' + dataAuthor + '" + class ="' + 'author' + '">' + dataAuthor + (' ') + allAuthors[dataAuthor] + '</a></li>';
      allAuthorsHTML += authorLinkHTML;
    }
    /*[NEW] add html from allAuthorsHTML to authorList*/
    authorList.innerHTML = allAuthorsHTML;
  }

  generateAuthor();

  function authorClickHandler() {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* find all tag links with class active */
    const authorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active tag link */
    for (let authorActiveLink of authorActiveLinks) {
      /* Remove class active */
      authorActiveLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let authorLink of authorLinks) {
      /* add class active */
      authorLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '" ]');
  }

  function addClickListtenersToAuthor() {
    /* find all links to tags */
    const linksToAuthor = document.querySelectorAll('.post-author a, .sidebar .authors a');
    /* START LOOP: for each link */
    for (let linkToAuthor of linksToAuthor) {
      /* add tagClikhandler as event listener for that link */
      linkToAuthor.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  }
  addClickListtenersToAuthor();
}
