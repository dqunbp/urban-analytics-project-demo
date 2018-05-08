Commands list
---------------

- Load GeoJson into db:

> 1. Place you files into `geojson/` dirrectory.
> 2. Run the following scripts for import to mongodb:
> 
> ```sh
> docker-compose exec mongo bash
> mongoimport -d <db_name> -c <collection_name> --file /geojson/<file_name>
> ```