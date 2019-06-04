This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Url

https://tridnice.herokuapp.com

Student credentials: david@email.com student

Teacher credentials: teacher@email.com teacher

# Local setup

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Documentation

## Project goal
The goal of this project was to build a skeleton for a web application for schools. The frontend app covers only the basic premise of how the app should look like. In a school app there is a basic need for administration of users, subjects, classes, creating timetables, adding test results and viewing this information. 

## Description of functionality
Initial screen is at url /login. A user puts in his credentials and logs in. (This step sometimes takes a few minutes. This is because the server on which the backend side is deployed is in a sleep mode when not used for some time. This ensures monthly running hours are not exceeded easily as part of a free license). If the credentials were correct, /profile page is shown. There, a user can change his photo using drag and drop or clicking on the picture and choosing a picture from his computer. The picture is only local, saved in browser, so it won’t be visible if a user logs in from a different device. This feature can be added later. Other than that, there is some information about the user and a button for changing password. When clicked, a modal window is opened. If the input was filtered correctly the password is changed and modal window closed. The modal window can be also closed by clicking anywhere outside of it. A user can get into his profile page by clicking on top right icon which shows user menu with profile item and logout item. Clicking on profile opens profile page, clicking on logout logs user out and redirects to login page. 
On the left side of the page there is an app menu. It’s compressed by default (only icons are shown) and expands when clicking on menu icon with three stripes. On computer, when hovering over a menu item icon tooltip is displayed.
The rest of the content of the application depends on the type of user. 

#### Admin:
Admin has 4 items in his app menu: people, subjects, classes and timetable. 
Clicking on people menu item redirects to page /people which shows all users present in database. At the top, admin can choose a name of an attribute (for example first name) in select field and type a corresponding value in the text field (for example john). Clicking on a search icon returns all data which fits the search. Clicking on Reset button shows all data in database. Next, there are two buttons Add and Delete. When clicking on add, the form for adding a user is displayed. Admin fills in data and if it is correct, new user is created and page redirects back to /people. Delete button is enabled only when some user in list has a checkbox checked. Currently admin can select multiple items to delete, but only the first one selected will be deleted when clicking button delete. The functionality to delete multiple items can be easily added to user interface when it’s added on the server. In each item in list next to checkbox there is a Detail button. When clicking on it, a form with data from that item is shown. Admin can change the data and then submit them. If the data was valid, people page is shown.   
Clicking on the subjects menu item redirects to page /subjects which acts similarly as the people page described above.
Clicking on the classes menu item redirects to page /classes which acts similarly as the people page as described above, except delete and edit are not yet implemented on the server side.
Clicking on the timetable menu item redirects to page /timetable. At the top of the page there is a list of classes from database. Admin can choose for which one he will create the timetable. Below it there is a timetable. To the right, there is a list of lessons available. On the top, when clicking on the create lesson button, form for creating a new lesson is shown. Admin can choose needed information and then when hitting submit button the timetable page is shown. New lesson is present in lessons column on the right. The lessons can be added to the timetable by drag and drop with a possibility to replace them anytime. There is also another button Save on the right in the lessons column. Currently, the possibility to save timetable is not present, but can be anytime added to user interface when implemented on the server side. 

#### Teacher:
Teacher has 3 menu items. 
People menu item takes teacher to page /people which is similar to the one admin has, except there is no possibility to show an editable detail of a user, neither to add nor remove a user.
Subjects menu item takes teacher to the /subjects page which is similar to the people page above, but there is a detail button present. When clicking on the detail button, the subject detail page is shown which contains basic information about the subject and below it, there is a table of marks. When clicking on the Add test button new column is created and a teacher can fill in the test name and marks for the students. If all the rows were filled in correctly (with marks 1-5 or – if the student didn’t write it), the teacher can then save the column by clicking on the button Save marks. The marks table is just filled with mock data, which can be any time connected to database. The marks can be edited by clicking on the column name. This button makes entire column editable. When the teacher edits the column, he can then click on button save marks.
Timetable menu item takes teacher to the /timetable page which contains only a teacher’s timetable. Currently, it’s not connected to database (there data is random), but it can be anytime changed. 

#### Student: 
Student has 4 menu items. 
People menu item takes him to /people page which is the same as in teacher’s case
Subjects menu item takes him to /subjects page which is the same as in teacher’s case, but when he clicks on the detail of the subject, only one row with his marks is displayed in the marks table. Now the table is filled only with random data. 
Timetable menu item takes him to /timetable page which is the same as in teacher’s case.
Marks menu item takes him to /marks page where he can see his marks. The data is now only random, but it can be anytime taken from database if implemented on the server side. 
There is also one Easter egg, when clicking on a company (cat) icon in the footer the sound of cat meowing plays. 
