

#include <cstdint>
#include <iostream>

using namespace std;

struct SColor32
{
    uint8_t rgba[4];
};


static const SColor32 coltab[] = 
{
    { 102, 204, 255, 255 },
    {   0, 255,   0, 255 },
    {   0,   0, 255, 255 },
    { 255, 128,   0, 255 },
    {   0, 128,   0, 255 },
    {   0, 128, 255, 255 },
    { 255,   0, 128, 255 },
    {   0,  25, 128, 255 },
    {   0,   0, 128, 255 },
    { 128,   0,   0, 255 },
    { 128, 128,   0, 255 },
    { 128,   0, 255, 255 },
    { 255, 255,   0, 255 },
    {   0, 255, 204, 255 }
};

static const SColor32 stdcolor = { 255, 255, 255, 255 };

const char* colorFilter(const uint8_t* png_data, int& png_width, int& png_height, int& png_bits)
{
    SColor32* png_data_new = new SColor32[png_width * png_height];
    
    int tcount = sizeof(coltab) / sizeof(SColor32);
    cout << "tcount=" << tcount << endl;
    
    for (int y = 0; y < png_height; y++)
    {
        for (int x = 0; x < png_width; x++)
        {
            unsigned int offset = png_width * y + x;
            int colindex = png_data[offset];
            if (colindex < tcount)
            {            
                const SColor32* scol = coltab + colindex;
                png_data_new[offset].rgba[0] = scol->rgba[2];
                png_data_new[offset].rgba[1] = scol->rgba[1];
                png_data_new[offset].rgba[2] = scol->rgba[0];
                png_data_new[offset].rgba[3] = scol->rgba[3];
            }
            else
            if (colindex == 128) // Grenzlinie
            {
                png_data_new[offset].rgba[0] = 0;
                png_data_new[offset].rgba[1] = 0;
                png_data_new[offset].rgba[2] = 0;
                png_data_new[offset].rgba[3] = 255;
            }
            else    
            {
                png_data_new[offset].rgba[0] = stdcolor.rgba[2];
                png_data_new[offset].rgba[1] = stdcolor.rgba[1];
                png_data_new[offset].rgba[2] = stdcolor.rgba[0];
                png_data_new[offset].rgba[3] = stdcolor.rgba[3];
            }
        }
    }
    cout << "OK" << endl;

    png_bits = 32;
    return (const char*) png_data_new;
}
