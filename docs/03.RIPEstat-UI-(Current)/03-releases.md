# Release Notes
This section contains release notes for recent versions of the RIPEstat UI. You can always check the latest version you are using from the ? (help) menu at the top right of your screen.

## 202206081430
- NEW: expand ICs by default pref
- CHANGE: improvements to searchbar visibility
- CHANGE: improve landing page and prefs discoverability
- FIX: some height and scrolling issues with BGPlay and Historical WHOIS
- FIX: for RPKI Origin Validation not working if asn search resulted in single object (vs array of objects)
- FIX: expanded state not always saving in url
- FIX: some cards showed expanded areas even when zero data return
- FIX: RIS Visibility not working for asn input
- FIX: hash when time changes 
- FIX: single digit RRCs not recognized in BGPlay

## 202205160553
- FIX: shortform prefix comparison
- FIX: scrolling to related prefixes

## 202205140938
- FIX: Routing Status in RIS visibility
- FIX: History url rewrites for enabled/disabled cards

## 202205121319
- **NEW: Address Space Hierarchy Use Case app**
- **NEW: Historical WHOIS Use Case app**
- CHANGE: VRPs added to Routing Consistency Use Case
- CHANGE: Added some translation strings
- CHANGE: Remove unused outlinks
- FIX: BGPlay RRCs list
- FIX: RPKI Origin Validation sometimes incorrectly stated prefix was not routed
- FIX: improved history
- FIX: improved saved behavior for Use Case apps
- FIX: Various interface tweaks

## 202205061508
- CHANGE: Added RRCs to BGPlay
- CHANGE: Added config option for graph height to BGPlay

## 202205041056
- **NEW: BGPlay Use Case app**
- **NEW: Compact theme (available in Preferences)**
- **NEW: Saved items can now be drag sorted**
- CHANGE: Remove the outlink to old UI version of BGPlay (since we now have new version)
- CHANGE: Atlas Targets IC now links out to individual probes
- FIX: Line chart in RPKI by AS now step for greater data clarity
- FIX: Various text formatting inconsistencies

## 202204041343
- CHANGE: Modified Usersnap for newer version
- FIX: minor formatting fixes to menus 

## 202203181012
- **NEW: Routing Consistency Use Case app**
- **NEW: Reverse DNS Consistency Use Case app**
- **NEW: Check DNS infocard**
- CHANGE: Remove the outlinks to old UI versions of Reverse DNS Consistency and Routing Consistency (since we now have new versions)
- CHANGE: Infocard top level expand/contract now in the title bar
- CHANGE: Enable latest timeframe for Routing History IC, Allocation History IC, and BGP Update Activity IC
- CHANGE: Show full date range requested in chart even if data not present on those dates Routing History IC
- FIX: Hide more info if unknown in abuse contact IC
- FIX: Correct expand logic in announced prefixes IC, whois IC
- FIX: Missing searchcountry var error in searchbar
- FIX: Update version checking
- FIX: Add padding to bottom of card layout
- FIX: improvement to sidebar link detection and sharelink generation

## 202203010759
- FIX: Allocation History not showing bars for larger prefixes
- FIX: Duplicate queries in RPKI by AS when switching from IPv4 to IPv6
- FIX: Clear search error when reloading
- FIX: Incorrect menu items in Use Case menu
- CHANGE: updated menu components will show external links icon
- CHANGE: Forward DNS status clarifications

## 202202150639
- FIX: Overlapping Country Resource List IC when changing table paging
- FIX: Prefix Status IC when IP search
- FIX: Handle 400 errors in multiple ICs
- FIX: Handle empty IANA response
- FIX: Handle timeout in Atlas Targets
- FIX: Correct no result colors in various cards
- FIX: Absolute time not being saved across views
- FIX: Input styling after quasar upgrade broke things (mostly in search bar inputs)
- FIX: Select all/select none share url update
- FIX: Missing cardMeta vars
- FIX: 2 col to 3 col IC width setting
- FIX: clicking on Launchpad when at init would sometimes load last group
- CHANGE: Limit related prefixes to latest
- CHANGE: Link out to related prefixes now expands the IC as well
- CHANGE: Apps menu removed and items relocated to UC menu
- CHANGE: Don't re-show intro slideshow after upgrade, only at very first run
- CHANGE: Replace Prefix-Overview init with Network-info
- CHANGE: UC menu opens when searching, all use-cases for type shown
- CHANGE: Improved performance with RPKI calls
- CHANGE: Update process redesigned and nonmodal (user can continue working until reload)
- CHANGE: Prefs Reset App area now shows current version

## 202201101412
- NEW: pref "show meta in infocards" in Prefs (will show latest time for cards that support it)
- CHANGE: Routing History IC - show colors, remove legend, show 20 by default, add range label
- FIX: expand shortform prefixes in all infocards

## 202201070825
- FIX: paging in Routing History IC
- CHANGE: align time and date slider labels to European standards
- CHANGE: add path prepending ("/app/launchpad/") to sharelinks (should also speed up interpretation)

## 202112170909
- CHANGE: always display full prefix in top status line (even when short format used for searching)
- CHANGE: status line for RIS visibility and Prefix status
- CHANGE: rename cards to clarify relation to RIS (looking glass, visibility)
- CHANGE: align cards to only show exact prefix matches (prefix status, visibility, rpki origin validation)
- FIX: full country name error in country asns IC
- FIX: misinterpreted shortform prefix comparisons
- FIX: make asns link from RPKI Origin Validation IC
- FIX: search error behavior
- FIX: Blocklist IC not prepending AS if asn search

## 202112081210
- FIX: Prefix Status IC display (for some prefixes)
- CHANGE: RPKI Validation changed to RPKI Origin Validation
- CHANGE: RPKI Origin Validation will only validate routed prefixes / messaging improved / links to related
- CHANGE: Updated Turkish language strings

## 202111301132
- FIX: RPKI infocard not refreshing on new search input
- CHANGE: Clarified RPKI infocard warning message when prefix is not routed

## 202111240836
- NEW: All links in ICs can be opened in new window (right-click)
- CHANGED: Added link search ability to several more cards
- CHANGED: Documentation link now point to new RIPEstat Docs
- UPDATED: package updates

## 202111050852
- NEW: ability to expand all in BGP Looking Glass
- NEW: added your and random country to suggestions on landing page
- FIX: Rounded input override in ios 15.1
- CHANGED: updated TD components
- CHANGED: includes for variable italic font

## 202110070938
- FIX: Maxmind tooltip accuracy
- FIX: History (back was broken when selecting date range)
- FIX: expanded BGP Update Activity card would sometimes underlay other cards
- CHANGE: Routing history can now be viewed in relative timeframe of "Last 24 Hours"

## 202109241339
- **NEW FEATURE: you can now set the number of infocard columns in Preferences**
- CHANGE: show 'no data' band for RPKI by Country and Country Routing
- CHANGE: Add UTC message to all ICs Info area
- CHANGE: added percent filtering to RPKI by Country IC
- FIX: dates older than 20 years not sharing properly
- FIX: clicking on saved prefix search from Launchpad would sometimes fail
- FIX: searching from a saved search would sometimes fail
- FIX: prefix searches would sometimes display as url encoded in searchbar and infocards
- FIX: for Usersnap snapshots being broken by changes on their end
- FIX: Prefix Status not loading in rare cases

## 202109020711
- FIX: menu overlay issues
- FIX: Landscape layout issues on mobile
- FIX: PWA layout issues on mobile
- NEW: added survey banner link (dismiss-able)
- CHANGE: removed twitter link from feedback options at request of comms

## 202109011040
- FIX: prefix status IC when not latest
- NEW: Feedback/Support popup and options
- NEW: Added Atlas Check UC (ip, prefix, asn)
- CHANGED: Added ICs to various UCases

## 202108231353
- FIX: change timeframes not being added to share link
- FIX: saved searches list search will now forward to launchpad correctly
- FIX: new search from saved search item will forward to launchpad
- CHANGE: Atlas deployment IC colors changed
- CHANGE: combined app reset (in Prefs) with saved search backup/restore

## 202108201308
- **NEW: remember expanded state and interpret expanded state from URL**
- **NEW: remember launchpad card order and states (by type)**
- FIX: url encoding for prefixes
- FIX: whois card when no return
- FIX: display invalid_asn records in RPKI Validation IC
- CHANGE: now using new data cluster for API
- CHANGE: local data will be re-looked up at search reset
- CHANGE: remove top line from Atlas Probe Deployment IC
- CHANGE: removed 404 page and replaced with redirecting page

## 202107071414
- FIX: card order was not saving when cards were dragged in launchpad (instead of dragged in manage list)
- FIX: proper timeout on BGP Update IC
- FIX: display when only 1 collector present BGP LG IC
- FIX: labeling on AS Prefix Count IC
- FIX: resize event timing (to improve card relayout after menu open/close)
- CODE CLEANUP: Remove Eventbus actions for Highcharts
- CODE CLEANUP: Rework/remove entire $bus system in prep for vue3
- CHANGE: reset button color to align with RIPE NCC warning color

## 202106221208
- Remove commas in AS path BGP LG
- Add query time info to BGP LG
- Fix non working info warning icon
- Fix calendar popup placement (moved because of web component update)
- Fix right pane layout width for new grid
- Hide search extras if page is saved search list
- Added page containers where necessary
- Sidebar nav fixes
- Fix date set bug where start date could be later than end date
- Fix double click in date picker sending null value and triggering error
- Fix for first time menu overlay and welcome screen issue
- Landscape layout fixes

## 202106140847
- Fix setSearch if type was Number
- Fix AS prefix on BGP Update Activity IC
- Cast all search conditionals to String
- Add country link to Registration IC table
- Remove colon from less specific in prefix IC
- Fix sorting bug in RIS Visibility reported by end user
- Updated web components with fixes for Legal Component

## 202106041147
- BGP Looking Glass IC show as name on hover over asn
- Transfer IC changes (remove as searching, progressive display/adaptation, top line clarifications) 
- IANA IC improvements
- Sidebar formatting fixes
- Fixes for spaces in urls (interpreted or entered)
- Fixes for ASN trimming search
- fixes for double AS name in as name card 
- initial support for ipv4 ranges input

## 202105271413
- Fix for AS Status (now just validating number range and passing to cards)
- Fix for domains that begin with "as" (were being truncated)
- Fix for proper asn range detection
- Fix for unallocated being seen as invalid
- Fix for atlas probe deployments reporting found records for all zero values
- Fix for RPKI spinning when AS has zero announced prefixes
- Fix for INVALID AS
- Fix for as name no name found
- Fix hide AP more button if zero prefixes
- Fix hide AS neighbours more info if zero values
- Fix AS prefix count more info if zero values
- Fix AS Path length more info if zero values
- Fix Atlas Targets if zero value response

## 202105251106
- Restore error messaging to bad search input
- Set error if interpreted URL search is bad