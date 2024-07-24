---
tags:
  - dev/web/portfolio
  - docusaurus/plugin
  - docusaurus/sidebar
title: docusaurus plugin - an even better plan ctd
slug: 20240723122006-docusaurus-plugin---an-even-better-plan-ctd
---

From [docusaurus plugin - an even better plan](/docs/20240723003043-docusaurus-plugin---an-even-better-plan)
### More things to take care for:
1. ~~Convert backlinks into proper links for docusaurus. (can be done later)~~
2. Show tags into the docs itself in docusaurus (same as abve, for later), and with appropriate ui/ux

### Approx pseudo-code:
- [x] Create a var to keep track of filenames and corresponding tags ✅ 2024-07-24
- [x] Create  a function that will take the source dir ✅ 2024-07-24
	- [x] Glob sync doc files, from a specified dir ✅ 2024-07-24
	- [ ] For each file (use map or forEach):
		- [x] Read the file ✅ 2024-07-24
		- [x] Extract the existing tags from frontmatter using gray matter ✅ 2024-07-24
		- [x] Change all backlinks to suitable docusaurus format (later) 🔽 ✅ 2024-07-24
		- [x] Add this to the global tags var ✅ 2024-07-24
		- [x] Write additional metadata+existing meta data+content to a file in the target dir 🔺 ✅ 2024-07-24
- [ ] Copy the blog
- [ ] Use the tags dictionary to create the sidebar file
	- [x] ... Plan later, after above is done ✅ 2024-07-24
	- [ ] [TagMap and enhanced sidebar](/docs/20240724133308-tagmap-and-enhanced-sidebar)
