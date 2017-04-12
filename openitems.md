# Open Items and Parking Lot

### TODO list for today, Monday April 10th
    - Child page - Family Rank calculation...sort of working...__think I have to give sort(func, xx) a function__.
    - Child page - CPC Rank calculation...this is working by child id, NOT by points...__not sure why__.

  Activity detail is losing the children array

  - Login button - wire up...OnChange is not working...can't seem to get Validate to go into state...__at least looks that way__...
  - Add More Children button - wire up
  - __Calculation for when badge earned__ - needs append to child also
    - Blank Login should not be allowed (this should mirror blank Signup code)
  - Child page, blank children should not be allowed...__code is there but only partially working__...

  - Wire up CouchDb
    - https:\\byseedstypingediseareake:224631cb9a0db5ad1e41160b9c538e3abdce370f@giebnar.cloudant.com/cpc
    
    - "start": "json-server db.json --port 5000"
    - "start": "PORT=8080 node app.js"
  
  - API and DAL structure
  

  #### TODO's completed
  - Completed Activity appended to Children.child

    - Child page, Sibling buttons need to refresh for new Child selected (used set() to change State
    - Blank Signup should not be allowed
    - Activity detail page needs props wired up
    - Cancelled Activity should return to Park page


#### Database
  - Children is sometimes being duplicated in an array in the Children object...not sure why yet.
    - Think I solved this by blocking POST of blank children.

#### Home page

#### Signup page
  - Blank Signup has been blocked
    - Allows blank family, need to stop that ability.


#### Login button is not wired up yet
  - Signup is blocked, same code should work for Login when I get to it.
    - Make sure blank Login is not allowed.


#### Children page - 'Enter another Child' button is not yet working.  Think CSS related.

#### Child page
  - Siblings need to be wired up to go to their page.
    - kind of works but doesn't refresh without clicking on url and hitting enter.

#### Parks
  - Need a return to Childs page button.  This also needs to refresh.
  - Need stories and images for both parks.

#### Activity-detail page
  - Cancel button is appending selected activity...!
  - Completed activity is not showing up on Child's page


#### Nice to Have
  - geofencing.
  - How to convert to iOS and Android downloadable app?
