# **SOEN341**
## **Objective**
To develop a simplified Instagram web application
## **Description**
For this project we are required to develop a simplified version of Instagram that will enable the user to post a picture with a text description. In addition, the user will be able to follow other users. Moreover, the user will be able to leave comments under a posted picture. Furthermore, we are required to suggest and develop 2 new features that will make our project stand out. These features are still to be determined.
## **Core Features**
* Post a picture with some text description
* Following other users
* Leave comments to a posted picture
## **Technologies Used**
### **Front-End** ###
* Boostrap
* React
### **Back-End** ###
* Django 
* MySQL

## **Name Conventions** 
* [React naming conventions ](https://github.com/airbnb/javascript/tree/master/react)
* [Django naming conventions ](https://docs.djangoproject.com/en/dev/internals/contributing/writing-code/coding-style/)
* [Python naming conventions ](https://www.python.org/dev/peps/pep-0008/)

## **Team Members**

* Josh Fried
* Sarah Papadopoli
* Shashank Patel
* Sacha Elkaim
* Fahim Bhuiyan
* Mike Stephane Kanyarushatsi 

## **Getting Started**
1. Clone/download SOEN341 Project
2. Run the XAMPP program and start Apache and mySQL
3. Both back-end and front-end needs its own Command Prompt

Back-end
1. Open Command Prompt
2. Head to SOEN341/back-end
2. Create your virtual environment typing `virtualenv env`
3. Activate your virtual environment by typing `env\Scripts\activate`
4. Install dependencies typing `pip install -r requirements.txt`
5. Head over to SOEN341/back-end/src
6. Start the back-end typing `python manage.py runserver` 

Front-end
1. Open the other Command Prompt
2. Head over to SOEN341/front-end/instagram
3. Install dependencies typing `npm install` 
4. Start the front-end typing `npm start`

## **System In Operation**
![](https://i.imgur.com/SpftKXE.png)
Create/Register an account.


![](https://i.imgur.com/90DUfY4.png)
Logging into account.


![](https://i.imgur.com/dy75Xnu.png)
Profile page after logging into new account.


![](https://i.imgur.com/qEPXMVt.png)
Uploading a profile picture.


![](https://i.imgur.com/bEO94NN.png)
Edit profile 


![](https://i.imgur.com/Hxv397G.png)
Upload photo with caption and optional filters(50% grayscale in this case).


![](https://i.imgur.com/5y3jRws.png)
Redirects to feed. Posting comments on image created.


![](https://i.imgur.com/uWc8f9a.png)
Follow user using the search bar(searched for account kevin).


![](https://i.imgur.com/hVP7XJA.png)
After clicking follow, successfully following user.


![](https://i.imgur.com/nfFkpjk.png)
Profile after uploading a photo, editing/uploading profile picture and following a user.


![](https://i.imgur.com/uE8c8sV.png)
Feed after following a user. We can see their posts and write/edit/delete comments.
