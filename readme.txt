
#
#
# Website:
#
#
http://www.naturalearthdata.com/downloads
https://help.openstreetmap.org/questions/53918/simple-country-boundaries-as-osm-file

#
#
# Alles Rastern:
#
#
gdal_rasterize -burn 255 -ot Byte -ts 10000 5000 ne_110m_admin_0_countries_lakes.shp  world.tif

#
#
# Doku über gdal_rasterize
#
#
https://gdal.org/programs/gdal_rasterize.html

#
#
# Informationen über das Shapefile:
#
#
ogrinfo -al -so ne_110m_admin_0_countries_lakes.shp

#
#
#
#
#
gdal_rasterize -a MAPCOLOR13 -ot Byte -ts 4096 2048 ne_110m_admin_0_countries_lakes.shp  world.tif

#
#
# Eine Ebene rastern:
#
#
gdal_rasterize -burn 255 -ot Byte -ts 10000 5000 -where "ISO_N3 = '036'" ne_110m_admin_0_countries_lakes.shp  world.tif

#
#
# Grenzlinien zu world.tif hinzufügen, Helligkeit der Grenzlinie = 128 (von 255):
#
#
gdal_rasterize -b 1 -burn 128  ne_110m_admin_0_boundary_lines_land.shp world.tif

