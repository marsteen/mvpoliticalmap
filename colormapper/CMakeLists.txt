cmake_minimum_required(VERSION 3.10)
project("colormapper")

message("System: ${CMAKE_SYSTEM_NAME}")

include_directories(../../mvlib/include)

add_executable(colormapper
               main.cpp
               colorFilter.cpp
               ../../mvlib/mvpng/mv_graphics_png.c
)


target_link_libraries(colormapper png)
