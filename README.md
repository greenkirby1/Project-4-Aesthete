<style>
  @font-face {
    font-family: 'FT88 Bold';
    src: url('./client/src/assets/FT88-Bold.otf');
  }

  @font-face {
    font-family: 'FT88 School';
    src: url('./client/src/assets/FT88-School.otf');
  }

  .home-page-sc {
    border-radius: 10px;
    box-shadow: 0px 15px 15px grey;
    margin: 2em;
  }

  .font-bold {
    font-family: 'FT88 Bold'
  }

  .font-school {
    font-family: 'FT88 School'
  }

  .data, .wireframes, .mood-board, .user-stories, .sign-up, .log-in {
    border: 10px solid white;
    border-radius: 10px;
    margin: 1em;
  }
</style>

# Aesthete - For Art Enjoyers and Artists Alike
Have you ever wondered what it was like to have your artwork displayed in a fancy baroque art frame hung inside an even fancier art gallery? Well I have, and I built a virtual gallery that has a pixel game look for artists and art enjoyers to gather.

This was my final project with General Assembley, during the Software Engineering Immersive Course. It was a solo full-stack project that was completed in 8 days.

<p align='center'>
  <img class='home-page-sc' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1718273197/ReadMe/Aesthete_Homepage_fvgs7f.png'>
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
### Front-End
* JavaScript
* React
* SCSS/SASS
* [Degheest Font Collection](https://velvetyne.fr/fonts/degheest/) from Velvetyne
  * <span class='font-bold'>FT88-Bold</span>
  * <span class='font-school'>FT88-School</span>
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
* Create a full-stack application with a Python Django API backend and a JavaScript React front-end
* Product must have multiple relationships between models and CRUD functionality
* Implement thorough user stories/wireframes and a visuallt impressive design
* Must be deployed online

## Planning
### Mood Board & User Stories
<p align='center'>
  <img class='mood-board' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1718272569/ReadMe/Aesthete_Moodboard_ssq6uq.png'>
  <img class='user-stories' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1718272602/ReadMe/Aesthete_User_Stories_hsoja0.png'>
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
### Overview
Initially this site was intended for my personal use; to display my artworks in an interersting and fun manner. As I brainsormed further I thought it would be even more interesting if other artists could also display their artworks, simulating a traditional gallery with an amalgamation of unique works. There are 2 different types of accounts, **artists** and **visitors**. **Artists** have the ability to create artworks that would be displayed in their own collection, and they would have the choice to update or delete them once created. Both **visitors** and **artists** are able to browse through the works of others in the gallery, as well as leave comments and even search the for the name of their favourite artist.

### Home Page
The initial page shows te entrance of the Aesthete Gallery, it is a simple component consisiting of 2 buttons: **'Join Us'** and **'Welcome Back'**; which navigates the user to the **Join Us Page** and **Welcome Back Page** consecutively. 

### Join Us (Sign Up) / Welcome Back Page (Log in)
Both pages feature a reuseable **form component** that handles different input field types, data types and errors. 

<p align='center'>
  <img class='sign-up' width='200' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1718358158/ReadMe/join-us_h1tc32.png'>
  <img class='log-in' width='200' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1718358164/ReadMe/image_2024-06-14_104244053_qacypi.png'>
</p>

Once you complete the **sign up** or **log in** form, you will automiatically be logged in. In order to log in the user that was just created, this code was implemented in `users/serializers/common.py`:
```py
class RegisterSerializer(serializers.ModelSerializer):

  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)
  access = serializers.CharField(read_only=True)

  class Meta:
    model = User
    fields = (
      'id', 
      'email',
      'username', 
      'password', 
      'password_confirmation', 
      'is_artist',
      'access'
    )

  def validate(self, data):
    password = data.get('password')
    password_confirmation = data.pop('password_confirmation')
    
    if password != password_confirmation:
      raise serializers.ValidationError('The passwords you entered do not match, please try again.')

    return data
  
  def create(self, validated_data):
    new_user = User.objects.create_user(**validated_data)
    user_data = UserRegisterDetailSerializer(new_user).data
    get_token = RefreshToken.for_user(new_user)
    user_data['access'] = str(get_token.access_token)

    return user_data
```
In this code the create method in **Django REST framework** is overriden, when a new user is created, the validated user data is utilised to generate a new access token that is returned in the request response along with the new user data. This makes the access token accessible in the front-end for subsequent **POST/PUT/PATCH/DELETE** requests made by authorized user.

### Gallery Page
The gallery comprise of an array of **artworks** and their **information**, retrieved using a **GET** request that is called when first rendered. The page itself moves in the unconventional horizontal axis, while still mainting the conventional vertical scrolling.

![horizontal scroll](https://res.cloudinary.com/dv4ymisss/video/upload/v1718359685/ReadMe/gallery-scroll_lynmfi.mp4)
