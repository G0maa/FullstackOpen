- Current progress: `Finished`:

  - Deployed link: https://part7bloglist.herokuapp.com/
  - If you want to play:
    - Try for username: `gomaa` password `security`
    - or username: `root` password `secret` or `sekret`

- This is where I made backend related excercises of `part7` of `FullstackOpen 2022`, everything here is coded by me from scrach.
- Tech stack: `MERN`.
  - Deployment: `Heroku`,
  - Database: `cloud.mongodb.com`
  - testing:
    - Integration tests (API Tests): `Jest and Supertest`
    - E2E testing: `Cypress`
- Optional to-do:

  - Testing ✅
  - Deployment ✅

- [Main repo link](https://github.com/OoMiDOoO/FullstackOpen), I can't submit many repos to the system so files of this repo will be copied there eventually.
- P.S: I had a `.git` renamed to `git_folder` and `.gitignore`ed, so you might see more commits than in the main repo...

- Actual to-dos:

  - Fix PUT (in the logic related to liking a blog): ✅
    - P.S: Now it's bad-coded (:
  - Have a time limit for the tokens: ✅
  - Fix deletion of blogs doesn't reflect changes on _any_ `user` document beforepopulation, this is also found in the excercise solution of `part4`: ✅
  - ~~I want to make retrival of `/api/users/` to not get me blogs array. => Create `blogsCount` attribute in schema?~~
  - Need to determine where do I actually need a token and where I do not: ✅
  - Add checking of existence of user to middleware, not just validating token: ❌
  - Any refresh in production gives `unknown endpoint` error: ❌

- Note to self:

  - `git push heroku master`
  - and don't forget to set the env variables in heroku.
  - Next project: will be **MONO REPO**.

- I changed some of the logic of the app, in contrast to the app made in `part4`.
  - Liking & submitting a blog requires you only to be signed-in.
  - Some of the routes have been refactored like `/blogs/:id`
- In a perfect scenario, I wouldn't have to create a local JS Object then give it to the frontend, instead I'd use `mongoose` _effctively_ to create that object for me... just more cleaner.

- List of stupid mistakes:
  - Spent too much time trying various stuff... ends up figureing out I'm using `array.filter()` the wrong way.
  - Didn't enable `Redux Devtools` extension... because it existed in the `developer tools tab`.
  - Didn't end `response.status()` with `.end()`, which resulted in a never fulfilling request.
