#!/bin/sh
gdal_rasterize -burn 255 -ot Byte -ts 10000 5000 -where 'GU_A3="AUS"' ne_110m_admin_0_countries_lakes.shp  work.tif
