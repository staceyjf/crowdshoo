# crowdShoo

<div align="center">

  <img src="../CrowdShoo/public/images/homePg.png" width="700" height="400">

</div>

<div align="left">
<br>
This web-based application provides a centralized venue database that: 
- 

- utilizes a MongoDB database 
- is built with Node.js, using the Express framework for handling server-side operations
- incorporates Mongoose to facilitate a more structured approach to data collection based on defined schemas
- employs the Bootstrap 5 framework for an enhanced look and feel of the frontend. 

The application performs user centric CRUD (Create, Read, Update, Delete) operations following REST-ful conventions for managing resources (GET, POST, DELETE, PUT best practice).

## About the Web App

At CrowdShoo, we help you ‘shoo’ away from crowded places, allowing you to enjoy your favorite venues without the hassle of large crowds. crowd sourced comments included...

Add venues that you love to your own curated Favourite's list. Complied in easy to view list - you'll never have to randomly google or search through the depths of your mind to find a venue you love.

## User stories
- I want to add a venue to my favourite's list
- I want to see the details of a venue that I have added to my list and be able to change it (edit and delete)
- I want to see a list of all venues from the wider community 

## Features

- View/add/delete venues to a user's favourites list
- View a community favourites list - a collection of all favourite venues across all users in a combined view
- View/add/update/delete user's rating for each venue (rankings and tips)
- View the details of a venue in a venue specific view
- View a randomly generated review from the wider community from within the individual venue page
- Log in via OAuth
- Log out
- Enable different views based on user's log in status
</div>

<div align="left">

## Data Relationship
Users 
- each user can have multiple venues on their ‘fav’ list
-users can writing multiple reviews

Venues 
- each venue can have multiple users who marked it as a ‘fav’
- venues can receive multiple reviews from different users

Reviews
- each review belongs to one user and one venue 

<div align="center">
ERD <br>
<img src="../CrowdShoo/public/images/datav2.png" width="400" height="400">
<br>
1:M
- review to users
- review to venue
<br>
M:M
 users:venues
</div>


</div>

<div align="left">

## Data Screengrabs
| User's favourite venuesView                                                                      | OAuth View                                                                                    | Add View                                                                       | Project Management                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| <img src="../CrowdShoo/public/images/myFav.png" title="User's curated venue list"> | <img src="../CrowdShoo/public/images/OAuth.png" title="OAuth log in page" /> | <img src="../CrowdShoo/public/images/addVenue.png" title="Add a view view" /> | <img src="../CrowdShoo/public/images/trello.png" title="View of project board" /> |

</div>


<div align="left">

## Technologies Used

<div align="center">

![HTML5](https://img.shields.io/badge/-HTML5-05122A?style=flat&logo=html5)
![CSS3](https://img.shields.io/badge/-CSS3-05122A?style=flat&logo=css3)
![Bootstrap 5](https://img.shields.io/badge/-Bootstrap%205-05122A?style=flat&logo=bootstrap)
![JavaScript](https://img.shields.io/badge/-JavaScript-05122A?style=flat&logo=javascript)
![Express.js](https://img.shields.io/badge/-Express.js-05122A?style=flat&logo=express)
![MongoDB](https://img.shields.io/badge/-MongoDB-05122A?style=flat&logo=mongodb)
![Mongoose](https://img.shields.io/badge/-Mongoose-05122A?style=flat&logo=mongoose)
![Git](https://img.shields.io/badge/-Git-05122A?style=flat&logo=git)
![GitHub](https://img.shields.io/badge/-GitHub-05122A?style=flat&logo=github)
![Trello](https://img.shields.io/badge/-Trello-05122A?style=flat&logo=trello)

</div>

</div>
