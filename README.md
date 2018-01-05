# ADDRESS-BOOK-with-backend

An improved version of the first Address book project, this time with a database.

So far the app allows you to add addresses, and then edit and remove one or all of them. Once you add an address, an SQLite file will be created to store all the data. The remaining functionality, e.g. validation, filtering, sorting, is still in progress.

Some of the changes compared to Address book 1.0:
- Basic Node.js is used for better project structure and module management,
- Chrome local storage is replaced with SQLite,
- Problems with templates are solved with Pug (previously Jade),
- Styles are improved (I tried to switch to BEM methodology but there is still room for improvement in later projects),
- Icons are added for better user experience,
- And probably much more.

Even though I felt the need and would love to focus on things like React, Webpack and Babel, my goal this time was to code something useful without frameworks and too much additional stuff. However, once I deal with vanilla JS, how browsers work and other basics I'm working on, React+Redux, plus e.g. LESS and BEM, will be my dream stack.

To run the project you have to install node.js, and then run npm install and node app.js.

![screen](/screen.png)
