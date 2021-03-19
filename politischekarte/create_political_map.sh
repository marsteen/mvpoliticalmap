#!/bin/sh

MAP_WIDTH=4096
MAP_HEIGHT=2048
#
# Karte erzeugen
#
gdal_rasterize -a MAPCOLOR13 -ot Byte -ts $MAP_WIDTH $MAP_HEIGHT geographical-lines/ne_110m_admin_0_countries_lakes/ne_110m_admin_0_countries_lakes.shp  world.tif


#
# Grenzlinien addieren
#

gdal_rasterize -b 1 -burn 128  geographical-lines/ne_110m_admin_0_boundary_lines_land/ne_110m_admin_0_boundary_lines_land.shp world.tif


#
# Tiff-Datei in PNG umwandeln:
#
convert world.tif world.png

#
# Farb-Textur erzeugen:
#

../colormapper/build/colormapper world.png weltkarte-politisch.png

#
# aufräumen:
#
rm world.tif world.png

