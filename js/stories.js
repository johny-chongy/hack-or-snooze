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

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
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