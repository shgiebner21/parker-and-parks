# Open Items and Parking Lot

### TODO list
    - Move Web App to the cloud or make native downloadable app.
    - Child page, blank children should not be allowed...__code is there but only partially working__...
    - Either allow multiple completions of same activity by same child (need to add date/time to key) or disallow.
    - Looks like duplicate badges are still happening, not a big problem but should clean up.
  

  #### TODO's completed
    - Child page - High Score; what logic to limit to top 5 (if tied, oldest score wins?).
    - Badges should be on same horizontal row, not stacked vertically.
    - Move CouchDb to the cloud; this is done, but Cloudant syntax is different so some changes to dal.js are needed.
    - Completed Activity appended to Children.child
    - Child page - Family Rank calculation...__think I have to give sort(func, xx) a function__.
    - All badges append to Children.child, including Park Ranger badge (even is earned at same time as an activity badge).
    - __Calculation for when badge earned__ - needs append to child also
    - API and DAL structure
    - Login button - now working and moving to Family page, BUT this route does not bring in family yet...
    - Add More Children button - wire up
    - Add Date/Time to Signup, Login and Activities completed.

    - Child page, Sibling buttons need to refresh for new Child selected (used set() to change State
    - Blank Signup should not be allowed
    - Activity detail page needs props wired up
    - Cancelled Activity should return to Park page
    - Activity page, Cancel __also appends activity to Child object__.


#### Database - Complete

#### Home page - Complete

#### Signup page - Complete

#### Login button is not wired up yet


#### Children page - Complete

#### Child page

#### Parks

#### Activity-detail page - Complete



#### Nice to Have
  - geofencing.
  - How to convert to iOS and Android downloadable app?
