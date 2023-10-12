import * as tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest';
//https://people.rit.edu/osl2877/AI-Phone/model.json
//https://cursedmushroom.github.io/AI-Phone-Model/model.json

let model;
let response;


async function grabModel() {
    try {
        response = await fetch("https://cursedmushroom.github.io/AI-Phone-Model/model.json");
        if (response.ok) {
          const data = await response.text();
          //console.log(data);
        } else {
          console.error("Failed to fetch the model JSON.");
        }
      } catch (error) {
        console.error("Error in fetch:", error);
      }
  };
const loadModel = async () => {
    try {
      model = await tf.loadLayersModel(response);
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Error loading model:', error);
    }
  };

  const modelPromise = tf.loadLayersModel('https://cursedmushroom.github.io/AI-Phone-Model/model.json')
  .then((loadedModel) => {
    model = loadedModel;
  });

// pre-processing
function preProcess(imgData) {
  try {
    if (typeof imgData === 'undefined') {
      throw new Error('imgData is undefined');
    }

    // Convert image data to tensor
    let tensor = tf.browser.fromPixels(imgData, 1);
    // Resize to 28x28
    const resized = tf.image.resizeBilinear(tensor, [28, 28]).toFloat();
    // Normalize the image
    const offset = tf.scalar(255.0);
    const normalized = tf.scalar(1.0).sub(resized.div(offset));
    // Add a dimension to get a batch shape
    const batched = normalized.expandDims(0);
    return batched;
  } catch (error) {
    console.error('Error in preProcess:', error);
    return null;
  }
}

// Predicts the probabilities of shape [N, 100]
let pred = (imgData) => {
    try {
      if (model && imgData) {
        return model.predict(imgData).dataSync();
      } else {
        console.error('Model or imgData is undefined');
        return null;
      }
    } catch (error) {
      console.error('Error in pred:', error);
      return null;
    }
  }
  //export { loadModel, preProcess, pred};
  export { loadModel, preProcess, pred, grabModel, modelPromise };
