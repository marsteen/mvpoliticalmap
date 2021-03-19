
#include <iostream>
#include <cstdio>
#include <set>
#include <vector>
#include <algorithm>
#include <mvlib/graphics/mv_graphics_png.h>

using namespace std;

static uint32_t colorSwap(uint32_t data)
{
   uint32_t loc_data = data;
   char* p = (char*) &loc_data;
   char  s = p[0];
   p[0] = p[2];
   p[2] = s;
   return loc_data;
}

const char* colorFilter(const uint8_t* png_data, int& png_width, int& png_height, int& png_bits);



#define BLOCK_SIZE 4

int main(int argc, char* argv[])
{
    if (argc == 3)
    {
        char* png_data;
        int   png_width;
        int   png_height;
        int   png_bits;
        
        if (mv_graphics_png_read(argv[1], &png_data, &png_width, &png_height, &png_bits, 0))
        {
            cout << "w=" << png_width << " h=" << png_height << " bits=" << png_bits << endl;
            
            if (png_bits == 8)
            {
                const char* filteredData = colorFilter((const uint8_t*) png_data, png_width, png_height, png_bits);
                mv_graphics_png_write(argv[2], filteredData, png_width, png_height, png_bits);
            }
            
            
        }
    }
    else
    {
        cout << "usage: colormapper <inputfile.png> <outputfile.png>" << endl;
        cout << "    input file must be 8-bit greyscale png" << endl;
        cout << "    output file is 32-bit color png" << endl;
        cout << "version 1.0" << endl;
    }
    return 0;
}
