# BurningGAS!

Random tips putting Google Apps Script to work.

Check out links for reading on our [Flipboard magazine](https://flipboard.com/@rudyflores/burning-gas-!-5ut59mlvy)

# How to use
Open a new google spreadsheet.

Pull the .gs and .html files form this repository into your sheet's attached 
script editor.

Enable any advanced services listed in the menu functions like sheets (both in 
the script editor and via link in the GCP console). See notes in the menu functions.

Refresh your sheet and use the new menu to try out various demonstrations.

Some of these will be used in our [DevFlow Project](https://github.com/rudimusmaximus/DevFlow)

# How To Get Started In Google Apps Script

This section inpired by [this original gist](https://gist.github.com/rudimusmaximus/bfe0ac7ca872bb0b2f8a7cb30a524eff).  

---  

Initially intended to extend G Suite apps, I like to think of Google Apps Script as a gateway to more kinds of development.
Think of it as workflow glue and the power of programming that can interract with Google Apps and external APIs too!
## Purpose
Provide a living document for whenever someone asks, " so, how do i get started with Google Apps Script?".
## Working Outline
Just the orgainizing principles and some key links.
### 1 Starting point: Good Things to Keep in Mind
Scripts are 'bound' to a container like sheets, docs, slides or forms. These can be accessed from the containing doc and opened say in sheets by going to the menu Tools > Script editor. Scripts can also be standalone for addons or web apps.
Your script home page is a dashboard found here [script.google.com](script.google.com). The [help link there](https://developers.google.com/apps-script/guides/dashboard) will get you to an explanation of the dashboard.
#### javascript basics
See [this codeacademy link](https://www.codecademy.com/tracks/javascript).
#### working with 2d arrays
Getting data into and out of a sheet using 2d arrays and few methods is the key to moving on from custom functions to macros to executing business logic on an array and then writing the results back to your sheet.
### 2 Remember, "It's *basically* Javascript" *BUT* an important note on standards
The documentation alludes to [app script's basic javascript feature support](https://developers.google.com/apps-script/guides/services/#basic_javascript_features) which is 1.6 and some of Javascript 1.7 and 1.8. 

GAS support for javascript features can be confusing to a newcomer, especially when learning about javascript from the ECMAScript standards.  

The ECMAScript (ES) implementation called "V8" is the javascript engine used by apps like chrome, node.js, opera, etc. This engine supports some of the latest ES javascript conventions. 

However, google apps script is running on the servers and we have yet to see when or if the Google App Script (GAS) team will support more recent ES so developers can write consistently when writing javascript whether it's a web app or inside a GAS.

Star and follow this issue: https://issuetracker.google.com/36764074  
**Advanced users**: there are some emerging transpilers modified for GAS but I haven't worked with them yet. Babel?  
### 3 Key Google links
[Welcome page about scripts](https://developers.google.com/apps-script/)

Start with this [Overview of Google Apps Script](https://developers.google.com/apps-script/overview). It includes a link to codeacademy for learning javascript if you need help there.
### 4 People and their books, classes, helpful websites or other activities they want to share in this context
Please add to the comments and I'll include here over time. Thanks so much.
#### From conferences on youtube 
Please see the nice add-ons introduction and the end comments; in the middle is also a demo of ultradox which i haven't used.
[Building G Suite add-ons with Google Apps Script (Google Cloud Next '17)](https://youtu.be/CLjXEdKbqqs) 
#### From the comments below this post (thanks! VERY MUCH :) ) 
- From https://gist.github.com/oshliaer, an amazing gist full of great resources by Alexander Ivanov
  - https://github.com/oshliaer/google-apps-script-awesome-list
- https://gist.github.com/Blueprinter gives us this site of documents for how to across a lot of categories
  - [Apps Script - Getting Started](https://sites.google.com/view/apps-script-getting-started/) 
#### From interesting posts on the Web  

This great [gist by Amit Agarwal](https://gist.github.com/labnol/0b67f812a827fd9babc5)  


For tutorials covering the basics, check out [The website of Barrie Roberts](https://www.bazroberts.com/category/apps-script/) 

This G+ post has lots of [real uses for GAS](https://plus.google.com/102706994939807026322/posts/TMouYQWodmD). Highlights
 - workflow automation testimonials  
 - [Andrew Roberts provided links](http://www.andrewroberts.net/scripts-and-snippets/#Cool_Third_Party_Stuff)
    - [Bruce McPherson’s Apps Script website](http://ramblings.mcpher.com/Home/) I've purchased his materials. Especially good for those moving from VBA. Lot's and Lot's.
    - see his list of links to spark ideas and find good stuff

### 5 Action plan
A few options for how you could go about learning more and what that path might look like.
Try using the above links to find out how to do the following:  
1 Write a custom function in a container bound sheet script  
2 Call that function from the sheet  
3 Play with recording macros and editing the scripts they generate (in macros.gs)  
4 Lookup the documentation on some of the methods you see in the scripts; For example, go to [the api documentation](https://developers.google.com/apps-script/reference) and search for more information on the methods you see used in the macros.  
Such as this macro recording me selecting a range and then simply entering the text **what** into E5:
````javascript
/** @OnlyCurrentDoc */

function testmacro() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('E5:F12').activate();
  spreadsheet.getCurrentCell().setValue('what');
  };
````
In the above, you could search the api documentation for 'SpreadsheetApp.getActive()' and learn that it "Returns the currently active spreadsheet, or null if there is none." This is an object assigned to the spreadsheet variable in your macro example above. Simarlarly you could search for 'getRange' or 'getCurrentCell()' or inside each of those 'activate()' or 'setValue' respectively.
Make the connection between the api documentation and how you see the macros recording your actions.
HINT: inside the script editor you can hit Ctrl + Spacebar and see a list of the services available to the script. Including the 'SpreadsheetApp' you are exploring. You can scroll or type to find the service you want and on each find hit enter followed by a period to walk the list of classes or methods for the current selection. This is effectively 'walking the API' which I find more interesting way to figure out what's available than trying to read the API documentation. Put the two together and you really start to get it.
````javascript
SpreadsheetApp.getActive().getRange(a1Notation).getValues();
````
If you look at the hints while walking the api as in the example above you can notice getRange wants a1Notation (there are others) and that .getValues returnes a [[]] 2d array - an object of rows whose rows are arrays...a spreadsheet range :)

HINT: now just try getting and setting one value vs many and you are on your way to working with scripts. As you advance, checkoout libraries to see what proplems are common enough to require libraries. Star the gists to browse and file the links.

Learn more by solving one problem at a time. Join the [DevFlow Project](devflow4fewd.redcrowmethods.com) to learn how to create a sheets addon and test your understanding. Good luck. Help each other.


# WORKING SESSIONS
These working sessions document the creation of a set of menu driven functions in a script container bound to a sheet. Watch it evolve and read through the notes. Follow along the videos and try them yourself.

 - This section is from a phase II project inside of the repo [DevFlow](https://github.com/rudimusmaximus/DevFlow); to catch up on that project try reading that repo's [issue 46](https://github.com/rudimusmaximus/DevFlow/issues/46) 
 
 - Specifically, a multi-part set of working sessions. The notes are included below along with links to the unedited recorded sessions were possible.  
 
---  

## 2018.06.20 DF Weekly Working Session - script basics part 1   
### [Recording Link](https://drive.google.com/a/redcrowmethods.com/file/d/1BxI_qUBmJekKEsClJ2VjPnSCRkUJ0TG1/view?usp=sharing)  
### Agenda with notes  
 - **GAS Basics** working sessions to try out GAS on sheets data; some of these could be turned into demos of successful "GAS patterns"
   - Each week for a series of weeks will cover some GAS basics and share the sheet with it's script as well as the recording, so you can follow along and explore.
   - We recommend making a copy of the provided files and then working from there. If you want to make comments on the file, just add comments in the sheet we link you to.
 - **Topics covered include**
   - Update Multiple Values
   - Manipulate Disjoint Ranges
   - joint discovery based on interest and time
        - on open build menu calling these
        - others? practice using and presenting from editor
    - dates - cancelling working session on Aug 1st
 - **This week's Cool links**:
   - [Working Sheet File w Script](https://docs.google.com/spreadsheets/d/1OGKaMNs1zJwemzGyWci1dG_Q2e1FH7-N-j5DcOkv8GY/edit?usp=sharing)  
   - [How Fast is Realtime? Human Perception and Technology](https://www.pubnub.com/blog/how-fast-is-realtime-human-perception-and-technology/)  
   - [JavaScript engine fundamentals: Shapes and Inline Caches](https://mathiasbynens.be/notes/shapes-ics)
      - the original tweet about the article has a rich discussion [see twitter post](https://twitter.com/mathias/status/1007524406728458241)  
    - [The One Tab crhome and firefox extension](https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall) save 95% of memory when you have too many tabs open; use as intended
    - [Digo Chrome Extension](https://www.diigo.com/tools/chrome_extension) extension for Diigo.com tool

 - **Unassigned Action Items:** research items, problems to solve, notes, special items
     - [Other DevFlows from GDEs](https://plus.google.com/+AndrewRoberts1/posts/AZsgxBpLvcq?fscid=z13xevizsoabsvadt23ucjfb1vyfcboic04.1529332593935425) we gave feedback (and got mentioned) in a google developer expert's DevFlow for an org team. This G+ post shows him listing a document for feedback and the document itself has comments you can review in comment mode. He has a great idea about including manifest files (more later). IF you are ever keen and the post is still up, check it out for a look at open collaboration about methods.  
        - [OUR copy of doc with comments](https://docs.google.com/document/d/1NJr4v37OWnj4bBs6B7h2UK3dfM-h3pukeaiHfSI-L3s/edit?usp=sharing) open the coments thread...feel free to comment on this one for our internal use
     - [ ] ideas for GAS series working sessions
         - use the "Gist query my sheet" demo to build a 2d array from sheet data
            - try out a few patterns on this data
         - grab real problems posed in G+ for discussion; for example [this one](https://plus.google.com/+JacobMcAlisterMIW/posts/a11LzQoafRh) has a recommended solution where the answer involves a simple and an installable trigger. Triggers might be a topic
            - setup a series to solve, then work the list practicing working ing GAS
         - Incorporate manifests
 - **Next Week:** part 2  

## 2018.06.27 DF Weekly Working Session - script basics part 2
### [Recording Link](https://drive.google.com/a/redcrowmethods.com/file/d/1DiNywevh0GI5julAIdEjJgtf3S0ht1hv/view?usp=sharing)  
### Agenda with notes  
 - **GAS Basics** working sessions to try out GAS on sheets data; some of these could be turned into demos of successful "GAS patterns"
   - UPDATED approach, use the new repo to get the code and add it to a fresh sheet.
 - **Topics covered include**
   - Review great links
   - Create a new repo for this "BurningGAS"
       - Pull in last weeks two functions and onOpen menu in a new repo
       - modify to create the input sheets
    - Gist query my sheet build
 - **This week's Cool links**:
     - [our new repo for these GAS sessions](https://github.com/rudimusmaximus/BurningGAS)
     - Check the learning GIST for these two new links; we will likely pull the GIST into our new repo
         - This great [gist by Amit Agarwal](https://gist.github.com/labnol/0b67f812a827fd9babc5)  
         - For tutorials covering the basics, check out [The website of Barrie Roberts](https://www.bazroberts.com/category/apps-script/) 
     - [explore these sources for data to use, especially 5](https://www.sba.gov/blogs/conducting-market-research-here-are-5-official-sources-free-data-can-help)
     - [Looking for data? Try Kaggle](https://www.kaggle.com/)
        - [Datasets](https://www.kaggle.com/datasets)
        - [KAGGLE example 'google job skills'](https://www.kaggle.com/niyamatalmass/google-job-skills)
     - [Javascript Linter Online tool](jshint.com)
     - atom plug in options
        - [Javascript Linter in Atom](https://atom.io/packages/atom-jshint)
        - [Javascript Linter in Atom](https://atom.io/packages/jshint)
     - [next week's topic](https://gist.github.com/rudimusmaximus/133ef10736888e42f0c9ba89c07be546)
 - **Next Week:** part 3
