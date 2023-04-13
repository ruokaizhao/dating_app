# Dating app with real time chatting feature built with React, Ruby on Rails, Action Cable, Action Mailer, Active Record

Welcome to Dating App project!

This is a full-stack project using React to build frontend and Ruby on Rails to build backend.

The backend code is in the root directory of this project, and the frontend code is in the client directory.

This project has also been deployed to Heroku at [here](https://dating-app-m4tz.onrender.com).

## Installation

Fork and clone this repo, cd into the directory and run:

```bash
bundle install
```

to install all the backend dependencies, then run:

```bash
rails db:create db:migrate
rails s
```

to setup the database and start the server.

Next, open another terminal window and run:

```bash
npm install --prefix client
npm start --prefix client
```

to install all the frontend dependencies and start the application.

Please note that you will also need to install redis-server, the installation process depends on your system, it is quite simple to find a tutorial by googling redis-server plus your system name. Do not forget to run the redis-server after installing it.

## Project Walkthrough

### Homepage

Upon loading, the user will see the homepage with only two buttons, Create Account and Login. Either button will bring up a signup or login box. There is also a forget your password? button which will prompt user to enter their registered email address and send out a email containing a link for resetting password, which, upon clicking will bring user to the resetting password page. One thing to notice here, the link is only valid for an hour, so if the user clicks the link one hour after he/she received the email, the page will render an error message (The token has expired) and user has to restart the resetting process.

The gif below shows the process.

![Home Page](/images/homepage.gif)

When user is signing up for a new account, after filling in the email address, password and password confirmation, the user will be directed to the Onboarding page, where user will be asked to provide some information about himself/herself, the information will be used for matching the user with other users.

![Onboarding](/images/onboarding.png)

After filling out those information, user will be brought to the Dashboard page, where he/she can browse other users.

To make setup easier, I have included a seeds.rb, you can seed data by running:

```bash
rails db:seed
```

The seeds.rb will create 16 new users, the user data comes from Marvel Movies' characters. You can find their registered email address in the seeds.rb file, the structure is first_name@avengers.com, and their password are all 123456.

### Dashboard

After logging in, you will be brought to the dashboard page. On the right side, you will find a list of photos from other users, you can swipe right the photo to like the person, or swipe left to dislike him/her. Once you like or dislike a person, he/she will not show up in the right side anyone. If you cannot decide whether to like or dislike a person right away, you can swipe up or down to skip once, and next time you refresh the page, he/she will show up again.

On the left side of the page, under Matches, only user who you swiped right and he/she swiped right on you will show up.

One thing to note here is that, since I have implemented Action Cable into the app, the matches will show up in real time, which means that, assuming we are logged in as Tony Stark and Pepper Potts, after Tony swipes right on Pepper, as soon as Pepper swipes right on Tony, they will show up in each other's Matches immediately.

The gif below shows this process, pay close attention to the real time update.

![Realtime Matches](/images/realtime_matches.gif)

### Chat

Once user matches another user, they can start chatting! With Action Cable implemented, all the new messages will show up in real time. I've also build notification feature which will nofity user of new messages by show numbers of unread messages in red circle. Once user has read the messages, the notification goes away. The gif below shows how chatting works, note the messages show up immediately on both sides.

![Chatting](/images/chatting.gif)

### View other user's profile

User can click on the View Profile button to view other user's profile.

![User Profile Other](/images/user_profile_other.png)

### View self's profile

By clicking the user's own photo on the top left corner, user can view his/her own profile and edit their info. The user can also change his/her registered email address and password. The gif below shows how it works. Since it's hard to show the change of password on the screen, I will demonstrate how to change email address, and for the password, I will show that if you entered the wrong current password, server will response with an error message.

![User Profile Self](/images/user_profile_self.gif)

### Mobile views

The app is optimized for mobile devices, the image and gif below show how the app looks in mobile devices.

![Homepage Mobile](/images/homepage_mobile.png)

![App Mobile View](/images/app_mobile_view.gif)

That's all for the app walkthrough, hope you have fun reading this.

## Special Thanks

Big thanks to Ania Kubów for her awesome videos which inspired me with this project and help me set up the starter code. You can check out her video [here](https://www.youtube.com/watch?v=Q70IMS-Qnjk).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
