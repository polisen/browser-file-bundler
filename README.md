# Auto-Color V0.1

## Automatic Color Scheme Generation using K-means Clustering.

This project aims to generate color schemes that complements any set of input colors.

This is only a proof of concept / MVP - check below link for development journal / planning / roadmap / notes.

[Notion Notebook](https://light-brook-fae.notion.site/AutoColor-0691e08e305b4b7cb6c54dc8cf0ee50e)

### Problem Definition:
There is some friction involved when a user needs to define a color scheme for the presentation of their content - such as in cases of any CMS system, personal blog provider, etc.

### Proposed Solution:

The aim of this project is to provide color scheme suggestions - based on the content in the relevant context - such as images in a blog.

It has the ability to extract the colors of images, and use pre-existing notions of color harmony to figure out a pleasant mix of colors to use based on those extracted colors.

Furthermore - I used a unsupervised machine learning technique to cluster similar colors to lay the groundwork for creating suggestions of colors that harmonize with multiple sources of colors - i.e generating a color scheme that works with both the image itself but also the images surrounding.

There is still a long way to go but atleast now it kind of works.

### Technical Implementation:

- I use a library to extract the dominating colors of images.
- These colors are of the format HSL - which stands for Hue, Saturation and Lightness
  - Hue is which color of the rainbow.
  - Saturation is - well, how saturated the color is.
  - Lightness is how much black vs white there is in the color.
- How to calculate complementary color schemes:
  - Hue is described in 360 degrees
  - Complementary colors are defined as angular relationships to a color.
  - Example: Triadic complements are colors that have a triangular relationship with each other - so n degrees,  (n+120) degrees and (n + 240) degrees.
- When combining the colors of multiple sources - it's necessary to boil down similar colors into one as well as possible so that when creating complements it is done using an averaged set of colors of the multiple sources - basically so that we don't focus on outlier colors that represent only a small detail in, let's say,  one of the photos.
- This is where K-means clustering comes in. 
- K-means clustering is a technique for grouping data points by measuring the distance they are from a pivot point - usually called a centroid.
- I also implemented an automatic method for detecting what the optimal number of K (n clusters) is.
- I then use the mean value of all these clusters as the H value of HSL colors.



### Roadmap

