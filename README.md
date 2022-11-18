# Welcome to Project 4!

In Project 4 we were two people that created a React Native client application. The application has the same functionality and database as project 3, but adjusted to fit and be used on a React Native application and phone. [See project 3 documentation for in-depth information about the project.](https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-62/project-3)


## How to run the application
In the "client" folder:
    
    $ npm install
    $ npx expo

Choose an android phone or android simulator to open the application. Use the external "Expo Go" app to run it from.

## External libraries

Beside the official react-native library, we used ["React-native-paper"](https://callstack.github.io/react-native-paper/index.html) and ["React-Native-Ratings"](https://www.npmjs.com/package/react-native-ratings) to create the data table and rating components.

## The adjustments we made to the application compared to Project 3

P3 = Project 3
P4 = Project 4

#### Code translation from P3 to be React Native compatible
For the application to run on a React Native app, we had to translate the code from P3 for it being able to compile and run. React Native doesn't compile HTML and CSS code, so we had to remove everything related to HTML and CSS. React Native also uses components like "View" and "ScrollView" which determines how the user moves around the page. These were our main concerns when developing P4.

To begin, we chose to copy the client-folder from P3 into P4 and then start translating the code. In retrospect, this was a poor method of procedure to start P4. We had issues from the start when compiling the code with P3 having a lot of HTML and CSS. Later, we also had to adjust the UI after the components compiled correctly, which in a way made us do double work. If we just made components from scratch, we could change the UI accordingly while developing the components.

To move through the application, we wanted P4 to resemble the method in P3. In P3 you have on page where you can scroll. Therefore, we chose to have a "ScrollView" at the top of the component hierarchy, to be able to scroll through the whole page. This worked well and P4 resembles P3 in how you move through the page.


#### Darkmode
In P3, the data table is not darkmode. To make the site a bit more sustainable and preserve energy, we made the table in P4 also darkmode. However, the pagination buttons are still light mode. They turned out to be difficult to change to darkmode, due to [React-Native-Paper pagination](https://callstack.github.io/react-native-paper/data-table-pagination.html) being hard to customize to dark mode.

#### Component layout
The components are adjusted in size and placed to be more user friendly to a phone user. The select-dropdown menues and description has less space between them. The search field is smaller in proportion to a phone screen. We made the data table smaller and footer more compact.

#### Data table parameters and display
To fit the data table better on a phone screen, we made some adjustments to the table parameters and how they are displayed. 

First, we removed the "Type"-parameter. We had to cut down to three parameters, because four was too many and overwhelming to a phone user. Therefore, we removed the most unecessary parameter from our point of view.

Then we made the "Title"-parameter longer to fit longer titles on a phone screen. We saw it was hard to see which show it was, because the title was too short to identify some of them. The title is now longer in proportion to "Release Year" and "Rating", which makes it easier to identify titles for a phone user. 

The "Rating"-parameter was also too long with 5 horizontally lined stars. Instead, we shortened it to one star with the amount of stars rated as a number. This was a better design solution for a phone user. 

#### Search results
In P4, we removed the text that displays which filter/sort options that were supplied to the query. This text was originally there to demonstrate usage of global variables, but on smaller screen sizes it cluttered the view too much to justify keeping. We only kept the text results from searching by the input search field.

#### Pagination bug fix
There was a small bug in the pagination functions in P3, which we made a fix to. Sometimes we would get the wrong data from the database when paginating. When getting data through the "FEED_SORT_TABLE_SHOWS"-query (see /schemas/Queries.tsx), the offset was calculated in a way it behaved unpredictable. It should be constantly proportional to only the pagination number. We fixed this issue and now there is no bugs when pulling data with the new offset calculation.

## Bugs
The note field that appears when you click on a movie is not functional. We meant to fix it at the end of project 3, but we had major issues getting the backend to run on the VM so we did not prioritize fixing it. Originally we also had three seperate data sources. One for the movies, one relational table between movies and reviews connecting individual reviews to a certain show, and one table for reviews. Our plan was to show the different reviews people had made under more details about the movie, and displaying the average rating for each in the data table. Due to major issues getting this to work with the VM, we had to put the rating inside the movie table as a last resort. This effectivly means that a movie can only have one rating, and when a new person rates a movie, the old value is overwritten. We know this is a poor solution. If we had chosen option b in conjuction with c, we would had prioritized fixing this. Unfortunately we forgot to document this in P3.
