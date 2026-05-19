# Lab 7

Name: Alexander Twano

Partner: N/A

## Question 1
- I would put my automated tests within a Github action that runs whenever the code is pushed. This is so that whenever code is pushed, test would run automatically and catch bugs/errors early. If I manually run them or run them all after development, it could lead to me forgetting to test at all or pile up the bugs and make the errors harder to fix.

## Question 2
- No, I would not use an end to end test to check if the function is returning the correct output because E2E is to test the whole entire workflow of the application. A simple output could easily be done with a unit test.

## Question 3
- The difference between navigation and snapshot mode is that navigation mode allows it to analyze the page right after it loads while snapshot mode analyzes the current state of the page.

## Question 4
- Three things we could do to improve the CSE 110 shop site:
1. Reduce Total Blocking Time: It is currently at 750ms and if we remove some functions or JS lines, it could reduce it.
2. Get rid of some render-blocking requests: This means looking at the CSS and stylesheets so the style of the page isn't delayed.
3. Optimizing the mobile viewport: By simply adding the meta tag in the HTML file and customizing to the mobile style.

