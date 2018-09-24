# TodoApp-with-login
A Todo List web app made with Angular JS and firebase as database.
Create a new list, add tasks to the list save  your work by signing in using google, facebook, twitter or github.

# Table of Contents
* [Getting Started](#getting-started)
* [How to Use?](#how-to)
* [Live Project](#live-project)
* [Features](#features)
* [Built with](#built-with)
* [Author](#author)


# <a name="getting-started"></a>Getting Started
First thing you need to do to use this project is to clone it using the following command -
```
git clone https://github.com/prateek3255/TodoApp-with-login.git
```
Initially you would need to replace the firebase config in the index.html with your own firebase config settings so that it works on your firebase database, for more details on how to do that you can follow the process described [here](https://firebase.google.com/docs/web/setup).

The project is divided into three sections namely Login, Home (Which houses all your todo lists) and Lists (Which contains the items of every todo list.). Each of these pages have their separate html files under the views folder.
App.js also has three separate controllers for each of these components namely `loginCtrl`, `homeCtrl` and `firstCtrl` respectively.
 

# <a name="how-to"></a>How to use
<ol>
` <li> Sign in using any of the provided services - Google, Facebook, Twitter or Github.</li>
  <li> Add a list of tasks or open any previously saved list of tasks.</li>
  <li> Open the list you created and add tasks to it and manipulate those tasks.</li>
</ol>
That's all. 

# <a name="live-project"></a> Live Project
Todo App is live <a href="https://todo-list-login.firebaseapp.com">here.</a> 

# <a name="features"></a>Features
* Easy Sign in
* Add multiple lists
* Delete lists after task completeion
* Edit Task in a list
* Mark tasks as Completed
* Search in lists and tasks
* Sort tasks according to completed or pending
* Prioritize your tasks by moving them up or down

# <a name="built-with"></a>Built with
* <a href="https://angularjs.org/">Angular JS</a> - Superheroic JavaScript MVW Framework
* <a href="https://firebase.google.com/">Firebase</a> - Used for Authentication, Database, Storage and Hosting in thi app.
* <a href="http://getbootstrap.com/">Bootstrap</a> - Used in designing.
* Programming languages used - HTML5, CSS3, JavaScript

# <a name="author"></a>Author
* <b>Prateek Surana   </b>
<a href="mailto:prateeksurana3255@gmail.com">Email</a>
