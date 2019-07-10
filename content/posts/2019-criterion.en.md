---
title: Criterion 2019
date: 2019-04-26
tags: ['Events']
lang: en
description: "First post! Here is how we represented civic tech and open data at one of Switzerland's top trade fairs dedicated to sustainability."
published: true
---

This year the association we were a guest at [Criterion](https://criterion.ch): a four day festival at Messe Zürich dedicated to sustainable design and business. The **cividi** team partnered with [Crowd Container](https://crowdcontainer.ch) to bring [Opendata.ch](https://opendata.ch) to the people, and highlight some of the ways that Open Data could play a role in enabling and monitoring sustainability. We co-presented with [BitsAboutMe](https://bitsabout.me/en/), a new Personal Data service that aims to help protect your privacy and get a fair deal when sharing profiles with companies and institutions.

In addition to our adjacent booths in the _Smart Transparency_ zone of the fair, we held a joint [panel session](https://criterion.ch/transparent-trade---whats-the-role-of-data-and_de) moderated by [Impact Hub Zürich](https://twitter.com/impacthubzurich/status/1112301649157152768), [coached startups](https://criterion.ch/speeddating-alnatura-freitag_de), contributed virtually to an open product footprint [hackathon](https://www.facebook.com/media/set/?set=a.1263886563787569&type=3), and shared experiences from our work on [Smart Use](https://smartuse.ch) - a _Civic Urbanism_ project putting open data to use in participative city planning.

[![](~/assets/images/posts/2019q1/criterion-booth.jpg)](https://criterion.smartuse.ch)

Our booth featured a digital showcase of many projects from the open data community, including outputs from recent crowdsourcing events such [Opendata.ch Hackdays](https://hack.opendata.ch), that we felt would provoke critical responses from Criterion visitors. More projects and data visualizations like the one above can be found online at [db.opü.ch](https://db.opü.ch/event/2).

[![](~/assets/images/posts/2019q1/opendatazurich.jpg)](https://db.xn--op-yka.ch/project/34)

There were demonstrations and explanations of the boundaries and intersections of personal and public data. We had a great time, and in this blog post we go behind the scenes of our civic tech installation.

## Tangible cities

The whole [Smart Use](https://smartuse.ch) team embraced the idea of going public with open data at Criterion. To make the most of our presence, we especially wanted to put some "things" into the hands of visitors that were tangible and even analogue rather than digital - yet still produced with the kind of spatial analysis and awareness of urban questions that we are working on.

One of these was a piece of card on which visitors could write down urbanism challenges / questions / provocations, or use the [companion website](https://criterion.smartuse.ch). Another was a map of the city with stickers used in a similar way to the earlier [data://transform.bz](https://blog.datalets.ch/026-transform-bz/) installation. We had a box of inscrutable chocolate eggs.

Arguably the cutest "thing" we brought, was a happy little printer that generated receipts showing how well connected your home, office, or organic fair trade shop, is to the surrounding city by bicycle.

![](~/assets/images/posts/2019q1/printrpi-criterion.jpg)

After considering everything from tabletop games and silk-screened fabrics, our initial plan was to use X-Y plotters and 3D printed charts. We experimented with an AxiDraw and Printrbot, both made available through the FabLabs of Bern and Zürich. Finally, inspired by the [Little Printer by Berg London](https://www.stylus.com/qfdjpv) and encouraged by fellow makers, we assembled a small printer connected it to a web service that generated text and imagery on demand based on geographic coordinates.

With this installation - supported by Open Knowledge stickers and Fab Lab flyers - we wanted to point out the value of open source, open data and open hardware, and provide a simple memento that would hopefully keep people thinking about their urban situation. So we stocked up on thermal rolls like any other Point of Sale operator, acknowledging that paper receipts are [not sustainable](https://hackernoon.com/digital-receipts-in-retail-b415fbdfde3f) and soon obsolete. Here is how we happily produced personalized data viz for visitors of the fair.

## Location, location, location

A personalized mapping algorithm creates diagrams or forecasts based on any given address input. A bike friendliness map shows you how well your location is connected to mobility in the region. By saving the resulting High Score (none of the addresses were kept), we could keep track of participation during the four days at the festival.

The design of our idea required a monochrome, receipt printer compatible output. Hence some kind of plot or image based system would be needed to then be converted into a bitmap for thermal printing. Traditional web mapping platforms would not provide the necessary tools - so we turned towards Python libraries for generating charts: pylab from [matplotlib](https://matplotlib.org/) in particular. The initial development was done in a [Jupyter Hub](https://jupyter.org) data science environment.

To get location based data for our visualization, we connected an API we've been using for quite a while in projects - [OpenRouteService](https://openrouteservice.org/). Dedicated to routing and related computations like isochrones and distance matrices, it is based on Open Street Map data and topography. An awesome project leveraging open data to solve real world problems, OpenRouteService also offers a Python package that nicely integrates with [GeoPandas](http://geopandas.org/) and [Shapely](https://pypi.org/project/Shapely/). With that in place, we started hooking up the address input from string to do a geocoding request, and receive the Latitude and Longitude for the address.

![](~/assets/images/posts/2019q1/openrouteservice.jpg)
<small>-- _Screenshot of openrouteservice.org_</small>

Next we calculate the 30-min bicycle _Isochrones_ (a curve of equal travel time - see [wiki.openstreetmap](https://wiki.openstreetmap.org/wiki/Isochrone)). Since we already have a Latitude and Longitude to supply, we just need to pick a bike profile and the range. After some testing we opted for the "cycling-regular" profile and a 30min range. The average speed for a cyclist being [15 km/h](https://en.wikipedia.org/wiki/Bicycle_performance), 7.5km should be the usual distance for 30min. However, in most cases, we found that it is closer to 8 km for city bikers. Hence we added an 8 km circle for reference to the map. For additional spatial awareness, we tried adding the nearest train station as well as airport with small markers, pulled from a PostGIS database via geospatial query. However, we left out these markers in the display version, which results in outputs similar to the one below.

![](~/assets/images/posts/2019q1/output.png)

To generate some kind of High Score we then needed to find a way to calculate a maximum distance. A simple method to do so is to use the extend box of the generated geometry to at least cover x and y distances. While a more accurate calculation - possibly based on street kilometers should be done here, this basis was enough for a simple score. While this means any direction off x or y axis will be underrepresented, it nevertheless assures us of comparability.

## Trial by fire

After some testing with crowd-sourced addresses and doing small bugfixes it was time to tackle the printer itself. We opted for the wonderful [Mini Thermal Receipt Printer](https://www.adafruit.com/product/597) Adafruit project, part of the ["Internet of Things" package](https://learn.adafruit.com/pi-thermal-printer). This required some additional fun hardware and software hacking.

![](~/assets/images/posts/2019q1/printrpi-assembly.jpg)

A minimal web application written in Flask allows visitors to enter an address (could be their home, work, or any other point of interest they can think of), from a tablet, mobile phone or other device. A processing job as described above is run to prepare the visualization. The resulting graph is generated and cached in the web application.

When the printer's button is pushed, a Python script connects to the Flask API to retrieve the last cached result, and sends it to the printer. Text and graphics are handled separately, in particular since a bit of cropping of the image using the PIL graphics library is required.

And "Presto!" personalized data in tangible form for a happy fairgrounds visitor - with thanks to our friends from the [Fab Lab](http://fablab-bern.ch) and [Effinger](https://effinger.ch/) for encouragement, material and build help! And of course, much gratitude goes out to the wider open hardware and open data science communities that were instrumental here.

# Happy Lil' PrintrPi 🤖

As noted above, this was a project done very much in the spirit of the hack and spur of the moment. As evidenced in the Git log, plenty of tweaking was done on location at Criterion itself.

![](~/assets/images/posts/2019q1/gitlog.png)

Currently this project does not support multiple simultaneous devices in operation. We have not extensively tested this, invalid addresses and other bugs may break the code. So we also put up this paper summary of Zürich neighbourhoods as a backup in case something borked:

![](~/assets/images/posts/2019q1/criterion-effinger.jpg)

It is at time of writing alpha code and not very safe to run this particular server application on the wide open web. As long as you don't invite too many robots, it is enough for personal use and demo purposes. Consider yourself duly warned, and enjoy `;-)` The client and server code components of our solution are in an [open source repository](https://bitbucket.org/cividi/happylilprintrpi/).

![](~/assets/images/posts/2019q1/criterion-team.jpg)

Thanks for reading, and (sustainably sourced caffeinated beverage) cheers to a sustainable future!

> _In the future, everything will be connected to the internet. And all restaurants will be Taco Bell!_
<small>-- [Adafruit](https://learn.adafruit.com/pi-thermal-printer/overview)</small>
