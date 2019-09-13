# cividi planet

Based on Gridsome Blog.

> A simple, hackable & minimalistic starter for Gridsome that uses Markdown for content.

- Beautiful and simple design.
- Markdown for content.
- Tags support.
- Dark / Light toggle.
- CSS variables, SCSS & BEM for styling.
- 100, 100, 100, 100 score on Google Lighthouse.
- Uses same front-matter fields as Dev.to.

Happy coding 🎉🙌

## Deployment

`npm install --global @gridsome/cli`

`gridsome develop` to start local dev server at `http://localhost:8080`

`npm deploy` to send this off to our ZEIT server

## Docker deployment

`docker build -t gridsome-planet .`

`docker run -it -p 8080:8080 --rm --name planet-1 gridsome-planet:latest`
