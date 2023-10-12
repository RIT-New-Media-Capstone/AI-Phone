import * as tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest';


let model;
const loadModel = async()=>{
    model = await loadLayersModel('model.json')
}

// pre-processing
// grab the data from firebase
//thats probably gonna include an import, and a method like this:

// let imageData = firebase.getData(whatever);

function preProcess(imgData){

        //convert image data to tensor
        let tensor = tf.browser.fromPixels(imgData,numChannels= 1);
        //resize to 28x28
        const resized = tf.image.resizeBilinear(tensor,[28,28]).toFloat();
        //normalize the image
        const offset = tf.scalar(255.0);

        const normalized = tf.scalar(1.0).sub(resized.div(offset));
        //we add a dimension to get a batch shape
        const batched = normalized.expandDims(0);
        return batched;
    
}

//predicts the probabilities of shape [N, 100]
let pred = (imgData) => {return model.predict(imgData).dataSync()};

export {model, loadModel,preProcess, pred}

//incomplete. original code in python, going to take some time to transpile
// let model_fn = (features,labels,mode,params)=>{
//     let getInputTensors = (features,labels)=>{
//         shapes = features['shapes']
//         let lengths = tf.squeeze(tf.slice(shapes,begin=[0,0],size=[params['batch_size'],1]));
//         let inks = tf.reshape(tf.sparse_tensor_to_dense(features['ink']),
//         [params['batch_size'],-1,3]);
//         if(targets.length != 0){
//             targets = tf.squeeze(targets);
//         }
//         return inks, lengths, targets
//     }

//     let addConvLayers = (inks,lengths) =>{
//         let convolved = inks;
//         for(let i=0; i<params.num_conv.length; i++){
//             let convolvedInput = convolved
//             if(params.batchNorm){
//                 convolvedInput = tf.layers.batchNormalization(
//                     convolvedInput,training=(mode==tf.estimator.ModeKeys.TRAIN)
//                 )
//             }

//             if(i>0 && params.dropout){
//                 convolvedInput = tf.layers.dropout(
//                     convolvedInput,
//                     rate = params.dropout,
//                     training=(mode==tf.estimator.ModeKeys.TRAIN)
//                 )
//             }
            
//             convolved = tf.layers.conv1d(
//                 convolvedInput,
//                 filters=params.numConv[i],
//                 kernelSize=params.convLen[i],
//                 strides=1,
//                 padding='same',
//                 name='conv1d_%' % i
//             )
//         }
//         return convolved, lengths
//     }

//     let addRegularRnnLayers=(convolved,lengths)=>{
//         let cell
//         if(params.cellType == 'lstm'){
//             cell = tf.nn.rnnCell.BasicLSTMCell
//         }
//         else if(params.cellType == 'block_lstm'){
//             cell=tf.contrib.rnn.LSTMBlockCell
//         }
//         let cellsFw = params.numLayers.map( (x) => cell(params.numNodes));
//         let cellsBw = params.numLayers.map( (x) => cell(params.numNodes));
//         if(params.dropout>0.0){
//             cellsFw = cellsFw.map((x)=>tf.contrib.rnn.DropoutWrapper(x));
//             cellsBw = cellsBw.map((x)=>tf.contrib.rnn.DropoutWrapper(x));
//         }
//         let outputs,x,y = tf.contrib.rnn.stackBidirectionalDynamicRnn(
//             cellsFw =cellsFw,
//             cellsBw=cellsBw,
//             inputs=convolved,
//             sequenceLength=lengths,
//             scope='rnnClassification'
//         )
//         return outputs
//     }

//     let addCudnnRnnLayers = (convolved) =>{
//         convolved = tf.transpose(convolved,[1,0,2]);
//         let lstm = tf.contrib.cudnnRnn.CudnnLSTM(
//             numLayers=params.numLayers,
//             numUnits=params.numNodes,
//             dropout= mode==tf.estimator.ModeKeys.TRAIN ? params.dropout : 0.0,
//             direction='bidirectional'
//         )
//         let outputs, x = lstm(convolved);
//         outputs = tf.transpose(outputs,[1,0,2]);
//         return outputs;
//     }

//     let addRnnLayers = (convolved,lengths) =>{
//         let outputs;
//         if(params.cellType != 'cudnn_lstm'){
//             outputs = addRegularRnnLayers(convolved,lengths);
//         }else{
//             outputs = addCudnnRnnLayers(convolved);
//         }

//         let mask = tf.tile(
//             tf.expandDims(tf.sequenceMask(lengths,tf.shape(outputs)[1]),2),
//             [1,1,tf.shape(outputs)[2]]
//         );
//         let zeroOutside = tf.where(mask,outputs,tf.zerosLike(outputs))
//         outputs = tf.reduceSum(zeroOutside,axis=1)
//         return outputs
//     }

//     let addFcLayers = (finalState)=>{
//         return tf.layers.dense(finalState,params.numClasses)
//     }

//     let inks,lengths,labelVar,convolved,finalState,logits;
//     inks,lengths,labelVar = getInputTensors(features,labels);
//     convolved, lengths = addConvLayers(inks,lengths);
//     finalState = addRnnLayers(convolved,lengths);
//     logits = addFcLayers(finalState);

//     let crossEntropy = tf.reduceMean(tf.nn.sparseSoftmaxEntropyWithLogits(
//         labels=labels,
//         logits=logits
//     ))

//     let train_op = tf.contrib.layers.optimizeLoss(
//         loss=crossEntropy,
//         globalStep=tf.train.getGlobalStep(),
//         learningRate=params.learningRate,
//         optimizer='Adam',
//         clipGradients=params.gradientClippingNorm,
//         summaries=['learningRate','loss','gradients','gradientNorm']
//     )

//     let predictions = tf.argmax(logits,axis=1);

//     return tf.estimator.EstimatorSpec(
//         mode=mode,
//         predictions={'logits':logits,'predictions':predictions},
//         loss=crossEntropy,
//         trainOp = trainOp,
//         evalMetricOps={'accuracy':tf.metrics.accuracy(labels,predictions)}
//     );

// }
// function createEstimator(modelDir,){
//     estimator = tf.estimator.Estimator(
//         model_fn = model_fn,
//         config=run_config,
//         params=model_params
//     )

// }

// function mainCode(){
//     let estimator, train_spec,eval_spec = createEstimator(
//         runConfig=tf.estimator.RunConfig(
//             modelDir = "", //put something here that makes sense
//             saveCheckpointsSecs=300,
//             saveSummarySteps=100
//         )
//     )
//     tf.estimator.trainAndEvaluate(estimator,train_spec,eval_spec)
// }



// function parse_quickDraw(ndjson_line){
//     let sample = JSON.parse(ndjson_line)
//     let class_name = sample[word]
//     let inkarray = sample['drawing']
//     let stroke_lengths 
//     total_points = sum(stroke_lengths);
//     current_t = 0
//     let np_ink = Array(total_points,3).fill(0.0)
//     for(stroke in inkarray){
//         for(let i in [0,1]){
            
//         }
//     }
// }


// mainCode();