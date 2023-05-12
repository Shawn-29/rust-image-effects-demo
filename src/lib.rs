use wasm_bindgen::prelude::wasm_bindgen;
// use wasm_bindgen::prelude::*;

/* log_1 will log 1 value */
use web_sys::console::log_1 as log;

use base64::{decode, encode};

use image::load_from_memory;
/* for writing png images */
use image::ImageOutputFormat::Png;

#[wasm_bindgen]
pub fn grayscale(encoded_file: &str) -> String {
    // log(&encoded_file.into());
    log(&"Grayscale called".into());

    /* decode the base64 string into a vector of numeric values */
    let base64_to_vector: Vec<u8> = decode(encoded_file).unwrap();

    /* create an image from the vector of bytes */
    let mut img = load_from_memory(&base64_to_vector).unwrap();

    log(&"Image loaded!".into());

    /* grayscale the image */
    img = img.grayscale();

    log(&"Grayscale effect applied!".into());

    /* write the grayscale image into a buffer as a png image */
    let mut buffer = vec![];
    img.write_to(&mut buffer, Png).unwrap();
    log(&"New image written!".into());

    /* encode the buffer as base64 string so it can be sent back to JavaScript */
    let encoded_img = encode(&buffer);

    let data_url = format!(
        "data:image/png;base64,{}",
        encoded_img
    );

    return data_url;
}
