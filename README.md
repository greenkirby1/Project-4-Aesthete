<style>
  @font-face {
    font-family: 'FT88 Bold';
    src: url('./client/src/assets/FT88-Bold.otf');
  }

  @font-face {
    font-family: 'FT88 School';
    src: url('./client/src/assets/FT88-School.otf');
  }
  /* .home-page-sc {
    border-radius: 10px;
    box-shadow: 0px 15px 15px grey;
    margin: 2em;
  } */
  /* .font-bold {
    font-family: 'FT88 Bold'
  }
  .font-school {
    font-family: 'FT88 School'
  } */
</style>

# Aesthete - For Art Enjoyers and Artists Alike
Have you ever wondered what it was like to have your artwork displayed in a fancy baroque art frame hung inside an even fancier art gallery? Well I have, and I built a virtual gallery that has a pixel game look for artists and art enjoyers to gather.

This was my final project with General Assembley, during the Software Engineering Immersive Course. It was a solo full-stack project that was completed in 8 days.

<p align='center'>
  <img class='home-page-sc' style='border-radius: 10px; box-shadow: 0px 15px 15px grey; margin: 2em;' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1718273197/ReadMe/Aesthete_Homepage_fvgs7f.png'>
</p>

## Deployment Link
Deployed on Heroku, please check it out [here](https://aesthete-0917f8994f38.herokuapp.com)

## Installation
* Fork and clone the repository
* Open project file in your preferred code editor
* From the project root folder, open an integrated terminal:
```
<!-- Split integrated terminal into 2 -->
<!-- Navigate into the shell for one -->
pipenv shell
npm install
python manage.py runserver <!-- Run command after ALL packages are installed -->

<!-- Navigate into the client folder for second -->
npm install
npm run dev <!-- Run command after ALL packages are installed -->

<!-- Check console for any errors and missing dependencies in package.json -->
```

## Technologies Used
### Backend
* Python
* Django
  * Django REST Framework
* PostgreSQL
* Neon DB
### Front End
* JavaScript
* React
* SCSS/SASS
* [Degheest Font Collection](https://velvetyne.fr/fonts/degheest/) from Velvetyne
  * <span class='font-bold' style='font-family: FT88 Bold;'>FT88-Bold</span>
  * <span class='font-school' style='font-family: FT88 School'>FT88-School</span>
* Downloads/Packages
  * [Axios](https://www.npmjs.com/package/axios)
  * [Bootstrap](https://www.npmjs.com/package/bootstrap)
  * [Cloudinary](https://www.npmjs.com/package/cloudinary)
  * [GSAP](https://www.npmjs.com/package/gsap)
  * [React Card Flip](https://www.npmjs.com/package/react-card-flip)
  * [React Modal](https://www.npmjs.com/package/react-modal)
### Others
* Git
* GitHub
* Insomnia
* TablePlus

## Brief
* Create a full-stack application with a Python Django API backend and a JavaScript React front end
* Product must have multiple relationships between models and CRUD functionality
* Implement thorough user stories/wireframes and a visuallt impressive design
* Must be deployed online

## Planning
### Mood Board & User Stories
<p align='center'>
  <img class='mood-board' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1718272569/ReadMe/Aesthete_Moodboard_ssq6uq.png'>
  <img class='user-stories' width='600' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1718272602/ReadMe/Aesthete_User_Stories_hsoja0.png'>
</p>

### Wireframes
<p align='center'>
  <img class='wireframes' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1718272345/ReadMe/Aesthete_Wireframe1_tgewdk.png'>
</p>

### Data Models and Relationships
<p align='center'>
  <img class='data' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1718272391/ReadMe/Aesthete_API_Endpoints_eqnbap.jpg'>
</p>

## Build/Code Process