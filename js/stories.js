"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  //  console.log(story);
  //Maybe ---------   check the starIsFilled attribute to
  //determine which class of star
  let starClass = story.starIsFilled ? "bi-star-fill" : "bi-star" ;

  console.log('currentUser =', currentUser);
  if (!currentUser) {
    starClass = undefined;
  }

  // console.log(starClass);
  const hostName = story.getHostName();
  return $(`
  <li id="${story.storyId}">
  <i class= "bi ${starClass}"></i>
  <a href="${story.url}" target="a_blank" class="story-link">
  ${story.title}
  </a>
  <small class="story-hostname">(${hostName})</small>
  <small class="story-author">by ${story.author}</small>
  <small class="story-user">posted by ${story.username}</small>
  </li>
  `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */
//TODO: putFavoritesOnPage() | iterate through user's favorites instead of storyList

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  //prepend to container instead of loop
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Retrieves submitted information for new story, call StoryList.addStory
 *  and puts new story on the page
 */
async function retrieveNewStory(evt) {
  evt.preventDefault();

  let author = $("#new-article-author").val();
  let title = $("#new-article-title").val();
  let url = $("#new-article-url").val();

  let submittedStory = { author, title, url };
  let currentStory = await storyList.addStory(currentUser, submittedStory);
  let $currentStory = generateStoryMarkup(currentStory);

  $allStoriesList.prepend($currentStory);
  $submitForm.trigger("reset");
}

$submitForm.on("submit", retrieveNewStory);


function clickStar(evt) {
  let clickedStory;
  let clickedStoryId = $(evt.target).closest("li").attr('id');

  console.log('you clicked on ', evt.target);
  for (let story of storyList.stories) {
    if (story.storyId === clickedStoryId) {
      clickedStory = story;
      // console.log("clickedStory=", clickedStory);
      break;
    }
  }
  // console.log(clickedStoryId);
  // console.log("clickStar start");
  $(evt.target).toggleClass("bi-star bi-star-fill");
  // console.log("class=",$(evt.target).attr("class"));

  if($(evt.target).attr("class") === "bi bi-star") {
    currentUser.removeFavoriteStory(clickedStory);
    clickedStory.starIsFilled = false;
  } else if ($(evt.target).attr("class") === "bi bi-star-fill") {
    currentUser.addFavoriteStory(clickedStory);
    clickedStory.starIsFilled = true;
    // console.log("currentUser.favorites=", currentUser.favorites);
  }

}

$allStoriesList.on("click", "i",clickStar);