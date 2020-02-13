# Serving Web-Optimized Images

This repo organizes images by file type. For a nice overview of when to use which file type, see [here](https://www.youtube.com/watch?v=QASSsstBHdA&feature=emb_logo).

## When to Use SVG, PNG or JPG

Here's a rule-of-thumb summary:

- Use SVG when you have simple/vectorizable images (logos, etc.)
- Use PNG when (1) svg won't work, (2) you have relatively simple images with e.g. sharp lines and tect (logos, graphics, flat-design artwork, etc.) or photographs that need transparent backgrounds
- Use JPEGS when dealing with photographs

## Compressing PNG

Use the [tinypng service](https://tinypng.com/) for final versions of pngs.

## Compressing JPEGS

For AWS S3 buckets, you need to compress the jpg before uploading and set them on upload so that S3 serves them with the following headers.
