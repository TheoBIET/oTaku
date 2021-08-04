<img src="./docs/images/Luffy.jpg" align="right"
     alt="Luffy ONE PIECE" width="178" height="178">

# 🇯🇵 oTaku | Anime Search Engine &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

o'taku is an API that allows you to find workings streaming links for your favorite anime. This project aims to simplify the tracking of a particular anime. Indeed, when you search for an anime, you will receive a lot of information about it (all coming from a database which is updated daily and fed by the MyAnimeList API; I made this choice to decrease the response time) but also, a list of streaming links available in several languages. No more evenings looking for a working streaming link before binge-watching your favorite series!

-   This project is currently **under development.** 🏗️
-   React application on the frontend. I'm not a designer BUT I did apply myself! After all, nothing is better than watching your favorite anome on an eye-pleasing platform 🐻
-   Currently, only VF 🇫🇷 and VOSTFR 🇯🇵 are supported and available. Since my API is strictly for personal use, I prefer to focus on adding features to improve my skills while having fun

## Development stages 🚀

#### 1 - Reflecting on the application's data model

<div align="center">
    <figcaption align="center">After connecting to the MyAnimeList API, I analysed the data it provided me with in order to think about a viable conceptual data model to store this data efficiently in a PostgreSQL database</figcaption>
    <img src="./docs/dcm/DCM_v1.png" width='50%' alt="DCM v1">
</div>

#### 2 - Creating a script to get a streaming link for the desired anime and its metadata via My Anime List.

<div align="center">
    <figcaption align="center">This part was one of the most difficult at this stage of the application. The MAX query count of the MyAnimeList API was limited, so it was impossible for me to retrieve all the data from the API to serve my own application with a lower response time since the database would be present locally and indexed correctly. Moreover, the time it took to search for links varied a lot depending on the quantity of data found and the number of episodes in the anime. It was also impossible to retrieve links for more than 30k manga, as only 5% of them would have been useful; plus, seeding the database would have lasted for days. Consequently, I reexamined my way of thinking in order to get the useful information only when necessary. All this is explained in the diagram below.</figcaption>
    <img src="./docs/images/schema.png" width='100%' alt="Schema">
</div>

#### 3 - Rethinking the structure of the database to make it scalable

<div align="center">
    <figcaption align="center">Following the change of management, the structure of the database had to be slightly rethought in order to enter data only when it has never been searched before, and to serve the already existing data in a smaller response time.</figcaption>
    <!-- <img src="./docs/dcm/DCM_v1.png" width='80%' alt="DCM v1"> -->
</div>

#### 4 - Creating a web application with React, in order to use this API in a simple and playful way

<div align="center">
    <figcaption align="center">What I mean here is that streaming links and metadata from MAL will be retrieved only when needed, and then inserted into the database. This will then reduce future response time for the same requests.</figcaption>
    <img src="./docs/images/homepage_v1.png" width='80%' alt="DCM v1">
</div>
