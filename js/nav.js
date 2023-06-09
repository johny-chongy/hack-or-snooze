"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

function navSubmitArticle(evt) {
  console.log("navSubmitArticle START");
  console.debug("navSubmitArticle", evt);
  evt.preventDefault();
  hidePageComponents();
  $submitArea.show();
  // console.log(putStoriesOnPage);
  putStoriesOnPage();
}

$("#nav-submit-story").on("click", navSubmitArticle);

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navHidden.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $loginForm.hide();
  $signupForm.hide();
}

//TODO: separate concerns; navFavoritesClick only address click functionality ONLY
/** Clears the opage and shows only the favorites */
function navFavoritesClick(evt) {
  console.debug("navFavoritesClick has been reached");
  $allStoriesList.empty();
  $submitArea.hide();

  putFavoritesOnPage();
//TODO: move this logic below elsewhere
  // for (let story of currentUser.favorites) {
  //   const $story = generateStoryMarkup(new Story({ ...story }, true));
  //   $allStoriesList.append($story);
  // }
  // $allStoriesList.show();
}

$navFavorites.on("click", navFavoritesClick);