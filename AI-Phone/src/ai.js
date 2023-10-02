import * as tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest'

//incomplete. original code in python, going to take some time to transpile
function parse_quickDraw(ndjson_line){
    let sample = JSON.parse(ndjson_line)
    let class_name = sample[word]
    let inkarray = sample['drawing']
    let stroke_lengths 
    total_points = sum(stroke_lengths);
    current_t = 0
    let np_ink = Array(total_points,3).fill(0.0)
    for(stroke in inkarray){
        for(let i in [0,1]){
            
        }
    }
}


let features, lengths, inks, targets, convolved, logits;
inks,lengths, targets = _get_input_tensors(features,targets)
convolved = add_conv_layers(inks)
final_state = _add_rnn_layers(convolved, lengths)
logits = _add_fc_layers(final_state)

function _get_input_tensors(features,targets){
    let shapes = features['shape'];
    let lengths = tf.squeeze(tf.slice(shapes,begin=[0,0],size=[params['batch_size'],1]));
    let inks = tf.reshape(tf.sparse_tensor_to_dense(features['ink']),
    [params['batch_size'],-1,3]);
    if(targets.length != 0){
        targets = tf.squeeze(targets);
    }
    return inks, lengths, targets
}

function _add_conv_layers(params){
    let convolved = inks;
    let convolved_input = 0;
    for(let i=0; i<params.num_conv.length; i++){
        convolved_input = convolved;
        if(params.batch_norm){
            convolved_input = tf.layers.batch_normalization(
                convolved_input,
                training=(mode == tf.estimator.ModeKeys.TRAIN))
        }
        if(i>0 && params.dropout){
            convolved_input = tf.layers.dropout(
                convolved_input,
                rate=params.dropout,
                training=(mode==tf.estimator.ModeKeys.TRAIN))
        }
        convolved = tf.layers.conv1d(
            convolved_input,
            filters=params.num_conv[i],
            kernel_size=params.conv_len[i],
            //this might be problematic. in python it's a None value, but here it's a null... wild.
            activation=null,
            strides=1,
            padding='same',
            //this might also be problematic
            name='conv1d_%d'% i
        )
    }
    return convolved, lengths
}

// function _add_rnn_layers(conv){
//     outputs, stuff, stuff2 = contrib_rnn.stack_bidirectional_dynamic_rnn(
//         cells_fw=[cell(params.num_nodes) for(let stuff1 in params.num_layers.length)],
//         cells_bw=[cell(params.num_nodes) for(let stuff2 in params.num_layers.length)],
//         inputs=colvolved,
//         sequence_length=lengths,
//         dtype=tf.float32,
//         scope='rnn_classification'
//     );
// }