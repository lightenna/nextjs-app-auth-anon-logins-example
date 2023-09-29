# nextjs-app-auth-anon-logins-example
Example of using next.js, nextauth.js and typescript for both anonymous sessions and authenticated sessions

## Getting started

* First install the repo
  ```
  npm install
  npm run gen-secret
  ```
* Set up `.env.local` using placeholders from `.env.local.template`
  * Include the `NEXTAUTH_SECRET` generated above
  * Transpose credentials from your (already created) GitHub App
* Run locally
  ```
  npm run dev
  ```
* Open a browser to http://localhost:3000
* Click `Sign in` button
  * View logs to see `GitHub signIn` event
* Click `Sign out` button
  * View logs to see `GitHub signOut` and `Anonymous signIn` events

